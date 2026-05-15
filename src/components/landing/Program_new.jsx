import { motion } from "framer-motion";
import { tokens } from "../../design-system/tokens";

const items = [
  {
    title: "Real Projects",
    desc: "Work on actual sites from day one",
    icon: "🏗️",
  },
  {
    title: "Technical Skills",
    desc: "Drawings, BOQs & execution",
    icon: "📐",
  },
  {
    title: "Client Handling",
    desc: "Communicate like a real engineer",
    icon: "🤝",
  },
  {
    title: "Career Launch",
    desc: "Be job-ready in 3 weeks",
    icon: "🚀",
  },
];

export default function Program() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section
      style={{
        padding: "100px 20px",
        background: tokens.colors.background,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.06 }}
        transition={{ duration: 1 }}
        style={{
          position: "absolute",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${tokens.colors.primary}40, transparent)`,
          top: "50%",
          right: "-100px",
          transform: "translateY(-50%)",
          zIndex: 1,
        }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          position: "relative",
          zIndex: 2,
        }}
      >
        <motion.h2
          variants={itemVariants}
          style={{
            fontSize: "clamp(2rem, 4vw, 2.8rem)",
            marginBottom: "60px",
            textAlign: "center",
            fontFamily: tokens.fonts.heading,
            color: tokens.colors.text,
            letterSpacing: "-0.01em",
          }}
        >
          What You'll Learn
        </motion.h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "24px",
          }}
        >
          {items.map((item, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              style={{
                padding: "32px 24px",
                borderRadius: tokens.radius.lg,
                background: tokens.colors.glass,
                border: `1.5px solid ${tokens.colors.border}`,
                backdropFilter: "blur(20px)",
                textAlign: "center",
                cursor: "pointer",
                transition: tokens.transition.smooth,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 15px 50px rgba(0,0,0,0.4), 0 0 40px ${tokens.colors.primary}20`;
                e.currentTarget.style.borderColor = tokens.colors.accent;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = tokens.shadow.card;
                e.currentTarget.style.borderColor = tokens.colors.border;
              }}
            >
              <div
                style={{
                  fontSize: "2.5rem",
                  marginBottom: "16px",
                }}
              >
                {item.icon}
              </div>
              <h3
                style={{
                  fontSize: "1.25rem",
                  fontFamily: tokens.fonts.heading,
                  color: tokens.colors.text,
                  marginBottom: "12px",
                  margin: "0 0 12px 0",
                }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  color: tokens.colors.muted,
                  fontSize: "0.95rem",
                  margin: 0,
                  lineHeight: 1.5,
                  fontFamily: tokens.fonts.body,
                }}
              >
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
