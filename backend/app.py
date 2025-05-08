from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import http.client
import json, os
from datetime import datetime
from dotenv import load_dotenv
from pymongo import MongoClient
from fastapi.middleware.cors import CORSMiddleware
from llama_index.llms.google_genai import GoogleGenAI

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB connection
client = MongoClient(os.getenv("MONGODB_URI", "mongodb://localhost:27017/"))
db = client["investtrack"]
all_holdings_collection = db["all_holdings"]

# Initialize LLM
llm1 = GoogleGenAI(
    model="gemini-2.0-flash",  # use available model ID
    api_key=os.getenv("GOOGLE_API_KEY")
)

# Request schema
class AuthData(BaseModel):
    clientcode: str
    token: str

@app.post("/fetch_portfolio")
def fetch_and_store_holdings(data: AuthData):
    clientcode = data.clientcode
    token = data.token
    now = datetime.utcnow()

    headers = {
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-UserType': 'USER',
        'X-SourceID': 'WEB',
        'X-ClientLocalIP': os.getenv("CLIENT_LOCAL_IP", "127.0.0.1"),
        'X-ClientPublicIP': os.getenv("CLIENT_PUBLIC_IP", "127.0.0.1"),
        'X-MACAddress': os.getenv("MAC_ADDRESS", "44:38:39:ff:ef:57"),
        'X-PrivateKey': os.getenv("ANGEL_API_KEY")
    }

    try:
        conn = http.client.HTTPSConnection("apiconnect.angelone.in")
        conn.request("GET", "/rest/secure/angelbroking/portfolio/v1/getAllHolding", "", headers)
        res = conn.getresponse()
        response_data = res.read().decode("utf-8")

        if res.status != 200:
            raise HTTPException(status_code=res.status, detail="Failed to fetch holdings")

        parsed_data = json.loads(response_data)
        new_holdings = parsed_data.get("data", [])

        result = all_holdings_collection.update_one(
            {"clientcode": clientcode},
            {
                "$set": {
                    "holdings": new_holdings,
                    "last_updated": now
                }
            },
            upsert=True
        )

        return {
            "success": True,
            "message": "Holdings updated successfully",
            "data": new_holdings
        }

    except Exception as e:
        print(f"Exception: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

@app.get("/analyze")
def analyze_holdings(clientcode: str):
    holdings = all_holdings_collection.find_one({"clientcode": clientcode})

    if not holdings or "holdings" not in holdings:
        return {
            "success": False,
            "message": "No holdings found.",
            "data": None
        }

    suggestion_format = """📌 Buy more of INFY - Strong Q4 earnings.
📉 Reduce Reliance - Weak sentiment after oil dip.
🕵️ Watchlist: TCS, Wipro – Expected bullish movement next quarter.
💰 Shift some capital to low-risk mutual funds for balance."""

    analysis_format = """📈 Insight
Your portfolio is well-diversified across 5 sectors. 20% allocation in Tech is outperforming, while 15% in Energy is underperforming.

💡 Recommendation: Rebalance 5% from underperformers to High-growth Tech ETFs."""

    suggestion_prompt = f"""
Given the following portfolio data:
{holdings['holdings']}

Provide suggestions in the following format:
{suggestion_format}
Only use the format as a structure. DO NOT include other text or disclaimers.
"""

    analysis_prompt = f"""
Given the portfolio below:
{holdings['holdings']}

Return an analysis in the format:
{analysis_format}
Only follow the format, do not add unrelated information.
"""

    try:
        analysis_response = llm1.complete(analysis_prompt)
        suggestion_response = llm1.complete(suggestion_prompt)

        print(analysis_response)
        print(suggestion_response)
        print("sending responses...")
        return {
            "success": True,
            "message": "Analysis completed successfully",
            "data": {
                "analysis": analysis_response.text,
                "suggestion": suggestion_response.text
            }
        }
    except Exception as e:
        print(f"Error during LLM completion: {e}")
        raise HTTPException(status_code=500, detail="AI analysis failed")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
