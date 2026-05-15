import { useEffect, useState } from "react";

export default function CursorGlow() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    window.addEventListener("mousemove", (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    });
  }, []);

  return (
    <div
      className="pointer-events-none fixed w-[500px] h-[500px] rounded-full"
      style={{
        left: pos.x,
        top: pos.y,
        transform: "translate(-50%, -50%)",
        background:
          "radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)",
      }}
    />
  );
}
