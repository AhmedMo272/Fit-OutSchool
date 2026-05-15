import { motion } from "framer-motion";
import { tokens } from "../../design-system/tokens";

export default function Card({
  children,
  variant = "glass",
  hover = true,
  onClick,
}) {
  const variants = {
    glass: {
      background: tokens.colors.glass,
      border: `1.5px solid ${tokens.colors.border}`,
      backdropFilter: "blur(20px)",
    },
    solid: {
      background: tokens.colors.card,
      border: `1.5px solid ${tokens.colors.borderStrong}`,
      backdropFilter: "none",
    },
    dark: {
      background: tokens.colors.backgroundSecondary,
      border: `1.5px solid ${tokens.colors.border}`,
      backdropFilter: "blur(10px)",
    },
  };

  const baseStyle = variants[variant] || variants.glass;

  return (
    <motion.div
      onClick={onClick}
      whileHover={hover ? { y: -4 } : {}}
      transition={{ duration: 0.3 }}
      style={{
        ...baseStyle,
        borderRadius: tokens.radius.lg,
        padding: "24px",
        boxShadow: tokens.shadow.card,
        cursor: onClick ? "pointer" : "default",
        transition: tokens.transition.smooth,
      }}
      onHoverStart={(e) => {
        if (hover) {
          e.currentTarget.style.boxShadow = `0 15px 50px rgba(0,0,0,0.4), 0 0 40px ${tokens.colors.primary}20`;
        }
      }}
      onHoverEnd={(e) => {
        if (hover) {
          e.currentTarget.style.boxShadow = tokens.shadow.card;
        }
      }}
    >
      {children}
    </motion.div>
  );
}
