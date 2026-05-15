import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { tokens } from "../../design-system/tokens";

export default function Counter({ target, image }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let i = 0;

    const interval = setInterval(() => {
      i += Math.ceil(target / 50); // smoother animation
      if (i >= target) {
        i = target;
        clearInterval(interval);
      }
      setCount(i);
    }, 30);

    return () => clearInterval(interval);
  }, [target]);

  return (
    <section style={sectionStyle}>
      {/* 🖼 Background Image */}
      <img src={image} alt="" style={bgStyle} />

      {/* 🌑 Overlay */}
      <div style={overlayStyle} />

      {/* ✨ Content */}
      <motion.div
        initial={{ opacity: 0, y: 80, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{ textAlign: "center", zIndex: 2 }}
      >
        <h1 style={numberStyle}>{count}+</h1>

        <p style={textStyle}>Engineers trained on real projects</p>
      </motion.div>
    </section>
  );
}

/* ================= Styles ================= */

const sectionStyle = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  overflow: "hidden",
  background: "#2b0d04",
};

const bgStyle = {
  position: "absolute",
  width: "100%",
  height: "100%",
  objectFit: "cover",
  opacity: 0.35,
};

const overlayStyle = {
  position: "absolute",
  inset: 0,
  background:
    " linear-gradient(to bottom,rgba(58, 26, 13, 0.65),rgba(43, 13, 4, 0.96))",
};

const numberStyle = {
  fontSize: "5rem",
  fontWeight: "bold",
  color: tokens.colors.primary,
  textShadow: `0 0 20px ${tokens.colors.primary}80, 0 0 30px ${tokens.colors.primary}40`,
};

const textStyle = {
  color: tokens.colors.muted,
  fontSize: "1.2rem",
  marginTop: "10px",
};
