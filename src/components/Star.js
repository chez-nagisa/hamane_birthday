// src/components/Star.js
import { motion } from "framer-motion";

export default function Star({ onClick, active, position }) {
  return (
    <motion.button
      type="button"
      className="absolute z-10" // ほか要素の上に
      style={{
        top: position.top,
        left: position.left,
        transform: "translate(-50%, -50%)", // 座標の中心に配置
        touchAction: "manipulation",        // モバイルのダブルタップ遅延防止
      }}
      // クリックより早い onPointerDown を使う（1回で反応）
      onPointerDown={(e) => {
        e.preventDefault();
        onClick();
      }}
      whileTap={{ scale: 1.4, rotate: 15 }}
      aria-label="star"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`w-7 h-7 transition-colors duration-300 ${
          active ? "text-yellow-400" : "text-yellow-200"
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
        // クリックは親buttonで受ける
        style={{ pointerEvents: "none" }}
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.965a1 1 0 00.95.69h4.174c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.965c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.785.57-1.84-.197-1.54-1.118l1.287-3.965a1 1 0 00-.364-1.118L2.05 9.392c-.783-.57-.38-1.81.588-1.81h4.174a1 1 0 00.95-.69l1.286-3.965z" />
      </svg>
    </motion.button>
  );
}
