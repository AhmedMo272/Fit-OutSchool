import { motion, AnimatePresence } from "framer-motion";
import { tokens } from "../../design-system/tokens";

export default function Modal({
  isOpen,
  onClose,
  title,
  message,
  icon,
  type = "success",
  actionLabel = "Close",
  onAction,
}) {
  const colors = {
    success: {
      bg: "rgba(149, 160, 138, 0.15)",
      border: tokens.colors.success,
      icon: "✓",
    },
    error: {
      bg: "rgba(166, 61, 47, 0.15)",
      border: tokens.colors.danger,
      icon: "✕",
    },
    warning: {
      bg: "rgba(192, 139, 92, 0.15)",
      border: tokens.colors.warning,
      icon: "!",
    },
    info: {
      bg: "rgba(101, 55, 32, 0.15)",
      border: tokens.colors.primary,
      icon: "i",
    },
  };

  const config = colors[type] || colors.success;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0, 0, 0, 0.6)",
              backdropFilter: "blur(6px)",
              zIndex: 999,
            }}
          />

          {/* CENTER WRAPPER (FIX) */}
          <div
            style={{
              position: "fixed",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
              padding: "20px",
            }}
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{
                width: "100%",
                maxWidth: "420px",
              }}
            >
              <div
                style={{
                  background: tokens.colors.backgroundSecondary,
                  border: `1.5px solid ${config.border}`,
                  borderRadius: tokens.radius.lg,
                  padding: "40px 32px",
                  textAlign: "center",
                  boxShadow: tokens.shadow.card,
                  backdropFilter: "blur(20px)",
                }}
              >
                {/* Icon */}
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "50%",
                    background: config.bg,
                    border: `2px solid ${config.border}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 24px",
                    fontSize: "32px",
                    color: config.border,
                  }}
                >
                  {icon || config.icon}
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontSize: "1.5rem",
                    marginBottom: "12px",
                    color: tokens.colors.text,
                    fontFamily: tokens.fonts.heading,
                  }}
                >
                  {title}
                </h3>

                {/* Message */}
                <p
                  style={{
                    fontSize: "0.95rem",
                    color: tokens.colors.muted,
                    marginBottom: "32px",
                    lineHeight: 1.6,
                  }}
                >
                  {message}
                </p>

                {/* Action Button */}
                <button
                  onClick={() => {
                    if (onAction) onAction();
                    onClose();
                  }}
                  style={{
                    width: "100%",
                    padding: "12px 24px",
                    background: config.border,
                    color:
                      type === "success"
                        ? tokens.colors.textDark
                        : tokens.colors.text,
                    border: "none",
                    borderRadius: tokens.radius.md,
                    fontSize: "1rem",
                    fontWeight: "600",
                    cursor: "pointer",
                    boxShadow: `0 0 20px ${config.border}33`,
                  }}
                >
                  {actionLabel}
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
