import { motion } from "framer-motion";
import { tokens } from "../../design-system/tokens";

export default function Button({
  children,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  type = "button",
  fullWidth = false,
}) {
  const sizes = {
    sm: {
      padding: "8px 16px",
      fontSize: "0.875rem",
    },
    md: {
      padding: "12px 24px",
      fontSize: "1rem",
    },
    lg: {
      padding: "14px 32px",
      fontSize: "1.1rem",
    },
  };

  const styles = {
    primary: {
      background: `linear-gradient(135deg, ${tokens.colors.primary}, ${tokens.colors.primaryHover})`,
      color: tokens.colors.text,
      border: "none",
      boxShadow: `0 0 20px ${tokens.colors.primary}40`,
      hover: {
        background: `linear-gradient(135deg, ${tokens.colors.primaryHover}, ${tokens.colors.primary})`,
        boxShadow: `0 0 30px ${tokens.colors.primary}60`,
      },
    },
    secondary: {
      background: tokens.colors.backgroundSecondary,
      color: tokens.colors.accent,
      border: `1.5px solid ${tokens.colors.borderStrong}`,
      hover: {
        background: tokens.colors.card,
        borderColor: tokens.colors.accent,
      },
    },
    outline: {
      background: "transparent",
      color: tokens.colors.accent,
      border: `1.5px solid ${tokens.colors.border}`,
      hover: {
        background: tokens.colors.glass,
        borderColor: tokens.colors.accent,
      },
    },
    ghost: {
      background: "transparent",
      color: tokens.colors.text,
      border: "none",
      hover: {
        background: tokens.colors.glass,
      },
    },
  };

  const baseStyle = styles[variant] || styles.primary;
  const sizeStyle = sizes[size] || sizes.md;

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      style={{
        ...sizeStyle,
        ...baseStyle,
        borderRadius: tokens.radius.md,
        cursor: disabled ? "not-allowed" : "pointer",
        fontWeight: "600",
        fontFamily: tokens.fonts.body,
        transition: tokens.transition.smooth,
        width: fullWidth ? "100%" : "auto",
        opacity: disabled ? 0.5 : 1,
      }}
      onHoverStart={(e) => {
        if (!disabled) {
          Object.assign(e.currentTarget.style, baseStyle.hover);
        }
      }}
      onHoverEnd={(e) => {
        if (!disabled) {
          Object.assign(e.currentTarget.style, {
            background: baseStyle.background,
            borderColor: baseStyle.border || "transparent",
            boxShadow: baseStyle.boxShadow || "none",
          });
        }
      }}
    >
      {children}
    </motion.button>
  );
}
