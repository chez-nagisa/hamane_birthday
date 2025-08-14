// src/App.js
import React, { useState, useRef, useEffect } from "react";
import { messages } from "./data/messages";
import Star from "./components/Star";
import { motion } from "framer-motion";

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 星の位置（任意で調整OK）
  const starPositions = [
    { top: "20%", left: "30%" },
    { top: "35%", left: "60%" },
    { top: "50%", left: "40%" },
    { top: "65%", left: "20%" },
    { top: "70%", left: "70%" },
    { top: "80%", left: "35%" },
    { top: "25%", left: "75%" },
    { top: "60%", left: "55%" },
    { top: "40%", left: "50%" },
  ];

  // 各星の点灯状態
  const [lit, setLit] = useState(Array(starPositions.length).fill(false));

  // メッセージ末尾へ自動スクロール
  const messageEndRef = useRef(null);
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentIndex]);

  const allMessagesShown = currentIndex === messages.length;

  const handleStarClick = (i) => {
    // 未点灯の星のみカウント
    if (!lit[i] && currentIndex < messages.length) {
      setLit((prev) => {
        const next = [...prev];
        next[i] = true;
        return next;
      });
      setCurrentIndex((v) => v + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0d1b2a] to-[#1b263b] text-white flex flex-col px-4 py-10">
      {/* タイトル */}
      <div className="text-center mb-4">
        <h1 className="text-4xl sm:text-6xl font-bold text-yellow-300 font-serif">
          Happy Birthday, Hamane!
        </h1>
        <p className="text-md sm:text-xl mt-2 text-gray-300">August 20th, 2025</p>
      </div>

      {/* ⭐ 星エリア：高さ固定（絶対配置のキャンバス） */}
      <div className="relative w-full h-[42vh] sm:h-[48vh] md:h-[52vh]">
        {starPositions.map((pos, index) => (
          <Star
            key={index}
            onClick={() => handleStarClick(index)}
            active={lit[index]}
            position={pos}
          />
        ))}
      </div>

      {/* 📜 メッセージエリア：内部のみスクロール（バー非表示） */}
      <div
        className="mt-6 max-w-xl text-center font-serif text-lg sm:text-xl text-white mx-auto overflow-y-auto scroll-hide px-2 transition-all duration-500"
        style={{ maxHeight: allMessagesShown ? "none" : "40vh" }}
        aria-live="polite"
      >
        {messages.slice(0, currentIndex).map((msg, i) => (
          <motion.p
            key={i}
            className="mb-4 opacity-90"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
          >
            {msg}
          </motion.p>
        ))}
        <div ref={messageEndRef} />
      </div>
    </div>
  );
}

export default App;
