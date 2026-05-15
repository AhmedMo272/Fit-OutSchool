import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { tokens } from "../../design-system/tokens";
import Modal from "../../components/ui/Modal";
import { MdLock } from "react-icons/md";

export default function Login() {
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (password === "fitout2026") {
      localStorage.setItem("admin", "true");
      setIsError(false);
      setShowModal(true);
      setTimeout(() => navigate("/dashboard"), 1500);
    } else {
      setIsError(true);
      setShowModal(true);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        background: tokens.colors.background,
        overflow: "hidden",
      }}
    >
      {/* Background Image */}
      <motion.img
        src="/images/scene9.png"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.15,
        }}
      />

      {/* Gradient Overlays */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(135deg, rgba(43, 13, 4, 0.85), rgba(58, 26, 13, 0.95))`,
          zIndex: 1,
        }}
      />

      {/* Decorative Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{
          position: "absolute",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${tokens.colors.primary}40, transparent)`,
          top: "-200px",
          left: "-200px",
          zIndex: 0,
        }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        style={{
          position: "absolute",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${tokens.colors.sage}30, transparent)`,
          bottom: "-150px",
          right: "-150px",
          zIndex: 0,
        }}
      />

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ zIndex: 2, width: "100%", padding: "20px" }}
      >
        <motion.div
          variants={itemVariants}
          style={{
            maxWidth: "460px",
            margin: "0 auto",
            background: tokens.colors.backgroundSecondary,
            border: `1.5px solid ${tokens.colors.borderStrong}`,
            borderRadius: tokens.radius.xl,
            padding: "48px 40px",
            backdropFilter: "blur(20px)",
            boxShadow: `0 25px 60px rgba(0,0,0,0.4), 0 0 60px ${tokens.colors.primary}15`,
          }}
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${tokens.colors.primary}, ${tokens.colors.primaryHover})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px",
              fontSize: "1.8rem",
              color: tokens.colors.text,
              boxShadow: `0 0 30px ${tokens.colors.primary}40`,
            }}
          >
            <MdLock />
          </motion.div>

          {/* Title */}
          <motion.h2
            variants={itemVariants}
            style={{
              fontSize: "2rem",
              marginBottom: "8px",
              color: tokens.colors.text,
              fontFamily: tokens.fonts.heading,
              textAlign: "center",
              letterSpacing: "-0.01em",
            }}
          >
            Admin Access
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            style={{
              fontSize: "0.95rem",
              color: tokens.colors.muted,
              textAlign: "center",
              marginBottom: "32px",
              lineHeight: 1.5,
            }}
          >
            Enter your password to access the applications dashboard
          </motion.p>

          {/* Input */}
          <motion.div variants={itemVariants} style={{ marginBottom: "24px" }}>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              style={{
                width: "100%",
                padding: "14px 16px",
                borderRadius: tokens.radius.md,
                border: `1.5px solid ${tokens.colors.border}`,
                background: tokens.colors.glass,
                color: tokens.colors.text,
                fontSize: "1rem",
                fontFamily: tokens.fonts.body,
                backdropFilter: "blur(10px)",
                transition: tokens.transition.smooth,
                boxSizing: "border-box",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = tokens.colors.accent;
                e.currentTarget.style.background = tokens.colors.card;
                e.currentTarget.style.boxShadow = `0 0 20px ${tokens.colors.primary}20`;
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = tokens.colors.border;
                e.currentTarget.style.background = tokens.colors.glass;
                e.currentTarget.style.boxShadow = "none";
              }}
            />
          </motion.div>

          {/* Login Button */}
          <motion.button
            variants={itemVariants}
            onClick={handleLogin}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            style={{
              width: "100%",
              padding: "14px 24px",
              background: `linear-gradient(135deg, ${tokens.colors.primary}, ${tokens.colors.primaryHover})`,
              color: tokens.colors.text,
              border: "none",
              borderRadius: tokens.radius.md,
              fontSize: "1rem",
              fontWeight: "600",
              fontFamily: tokens.fonts.body,
              cursor: "pointer",
              transition: tokens.transition.smooth,
              boxShadow: `0 0 30px ${tokens.colors.primary}40`,
            }}
          >
            Unlock Dashboard
          </motion.button>

          {/* Help Text */}
          <motion.p
            variants={itemVariants}
            style={{
              fontSize: "0.85rem",
              color: tokens.colors.muted,
              textAlign: "center",
              marginTop: "20px",
              fontStyle: "italic",
            }}
          >
            Only administrators can access this area
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={isError ? "Access Denied" : "Welcome Back"}
        message={
          isError
            ? "The password you entered is incorrect. Please try again."
            : "Redirecting to your dashboard..."
        }
        type={isError ? "error" : "success"}
        icon={isError ? "✕" : "✓"}
        actionLabel={isError ? "Try Again" : "Continue"}
      />
    </section>
  );
}
