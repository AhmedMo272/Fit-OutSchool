import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { tokens } from "../../design-system/tokens";
import Modal from "../ui/Modal";
import { submitLead } from "../../lib/api";
import { FiUpload } from "react-icons/fi";
import { MdCheckCircle } from "react-icons/md";

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
export default function CTA() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    university: "",
    year: "",
    major: "",
    screenshot: null,
  });

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("success");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValidPhone = /^01[0-9]{9}$/.test(form.phone);
    if (!isValidPhone) {
      setModalType("error");
      setShowModal(true);
      return;
    }

    setLoading(true);

    try {
      let base64 = "";
      if (form.screenshot) {
        base64 = await toBase64(form.screenshot);
      }

      const data = {
        ...form,
        screenshot: base64,
      };

      await submitLead(data);

      setModalType("success");
      setShowModal(true);

      setTimeout(() => {
        const msg = `Hi, I applied to Fit-Out School 👷‍♂️`;
        window.open(
          `https://wa.me/201091616915?text=${encodeURIComponent(msg)}`,
        );
      }, 1500);

      setForm({
        name: "",
        phone: "",
        email: "",
        university: "",
        year: "",
        major: "",
        screenshot: null,
      });
    } catch (err) {
      console.error("Form submission error:", err);
      setModalType("error");
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !loading) {
      handleSubmit(e);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };

  const modalMessages = {
    success: {
      title: "Application Submitted",
      message:
        "Your application has been received successfully. Redirecting to WhatsApp...",
      icon: <MdCheckCircle />,
    },
    error: {
      title: "Submission Failed",
      message:
        form.phone && !/^01[0-9]{9}$/.test(form.phone)
          ? "Please enter a valid Egyptian phone number (01XXXXXXXXX)"
          : "An error occurred while submitting your application. Please try again.",
      icon: "✕",
    },
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
        padding: isMobile ? "60px 20px" : "80px 20px",
        overflow: "hidden",
      }}
    >
      {/* Background Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.08 }}
        transition={{ duration: 1 }}
        style={{
          position: "absolute",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          boxShadow: tokens.shadow.glow,
          top: "-150px",
          right: "-150px",
          zIndex: 1,
        }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.06 }}
        transition={{ duration: 1, delay: 0.2 }}
        style={{
          position: "absolute",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${tokens.colors.sage}30, transparent)`,
          bottom: "0",
          left: "-100px",
          zIndex: 1,
        }}
      />

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? "40px" : "60px",
          maxWidth: "1100px",
          zIndex: 2,
          width: "100%",
        }}
      >
        {/* Left Section */}
        <motion.div
          variants={itemVariants}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: isMobile ? "center" : "left",
          }}
        >
          <h1
            style={{
              fontSize: isMobile ? "2.2rem" : "3.2rem",
              fontFamily: tokens.fonts.heading,
              color: tokens.colors.text,
              marginBottom: "16px",
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
            }}
          >
            This is your moment.
          </h1>

          <p
            style={{
              fontSize: isMobile ? "1.1rem" : "1.25rem",
              color: tokens.colors.muted,
              marginBottom: "32px",
              lineHeight: 1.6,
              fontFamily: tokens.fonts.body,
            }}
          >
            Only 100 seats. Real site experience. Real pressure. Real growth.
          </p>

          {/* Payment Info Box */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -4 }}
            style={{
              background: tokens.colors.glass,
              border: `1.5px solid ${tokens.colors.borderStrong}`,
              borderRadius: tokens.radius.lg,
              padding: "24px",
              backdropFilter: "blur(20px)",
              maxWidth: isMobile ? "100%" : "350px",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "16px",
                justifyContent: isMobile ? "center" : "flex-start",
              }}
            >
              <span style={{ fontSize: "1.5rem", marginRight: "12px" }}>
                💳
              </span>
              <h3
                style={{
                  fontSize: "1.1rem",
                  fontFamily: tokens.fonts.heading,
                  color: tokens.colors.accent,
                  margin: 0,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Payment Method
              </h3>
            </div>

            <div
              style={{
                background: tokens.colors.backgroundSecondary,
                borderRadius: tokens.radius.md,
                padding: "16px",
                marginBottom: "16px",
                border: `1px solid ${tokens.colors.border}`,
              }}
            >
              <p
                style={{
                  fontSize: "0.9rem",
                  color: tokens.colors.muted,
                  margin: "0 0 8px 0",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                InstaPay
              </p>
              <p
                style={{
                  fontSize: "1.3rem",
                  fontWeight: "bold",
                  color: tokens.colors.text,
                  margin: 0,
                  fontFamily: tokens.fonts.body,
                }}
              >
                01091616915
              </p>
            </div>

            <p
              style={{
                fontSize: "0.9rem",
                color: tokens.colors.muted,
                margin: 0,
                lineHeight: 1.5,
                fontStyle: "italic",
              }}
            >
              📸 Upload your payment screenshot to confirm your seat
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            style={{
              display: "flex",
              gap: "16px",
              justifyContent: isMobile ? "center" : "flex-start",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "0.95rem",
                color: tokens.colors.sage,
              }}
            >
              <span style={{ fontSize: "1.2rem" }}>✓</span>
              Limited Seats
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "0.95rem",
                color: tokens.colors.sage,
              }}
            >
              <span style={{ fontSize: "1.2rem" }}>✓</span>
              Real Experience
            </div>
          </motion.div>
        </motion.div>

        {/* Right Section - Form */}
        <motion.div
          variants={itemVariants}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <form onSubmit={handleSubmit}>
            <div
              style={{
                background: tokens.colors.backgroundSecondary,
                border: `1.5px solid ${tokens.colors.borderStrong}`,
                borderRadius: tokens.radius.xl,
                padding: isMobile ? "28px 20px" : "40px 32px",
                backdropFilter: "blur(20px)",
                boxShadow: tokens.shadow.card,
              }}
            >
              {/* Form Inputs */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                <FormInput
                  placeholder="Full Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />

                <FormInput
                  placeholder="Phone (01XXXXXXXXX)"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  required
                />

                <FormInput
                  type="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />

                <FormInput
                  placeholder="University"
                  value={form.university}
                  onChange={(e) =>
                    setForm({ ...form, university: e.target.value })
                  }
                  required
                />

                <FormInput
                  placeholder="Major/Specialization"
                  value={form.major}
                  onChange={(e) => setForm({ ...form, major: e.target.value })}
                  required
                />

                <FormSelect
                  value={form.year}
                  onChange={(e) => setForm({ ...form, year: e.target.value })}
                  required
                >
                  <option value="">Select Year</option>
                  <option>2nd Year</option>
                  <option>3rd Year</option>
                  <option>4th Year</option>
                  <option>5th Year</option>
                  <option>Graduate 2025</option>
                  <option>Graduate 2026</option>
                </FormSelect>

                {/* File Upload */}
                <div style={{ position: "relative" }}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setForm({ ...form, screenshot: e.target.files?.[0] })
                    }
                    style={{
                      opacity: 0,
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      cursor: "pointer",
                      zIndex: 2,
                    }}
                    required
                  />
                  <div
                    style={{
                      padding: "16px",
                      borderRadius: tokens.radius.md,
                      border: `1.5px dashed ${
                        form.screenshot
                          ? tokens.colors.success
                          : tokens.colors.border
                      }`,
                      background: form.screenshot
                        ? `rgba(149, 160, 138, 0.1)`
                        : tokens.colors.glass,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "12px",
                      cursor: "pointer",
                      transition: tokens.transition.smooth,
                      color: form.screenshot
                        ? tokens.colors.success
                        : tokens.colors.muted,
                      fontSize: "0.95rem",
                      fontWeight: "500",
                    }}
                  >
                    <FiUpload style={{ fontSize: "1.2rem" }} />
                    {form.screenshot
                      ? `📎 ${form.screenshot.name}`
                      : "Upload Payment Screenshot"}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={!loading ? { scale: 1.02, y: -2 } : {}}
                whileTap={!loading ? { scale: 0.98 } : {}}
                style={{
                  width: "100%",
                  padding: "14px 24px",
                  marginTop: "24px",
                  background: `linear-gradient(135deg, ${tokens.colors.primary}, ${tokens.colors.primaryHover})`,
                  color: tokens.colors.text,
                  border: "none",
                  borderRadius: tokens.radius.md,
                  fontSize: "1.05rem",
                  fontWeight: "700",
                  fontFamily: tokens.fonts.body,
                  cursor: loading ? "not-allowed" : "pointer",
                  transition: tokens.transition.smooth,
                  boxShadow: `0 0 30px ${tokens.colors.primary}40`,
                  opacity: loading ? 0.7 : 1,
                }}
              >
                {loading ? "Processing..." : "Confirm Application"}
              </motion.button>

              <p
                style={{
                  fontSize: "0.85rem",
                  color: tokens.colors.muted,
                  textAlign: "center",
                  marginTop: "16px",
                  margin: 0,
                }}
              >
                ✓ Secure • ✓ Privacy Protected
              </p>
            </div>
          </form>
        </motion.div>
      </motion.div>

      {/* Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={modalMessages[modalType].title}
        message={modalMessages[modalType].message}
        type={modalType}
        icon={modalMessages[modalType].icon}
        actionLabel={
          modalType === "success" ? "Continue to WhatsApp" : "Try Again"
        }
      />
    </section>
  );
}

function FormInput({ type = "text", placeholder, value, onChange, required }) {
  return (
    <motion.input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      whileFocus={{ scale: 1.01 }}
      style={{
        padding: "12px 16px",
        borderRadius: tokens.radius.md,
        border: `1.5px solid ${tokens.colors.border}`,
        background: tokens.colors.glass,
        color: tokens.colors.text,
        fontSize: "0.95rem",
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
  );
}

function FormSelect({ value, onChange, required, children }) {
  return (
    <motion.select
      value={value}
      onChange={onChange}
      required={required}
      whileFocus={{ scale: 1.01 }}
      style={{
        padding: "12px 16px",
        borderRadius: tokens.radius.md,
        border: `1.5px solid ${tokens.colors.border}`,
        background: tokens.colors.glass,
        color: tokens.colors.text,
        fontSize: "0.95rem",
        fontFamily: tokens.fonts.body,
        backdropFilter: "blur(10px)",
        transition: tokens.transition.smooth,
        boxSizing: "border-box",
        cursor: "pointer",
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
    >
      {children}
    </motion.select>
  );
}
