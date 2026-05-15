import { motion } from "framer-motion";
import { tokens } from "../../design-system/tokens";
import ParallaxSection from "./ParallaxSection";

export default function Scene({
  title,
  subtitle,
  cta,
  image = "src/assets/images/scene.png",
}) {
  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        background: tokens.colors.background,
        textAlign: "center",
        padding: "20px",
      }}
    >
      {/* Background Image */}
      <motion.img
        src={image}
        alt=""
        initial={{ scale: 1.1, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 0.3 }}
        transition={{ duration: 1.5 }}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      {/* Gradient Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(to bottom, ${tokens.colors.backgroundSecondary}80, ${tokens.colors.background})`,
          zIndex: 1,
        }}
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 80, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: false, margin: "-100px" }}
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "900px",
          padding: "0 20px",
          width: "100%",
        }}
      >
        <ParallaxSection>
          <h1
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              fontFamily: tokens.fonts.heading,
              fontWeight: "800",
              marginBottom: "20px",
              lineHeight: 1.15,
              color: tokens.colors.text,
              letterSpacing: "-0.02em",
              textShadow: `0 4px 20px rgba(0, 0, 0, 0.5)`,
            }}
          >
            {title}
          </h1>
        </ParallaxSection>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            color: tokens.colors.accent,
            fontSize: "clamp(1rem, 2vw, 1.25rem)",
            maxWidth: "600px",
            margin: "0 auto",
            lineHeight: 1.6,
            fontFamily: tokens.fonts.body,
            fontWeight: "500",
            letterSpacing: "0.01em",
          }}
        >
          {subtitle}
        </motion.p>

        {cta && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            onClick={() =>
              document.getElementById("apply")?.scrollIntoView({
                behavior: "smooth",
              })
            }
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            style={{
              marginTop: "40px",
              padding: "14px 36px",
              background: `linear-gradient(135deg, ${tokens.colors.primary}, ${tokens.colors.primaryHover})`,
              border: "none",
              borderRadius: tokens.radius.md,
              color: tokens.colors.text,
              fontWeight: "700",
              fontSize: "1rem",
              cursor: "pointer",
              fontFamily: tokens.fonts.body,
              boxShadow: `0 0 30px ${tokens.colors.primary}40`,
              transition: tokens.transition.smooth,
            }}
          >
            Apply Now 🚀
          </motion.button>
        )}
      </motion.div>
    </section>
  );
}
