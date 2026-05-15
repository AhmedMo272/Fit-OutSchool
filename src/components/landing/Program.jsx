import { motion } from "framer-motion";

const items = [
  {
    title: "Real Projects",
    desc: "Work on actual sites from day one",
  },
  {
    title: "Technical Skills",
    desc: "Drawings, BOQs & execution",
  },
  {
    title: "Client Handling",
    desc: "Communicate like a real engineer",
  },
  {
    title: "Career Launch",
    desc: "Be job-ready in 3 weeks",
  },
];

export default function Program() {
  return (
    <section style={sectionStyle}>
      <h2 style={titleStyle}>What You’ll Learn</h2>

      <div style={gridStyle}>
        {items.map((item, i) => (
          <motion.div key={i} whileHover={{ scale: 1.05 }} style={cardStyle}>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

const sectionStyle = {
  padding: "100px 20px",
  textAlign: "center",
  background: "#020617",
};

const titleStyle = {
  fontSize: "2.5rem",
  marginBottom: "40px",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "20px",
};

const cardStyle = {
  padding: "30px",
  borderRadius: "20px",
  background: "rgba(17,24,39,0.6)",
  border: "1px solid rgba(255,255,255,0.1)",
};
