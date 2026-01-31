import { useMemo } from "react";
import { Box } from "@mui/material";
import flower1 from "../assets/pattern1.png";
import flower2 from "../assets/pattern2.png";
import flower3 from "../assets/pattern3.png";

const flowers = [flower1, flower2, flower3];

export default function FlowerBackground({ count = 28, animated = true }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100, // percent
        top: Math.random() * 100, // percent
        size: `${12 + Math.random() * 56}px`,
        rot: Math.random() * 360,
        opacity: 0.45 + Math.random() * 0.45,
        dur: 5 + Math.random() * 10,
        delay: Math.random() * 4,
      })),
    [count]
  );

  return (
    <Box
      aria-hidden
      sx={{ position: "fixed", inset: 0, zIndex: -1, pointerEvents: "none" }}
    >
      {items.map((it) => {
        return(
        <Box
          key={it.id}
          component="img"
          src={flowers[it.id%3]}
          alt=""
          sx={{
            position: "absolute",
            left: `${it.left}vw`,
            top: `${it.top}vh`,
            width: it.size,
            height: it.size,
            transform: `rotate(${it.rot}deg)`,
            opacity: Math.min(1, it.opacity + 0.1),
            filter: 'drop-shadow(0 3px 8px rgba(0,0,0,0.18))',
            willChange: animated ? "transform" : "auto",
            animation: animated
              ? `flowerFloat ${it.dur}s ease-in-out ${it.delay}s infinite`
              : "none",
            userSelect: "none",
            WebkitUserSelect: "none",
            MozUserSelect: "none",
          }}
        />
      )})}

      <style>{`
        @keyframes flowerFloat {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-6px) rotate(30deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          img { animation: none !important; }
        }
      `}</style>
    </Box>
  );
}
