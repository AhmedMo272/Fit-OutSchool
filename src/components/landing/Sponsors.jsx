import { useState } from "react";
import { tokens } from "../../design-system/tokens";

export default function Sponsors() {
  const brands = [
    { name: "Alora", src: "/brands/Alora.webp" },
    { name: "Mazloom", src: "/brands/Mazloom2.png" },
    { name: "Opindoo", src: "/brands/opindoo.svg" },
  ];

  return (
    <section style={containerStyle}>
      <div style={headerStyle}>
        <p style={eyebrowStyle}>Premium Brands</p>
        <h2 style={titleStyle}>
          Trusted by the best in fit-out and interior design.
        </h2>
        <p style={descriptionStyle}>
          We partner with top suppliers and manufacturers to bring your projects
          premium finishes and curated materials.
        </p>
      </div>

      <div style={gridStyle}>
        {brands.map((brand, index) => (
          <BrandCard key={index} brand={brand} />
        ))}
      </div>
    </section>
  );
}

function BrandCard({ brand }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        ...cardStyle,
        borderColor: isHovered ? tokens.colors.primary : tokens.colors.border,
        boxShadow: isHovered
          ? `0 4px 20px ${tokens.colors.primary}40`
          : "0 2px 8px rgba(0,0,0,0.1)",
        transform: isHovered ? "translateY(-4px)" : "translateY(0)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={brand.src} alt={brand.name} style={imageStyle} />
    </div>
  );
}

const containerStyle = {
  width: "100%",
  padding: "60px 20px",
  background: tokens.colors.background,
  color: tokens.colors.text,
};

const headerStyle = {
  display: "grid",
  gap: "14px",
  maxWidth: "820px",
  margin: "0 auto 40px",
  textAlign: "center",
};

const eyebrowStyle = {
  textTransform: "uppercase",
  letterSpacing: "0.2em",
  color: tokens.colors.primary,
  fontSize: "0.85rem",
  fontWeight: 700,
};

const titleStyle = {
  fontSize: "2.25rem",
  fontWeight: 700,
  margin: 0,
  color: tokens.colors.text,
};

const descriptionStyle = {
  fontSize: "1rem",
  color: tokens.colors.muted,
  lineHeight: 1.8,
  margin: 0,
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: "24px",
  maxWidth: "1120px",
  margin: "0 auto",
};

const cardStyle = {
  border: "2px solid",
  borderRadius: "16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: tokens.colors.card,
  transition: "all 0.3s ease",
  cursor: "pointer",
  minHeight: "220px",
  padding: "30px",
};

const imageStyle = {
  maxWidth: "100%",
  maxHeight: "120px",
  objectFit: "contain",
};
