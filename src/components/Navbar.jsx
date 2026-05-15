import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { tokens } from "../design-system/tokens";
import { IoMenu, IoClose } from "react-icons/io5";

const links = [
  { name: "Home", id: "home" },
  { name: "Program", id: "program" },
  { name: "Experience", id: "gallery" },
  { name: "Partners", id: "sponsors" },
  { name: "Apply", id: "apply" },
];

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  /* detect scroll */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      links.forEach((link) => {
        const section = document.getElementById(link.id);

        if (section) {
          const rect = section.getBoundingClientRect();

          if (rect.top <= 150 && rect.bottom >= 150) {
            setActive(link.id);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* detect resize */
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);

      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* scroll */
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });

    setIsMenuOpen(false);
  };

  /* refresh page */
  const refreshPage = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setTimeout(() => {
      window.location.reload();
    }, 300);
  };

  return (
    <nav style={navStyle(scrolled)}>
      <div style={navInnerStyle}>
        {/* LOGO + BRAND */}
        <motion.div
          style={brandWrapper}
          onClick={refreshPage}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          {/* LOGO */}
          <img src="/images/logo.png" alt="Fit-Out School" style={logoImage} />

          {/* BRAND NAME */}
          <div>
            {/* <h3 style={logoStyle}>Fit-Out School</h3> */}

            <p style={taglineStyle}>Real Experience • Real Sites</p>
          </div>
        </motion.div>

        {/* DESKTOP LINKS */}
        {!isMobile && (
          <div style={linksStyle}>
            {links.map((link) => (
              <motion.span
                key={link.id}
                onClick={() => scrollTo(link.id)}
                whileHover={{
                  color: tokens.colors.accent,
                }}
                style={{
                  ...linkStyle,
                  color:
                    active === link.id
                      ? tokens.colors.accent
                      : tokens.colors.text,
                }}
              >
                {link.name}

                {active === link.id && (
                  <motion.div layoutId="underline" style={underlineStyle} />
                )}
              </motion.span>
            ))}
          </div>
        )}

        {/* MOBILE MENU BUTTON */}
        {isMobile && (
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.9 }}
            style={menuButtonStyle}
          >
            {isMenuOpen ? <IoClose /> : <IoMenu />}
          </motion.button>
        )}
      </div>

      {/* MOBILE MENU */}
      {isMobile && isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={mobileMenuStyle}
        >
          {links.map((link) => (
            <motion.div
              key={link.id}
              onClick={() => scrollTo(link.id)}
              whileHover={{ x: 6 }}
              style={{
                ...mobileLinkStyle,
                background:
                  active === link.id ? tokens.colors.card : "transparent",
                color:
                  active === link.id
                    ? tokens.colors.accent
                    : tokens.colors.text,
              }}
            >
              {link.name}
            </motion.div>
          ))}
        </motion.div>
      )}
    </nav>
  );
}

/* ================= STYLES ================= */

const navStyle = (scrolled) => ({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  zIndex: 1000,

  background: scrolled ? "rgba(43,13,4,0.82)" : "transparent",

  backdropFilter: scrolled ? "blur(18px)" : "none",

  borderBottom: scrolled
    ? `1px solid ${tokens.colors.border}`
    : "1px solid transparent",

  transition: tokens.transition.smooth,
});

const navInnerStyle = {
  maxWidth: "1250px",
  margin: "0 auto",

  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",

  padding: "18px 24px",
};

const brandWrapper = {
  display: "flex",
  alignItems: "center",
  gap: "14px",
  cursor: "pointer",
};

const logoImage = {
  width: "100px",
  height: "100px",
  objectFit: "contain",
};

const logoStyle = {
  margin: 0,
  color: tokens.colors.text,
  fontFamily: tokens.fonts.heading,
  fontSize: "1.35rem",
  fontWeight: "700",
  letterSpacing: "-0.02em",
  lineHeight: 1.1,
};

const taglineStyle = {
  margin: 0,
  marginTop: "3px",
  color: tokens.colors.muted,
  fontSize: "0.72rem",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
};

const linksStyle = {
  display: "flex",
  alignItems: "center",
  gap: "34px",
};

const linkStyle = {
  position: "relative",
  cursor: "pointer",
  fontSize: "0.95rem",
  fontWeight: "500",
  fontFamily: tokens.fonts.body,
  transition: tokens.transition.smooth,
  paddingBottom: "6px",
};

const underlineStyle = {
  position: "absolute",
  bottom: 0,
  left: 0,
  width: "100%",
  height: "2px",
  borderRadius: "999px",
  background: tokens.colors.accent,
};

const menuButtonStyle = {
  background: "transparent",
  border: "none",
  color: tokens.colors.text,
  fontSize: "1.8rem",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const mobileMenuStyle = {
  background: "rgba(43,13,4,0.96)",
  backdropFilter: "blur(20px)",
  borderTop: `1px solid ${tokens.colors.border}`,

  padding: "20px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const mobileLinkStyle = {
  padding: "14px 16px",
  borderRadius: tokens.radius.md,
  cursor: "pointer",
  transition: tokens.transition.smooth,
  fontFamily: tokens.fonts.body,
};
