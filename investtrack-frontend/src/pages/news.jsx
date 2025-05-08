import { useEffect, useState } from "react";
import NewsCard from "../components/NewsCard";
import axios from "axios";
import Navbar2 from "../components/Navbar2";
import { motion } from "framer-motion"; // Import Framer Motion

export default function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/news/Latestnews")
      .then((res) => {
        setNews(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching news:", err);
        setError("Failed to fetch news");
        setLoading(false);
      });
  }, []);

  return (
    <div className="relative min-h-screen bg-gray-800 text-white py-16 px-6 sm:px-8 lg:px-12" style={{backgroundColor:"blueviolet"}}>
      <Navbar2 />
      {/* Content */}
      <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-extrabold text-center text-black mb-10" style={{ marginTop: "140px" }}>
          📰 Latest Market News
        </h1>

        {/* Loader with Bouncing Dots using Framer Motion */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="flex space-x-2">
              <motion.div
                className="bg-white w-3 h-3 rounded-full"
                animate={{ y: ["0%", "-20%"] }} // Bouncing effect
                transition={{ y: { yoyo: Infinity, duration: 0.6, ease: "easeInOut" } }}
              />
              <motion.div
                className="bg-white w-3 h-3 rounded-full"
                animate={{ y: ["0%", "-20%"] }}
                transition={{ y: { yoyo: Infinity, duration: 0.6, ease: "easeInOut", delay: 0.2 } }}
              />
              <motion.div
                className="bg-white w-3 h-3 rounded-full"
                animate={{ y: ["0%", "-20%"] }}
                transition={{ y: { yoyo: Infinity, duration: 0.6, ease: "easeInOut", delay: 0.4 } }}
              />
            </div>
          </div>
        )}

        {/* Error Handling */}
        {error && (
          <div className="text-center py-4 text-red-500 text-lg">
            <p>{error}</p>
          </div>
        )}

        {/* News List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          {news.length > 0 ? (
            news.map((article, idx) => (
              <div
                className="transition-transform transform hover:scale-105 hover:shadow-xl rounded-lg overflow-hidden bg-white bg-opacity-70 hover:bg-opacity-90"
                key={idx}
              >
                <NewsCard article={article} />
              </div>
            ))
          ) : (
            !loading && (
              <div className="text-center text-black" style={{ marginTop: "20px" }}>
                <p>No news available at the moment.</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
