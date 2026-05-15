import { motion } from "framer-motion";
import { tokens } from "../../design-system/tokens";

const timelineItems = [
  {
    title: "Real Project-Based Training",
    content:
      "Work on actual fit-out sites from day one. No simulations. No theory-only learning.",
  },
  {
    title: "Industry-Ready Technical Skills",
    content:
      "Shop drawings, BOQs, site coordination — everything you need to operate like a real engineer.",
  },
  {
    title: "Client & Contractor Communication",
    content: "Handle meetings, expectations, and real pressure scenarios.",
  },
  {
    title: "Career Launch Support",
    content:
      "CV building, interview prep, and direct positioning for job opportunities.",
  },
];

export default function Timeline() {
  return (
    <section id="program" style={sectionStyle}>
      {/* 🔥 Background */}
      {/* <img src="/images/scene9.webp" style={bgStyle} /> */}
      <div style={overlayStyle} />

      <div style={containerStyle}>
        {/* 🔥 Header */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={headerStyle}
        >
          <p style={eyebrowStyle}>Your Journey</p>
          <h2 style={titleStyle}>From Student to Engineer</h2>
        </motion.div>

        {/* 🔥 Timeline */}
        <div style={timelineStyle}>
          {timelineItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -80 : 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              style={{
                ...itemWrapper,
                flexDirection: index % 2 === 0 ? "row" : "row-reverse",
              }}
            >
              {/* content */}
              <div style={cardStyle}>
                <h3 style={itemTitle}>{item.title}</h3>
                <p style={itemText}>{item.content}</p>
              </div>

              {/* dot */}
              <div style={dotWrapper}>
                <div style={dotStyle} />
              </div>
              <div style={lineStyle} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= STYLES ================= */

const sectionStyle = {
  minHeight: "100vh",
  padding: "100px 0",
  position: "relative",
  background: "#020617",
};

const bgStyle = {
  position: "absolute",
  width: "100%",
  height: "100%",
  objectFit: "cover",
  opacity: 0.2,
};

const overlayStyle = {
  position: "absolute",
  inset: 0,
  background: "linear-gradient(to bottom, rgba(2,6,23,0.85), #020617)",
};

const containerStyle = {
  width: "90%",
  maxWidth: "1100px",
  margin: "0 auto",
  position: "relative",
  zIndex: 2,
};

const headerStyle = {
  textAlign: "center",
  marginBottom: "80px",
};

const eyebrowStyle = {
  color: tokens.colors.primary,
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  fontSize: "0.8rem",
};

const titleStyle = {
  fontSize: "2.8rem",
  fontWeight: "bold",
};

const timelineStyle = {
  position: "relative",
};

/* vertical line */
timelineStyle["::before"] = {
  content: '""',
  position: "absolute",
  left: "50%",
  top: 0,
  width: "2px",
  height: "100%",
  background: "rgba(255,255,255,0.1)",
};

const itemWrapper = {
  display: "flex",
  alignItems: "center",
  marginBottom: "60px",
  position: "relative",
};

const cardStyle = {
  width: "45%",
  background: "rgba(17,24,39,0.6)",
  backdropFilter: "blur(20px)",
  padding: "25px",
  borderRadius: "16px",
  border: "1px solid rgba(255,255,255,0.1)",
};

const itemTitle = {
  fontSize: "1.3rem",
  marginBottom: "10px",
};

const itemText = {
  color: tokens.colors.muted,
  lineHeight: 1.6,
};

const dotWrapper = {
  width: "10%",
  display: "flex",
  justifyContent: "center",
};

const lineStyle = {
  position: "absolute",
  left: "50%",
  top: 0,
  width: "2px",
  height: "100%",
  background: "rgba(255,255,255,0.1)",
};

const dotStyle = {
  width: "14px",
  height: "14px",
  borderRadius: "50%",
  background: tokens.colors.primary,
  boxShadow: "0 0 15px rgba(124,58,237,0.7)",
};
