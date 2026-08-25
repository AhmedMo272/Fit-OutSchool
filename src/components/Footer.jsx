import {
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { tokens } from "../design-system/tokens";

export default function Footer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <footer
      style={{
        position: "relative",
        background: tokens.colors.background,
        borderTop: `1px solid ${tokens.colors.border}`,
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
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${tokens.colors.primary}40, transparent)`,
          bottom: "-100px",
          right: "-100px",
          zIndex: 1,
        }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.06 }}
        transition={{ duration: 1, delay: 0.2 }}
        style={{
          position: "absolute",
          width: "350px",
          height: "350px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${tokens.colors.sage}30, transparent)`,
          top: "50%",
          left: "-150px",
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
          position: "relative",
          zIndex: 2,
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "80px 20px 40px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "60px",
            marginBottom: "60px",
          }}
        >
          {/* Brand Section */}
          <motion.div variants={itemVariants}>
            <h3
              style={{
                fontSize: "1.4rem",
                fontFamily: tokens.fonts.heading,
                color: tokens.colors.text,
                marginBottom: "16px",
                letterSpacing: "-0.01em",
              }}
            >
              Fit-Out School
            </h3>

            <p
              style={{
                color: tokens.colors.muted,
                lineHeight: 1.7,
                marginBottom: "24px",
                fontSize: "0.95rem",
              }}
            >
              Transforming students into real site-ready engineers through
              practical experience, mentorship, and industry exposure.
            </p>

            {/* Social Icons */}
            <div
              style={{
                display: "flex",
                gap: "12px",
              }}
            >
              <SocialIcon
                href="https://www.instagram.com/fit.outschool/"
                icon={<FaInstagram />}
                label="Instagram"
              />
              <SocialIcon
                href="https://www.facebook.com/profile.php?id=61588862586328"
                icon={<FaFacebookF />}
                label="Facebook"
              />
              <SocialIcon
                href="https://www.linkedin.com/company/fitoutschool/"
                icon={<FaLinkedinIn />}
                label="LinkedIn"
              />
              <SocialIcon
                href="https://wa.me/201039820028?text=Hi%20Fit-Out%20School%2C%20I%20have%20a%20question%20about%20your%20programs."
                icon={<FaWhatsapp />}
                label="WhatsApp"
              />
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4
              style={{
                fontSize: "1.1rem",
                fontFamily: tokens.fonts.heading,
                color: tokens.colors.accent,
                marginBottom: "20px",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                fontWeight: "600",
              }}
            >
              Explore
            </h4>

            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <FooterLink href="#program">Program</FooterLink>
              <FooterLink href="#carousel">Experience</FooterLink>
              <FooterLink href="#sponsors">Partners</FooterLink>
              <FooterLink href="#apply">Apply Now</FooterLink>
            </ul>
          </motion.div>

          {/* Contact Information */}
          <motion.div variants={itemVariants}>
            <h4
              style={{
                fontSize: "1.1rem",
                fontFamily: tokens.fonts.heading,
                color: tokens.colors.accent,
                marginBottom: "20px",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                fontWeight: "600",
              }}
            >
              Get in Touch
            </h4>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "14px" }}
            >
              <ContactItem
                icon="📞"
                label="Phone"
                value="+20 103 982 0028"
                href="tel:+201039820028"
              />
              <ContactItem
                icon="✉"
                label="Email"
                value="fitoutschool@gmail.com"
                href="mailto:fitoutschool@gmail.com"
              />
              <ContactItem icon="📍" label="Location" value="Cairo, Egypt" />
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div variants={itemVariants}>
            <h4
              style={{
                fontSize: "1.1rem",
                fontFamily: tokens.fonts.heading,
                color: tokens.colors.accent,
                marginBottom: "20px",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                fontWeight: "600",
              }}
            >
              Ready to Join?
            </h4>

            <p
              style={{
                color: tokens.colors.muted,
                lineHeight: 1.6,
                marginBottom: "20px",
                fontSize: "0.95rem",
              }}
            >
              Limited seats available. Apply now to secure your spot in the next
              batch.
            </p>

            <motion.a
              href="#apply"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              style={{
                display: "inline-block",
                padding: "12px 28px",
                background: `linear-gradient(135deg, ${tokens.colors.primary}, ${tokens.colors.primaryHover})`,
                color: tokens.colors.text,
                borderRadius: tokens.radius.md,
                textDecoration: "none",
                fontWeight: "600",
                fontSize: "0.95rem",
                fontFamily: tokens.fonts.body,
                boxShadow: `0 0 20px ${tokens.colors.primary}40`,
                transition: tokens.transition.smooth,
              }}
            >
              Apply Now →
            </motion.a>
          </motion.div>
        </div>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background: `linear-gradient(90deg, transparent, ${tokens.colors.border}, transparent)`,
            marginBottom: "40px",
          }}
        />

        {/* Bottom Bar */}
        <motion.div
          variants={itemVariants}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "20px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              color: tokens.colors.muted,
              fontSize: "0.9rem",
              margin: 0,
            }}
          >
            © 2026 Fit-Out School. All rights reserved.
          </p>

          <div
            style={{
              display: "flex",
              gap: "32px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <a
              href="#"
              style={{
                color: tokens.colors.muted,
                textDecoration: "none",
                fontSize: "0.9rem",
                transition: tokens.transition.smooth,
              }}
              onMouseEnter={(e) =>
                (e.target.style.color = tokens.colors.accent)
              }
              onMouseLeave={(e) => (e.target.style.color = tokens.colors.muted)}
            >
              Privacy Policy
            </a>
            <a
              href="#"
              style={{
                color: tokens.colors.muted,
                textDecoration: "none",
                fontSize: "0.9rem",
                transition: tokens.transition.smooth,
              }}
              onMouseEnter={(e) =>
                (e.target.style.color = tokens.colors.accent)
              }
              onMouseLeave={(e) => (e.target.style.color = tokens.colors.muted)}
            >
              Terms of Service
            </a>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}

/* Sub-components */

function FooterLink({ href, children }) {
  return (
    <motion.li
      whileHover={{ x: 4 }}
      transition={{ duration: 0.2 }}
      style={{ listStyle: "none" }}
    >
      <a
        href={href}
        style={{
          color: tokens.colors.muted,
          textDecoration: "none",
          transition: tokens.transition.smooth,
          fontSize: "0.95rem",
          fontFamily: tokens.fonts.body,
        }}
        onMouseEnter={(e) => (e.target.style.color = tokens.colors.accent)}
        onMouseLeave={(e) => (e.target.style.color = tokens.colors.muted)}
      >
        {children}
      </a>
    </motion.li>
  );
}

function SocialIcon({ href, icon, label }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      title={label}
      whileHover={{ y: -6, scale: 1.15 }}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.2 }}
      style={{
        width: "48px",
        height: "48px",
        borderRadius: "50%",
        background: tokens.colors.glass,
        border: `1.5px solid ${tokens.colors.border}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: tokens.colors.accent,
        fontSize: "1.2rem",
        textDecoration: "none",
        backdropFilter: "blur(10px)",
        transition: tokens.transition.smooth,
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = tokens.colors.borderStrong;
        e.currentTarget.style.boxShadow = `0 0 20px ${tokens.colors.primary}40`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = tokens.colors.glass;
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {icon}
    </motion.a>
  );
}

function ContactItem({ icon, label, value, href }) {
  const content = (
    <>
      <span style={{ fontSize: "1.3rem", marginRight: "8px" }}>{icon}</span>
      <span>
        <div
          style={{
            fontSize: "0.85rem",
            color: tokens.colors.muted,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          {label}
        </div>
        <div
          style={{
            color: tokens.colors.accent,
            fontWeight: "500",
            fontSize: "0.95rem",
          }}
        >
          {value}
        </div>
      </span>
    </>
  );

  const style = {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
    transition: tokens.transition.smooth,
  };

  if (href) {
    return (
      <a
        href={href}
        style={{
          ...style,
          textDecoration: "none",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateX(4px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateX(0)";
        }}
      >
        {content}
      </a>
    );
  }

  return <div style={style}>{content}</div>;
}
