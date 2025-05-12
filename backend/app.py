from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel
import http.client
import json
import os
from datetime import datetime
from dotenv import load_dotenv
from pymongo import MongoClient
from fastapi.middleware.cors import CORSMiddleware
from llama_index.llms.google_genai import GoogleGenAI
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse

# Load environment variables
load_dotenv()

app = FastAPI()

# Add middleware for CORS
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
angelone_collection = db["Holdings"]
zerodha_collection = db["holdings"]  # Assuming this might be used later

# Initialize LLM
llm1 = GoogleGenAI(
    model="gemini-2.0-flash",
    api_key=os.getenv("GOOGLE_API_KEY")
)

# Request schema
class AuthData(BaseModel):
    username: str
    clientcode: str
    token: str

# Custom error handler for validation errors
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=422,
        content={"detail": exc.errors(), "body": await request.json()},
    )

# Fetch and store holdings
@app.post("/fetch_portfolio")
def fetch_and_store_holdings(data: AuthData):
    print("Started")
    username = data.username
    clientcode = data.clientcode
    token = data.token
    now = datetime.now()

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
        print("Sending Portfolio")

        # Update in Holdings collection using username and broker
        angelone_collection.update_one(
            {"username": username, "broker": "angelone"},
            {
                "$set": {
                    "holdings": new_holdings,
                    "last_updated": now,
                    "username": username
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

# Analyze holdings
@app.get("/analyze")
def analyze_holdings(username: str):
    try:
        record_angelone = angelone_collection.find_one({"username": username})
        record_zerodha = zerodha_collection.find_one({"username": username})

        if not record_angelone or "holdings" not in record_angelone:
            return {
                "success": False,
                "message": "No AngelOne holdings found.",
                "data": None
            }

        if not record_zerodha or "holdings" not in record_zerodha:
            return {
                "success": False,
                "message": "No Zerodha holdings found.",
                "data": None
            }

        holdings_angelone = record_angelone["holdings"]["holdings"]  # Accessing the inner "holdings" list
        holdings_zerodha = record_zerodha["holdings"]  # Zerodha has a simpler structure

        combined_holdings = [
            {"broker": "angelone", "holdings": holdings_angelone},
            {"broker": "zerodha", "holdings": holdings_zerodha}
        ]

        # Flatten all holdings for analysis with quantity, avg price, and profit/loss
        flattened_holdings = []
        for broker_data in combined_holdings:
            # Check for the correct structure of holdings for each broker
            if "holdings" in broker_data and isinstance(broker_data["holdings"], list):
                for h in broker_data["holdings"]:
                    # Calculate profit/loss for AngelOne and Zerodha
                    investment_value = float(h.get("investment_value", 0)) if 'investment_value' in h else 0
                    current_value = float(h.get("current_value", 0)) if 'current_value' in h else 0
                    profit_loss = current_value - investment_value

                    # Adding data to flattened holdings list
                    holding = {
                        "broker": broker_data["broker"],
                        "name": h.get("tradingsymbol", "Unknown"),
                        "quantity": float(h.get("quantity", 0)),
                        "avg_price": float(h.get("averageprice", h.get("average_price", 0))),
                        "profit_loss": profit_loss,
                    }
                    flattened_holdings.append(holding)

        # LLM Prompt (Custom Financial Advisor Prompt)
        analysis_prompt = f"""
You are a financial advisor AI in an investment app.
Based on the user's current holdings, compare each fund with a better alternative if available.
Use the following format:

Trust Score: Display fund manager experience as stars, e.g., ⭐⭐⭐ for moderate, ⭐⭐⭐⭐⭐ for excellent.

Risk: Show as a “Safety Meter” — 🟢 Low Risk, 🟡 Medium, 🔴 High.

Returns: Show as ₹X → ₹Y in Z time with a 📈 emoji.

Comparison Statement: "Fund A is better than Fund B: 15% returns, same risk. Switch now? ✅"

Use these parameters as input:

holdings = {json.dumps(flattened_holdings, indent=2)}

Your task is to analyze if a better-performing fund (with equal or lower risk and equal or higher trust score) exists for each holding.
Present the comparison in the format above.
Just return the answer only on the given format nothing else should be concluded in the asnwer.
        """

        # Call LLM for analysis
        response = llm1.complete(analysis_prompt)

        return {
            "success": True,
            "message": "AI financial advisory completed successfully",
            "data": {
                "combined_holdings": combined_holdings,
                "advisory": response.text
            }
        }

    except Exception as e:
        print(f"Error during LLM completion: {e}")
        raise HTTPException(status_code=500, detail="AI analysis failed")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
