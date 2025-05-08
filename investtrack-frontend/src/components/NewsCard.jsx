import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function NewsCard({ article }) {
  const [isOpen, setIsOpen] = useState(false);

  const fallbackImage = "https://via.placeholder.com/500x300.png?text=No+Image+Available";

  return (
    <div className="bg-black rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
      {/* Image */}
      <img
        src={article.urlToImage ? article.urlToImage : fallbackImage}
        alt="News"
        className="w-full h-48 object-cover"
      />

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h2 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 text-center">{article.title}</h2>
        {/* Short description */}
        <p className="text-sm text-gray-700 mb-3 line-clamp-3">
          {article.description || "No description available."}
        </p>

        {/* Read More Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition"
        >
          {isOpen ? "Show Less" : "Read More"}
        </button>

        {/* Accordion Content with Framer Motion */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-3 overflow-hidden text-sm text-gray-800"
            >
              <p className="mb-2 text-center">
                {article.description || "No description available."}
              </p>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline hover:text-blue-700"
              >
                Read full article →
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
