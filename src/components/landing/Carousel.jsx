import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import { tokens } from "../../design-system/tokens";

import "swiper/css";
import "swiper/css/autoplay";

export default function Carousel() {
  const images = [
    "/images/Carousel/1.jpeg",
    "/images/Carousel/2.jpeg",
    "/images/Carousel/3.jpeg",
    "/images/Carousel/4.jpeg",
    "/images/Carousel/5.jpeg",
    "/images/Carousel/6.jpeg",
    "/images/Carousel/7.jpeg",
    "/images/Carousel/8.jpeg",
    "/images/Carousel/9.JPG",
    "/images/Carousel/10.JPG",
  ];

  return (
    <section id="gallery" style={sectionStyle}>
      {/* Overlay */}
      <div style={overlayStyle} />

      {/* Decorative Glow */}
      <div style={glowStyle} />

      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={contentStyle}
      >
        {/* Header */}
        <div style={headerStyle}>
          <p style={eyebrowStyle}>REAL EXPERIENCE</p>

          <h2 style={titleStyle}>Our Previous Training</h2>

          <p style={subtitleStyle}>
            Step into real construction sites, work beside engineers, and
            experience the industry before graduation.
          </p>
        </div>

        {/* Carousel */}
        <Swiper
          modules={[Autoplay]}
          slidesPerView={1}
          spaceBetween={24}
          loop={true}
          speed={1200}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1100: {
              slidesPerView: 3,
            },
          }}
        >
          {images.map((img, i) => (
            <SwiperSlide key={i}>
              <motion.div
                whileHover={{
                  y: -10,
                  scale: 1.02,
                }}
                transition={{ duration: 0.35 }}
                style={cardStyle}
              >
                {/* Image */}
                <img src={img} alt={`training-${i}`} style={imgStyle} />

                {/* Overlay */}
                <div style={cardOverlay} />

                {/* Bottom Content */}
                <div style={cardContent}>
                  <span style={badgeStyle}>Fit-Out School</span>

                  <h3 style={cardTitle}>Real Site Training Experience</h3>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </section>
  );
}

/* ===================== STYLES ===================== */

const sectionStyle = {
  minHeight: "100vh",
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",

  background: `
    radial-gradient(circle at top left, rgba(101,55,32,0.18), transparent 30%),
    radial-gradient(circle at bottom right, rgba(233,225,204,0.06), transparent 25%),
    linear-gradient(
      to bottom,
      rgba(58, 26, 13, 0.96),
      rgba(43, 13, 4, 1)
    )
  `,

  padding: "100px 0",
};

const overlayStyle = {
  position: "absolute",
  inset: 0,
  background: `
    linear-gradient(
      to bottom,
      rgba(43,13,4,0.78),
      rgba(43,13,4,0.96)
    )
  `,
  zIndex: 1,
};

const glowStyle = {
  position: "absolute",
  width: "500px",
  height: "500px",
  borderRadius: "50%",
  background: "rgba(101,55,32,0.18)",
  filter: "blur(120px)",
  top: "-120px",
  right: "-120px",
  zIndex: 1,
};

const contentStyle = {
  width: "90%",
  maxWidth: "1250px",
  position: "relative",
  zIndex: 2,
};

const headerStyle = {
  textAlign: "center",
  marginBottom: "60px",
};

const eyebrowStyle = {
  color: tokens.colors.accent,
  letterSpacing: "0.35em",
  fontSize: "0.8rem",
  fontWeight: "600",
  marginBottom: "18px",
  textTransform: "uppercase",
  fontFamily: tokens.fonts.body,
};

const titleStyle = {
  fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
  fontWeight: "700",
  color: tokens.colors.text,
  marginBottom: "18px",
  fontFamily: tokens.fonts.heading,
  lineHeight: 1.1,
};

const subtitleStyle = {
  color: tokens.colors.muted,
  fontSize: "1.05rem",
  lineHeight: "1.9",
  maxWidth: "700px",
  margin: "0 auto",
  fontFamily: tokens.fonts.body,
};

const cardStyle = {
  position: "relative",
  height: "520px",
  borderRadius: tokens.radius.xl,
  overflow: "hidden",
  cursor: "pointer",

  border: `1px solid ${tokens.colors.border}`,

  background: tokens.colors.card,

  boxShadow: tokens.shadow.card,

  transition: tokens.transition.smooth,
};

const imgStyle = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

const cardOverlay = {
  position: "absolute",
  inset: 0,
  background: `
    linear-gradient(
      to top,
      rgba(18, 8, 4, 0.95),
      rgba(18, 8, 4, 0.15),
      transparent
    )
  `,
};

const cardContent = {
  position: "absolute",
  bottom: "25px",
  left: "25px",
  right: "25px",
  zIndex: 2,
};

const badgeStyle = {
  display: "inline-block",
  padding: "8px 14px",
  borderRadius: "999px",

  background: "rgba(233,225,204,0.1)",
  backdropFilter: "blur(10px)",

  border: `1px solid ${tokens.colors.borderStrong}`,

  color: tokens.colors.accent,
  fontSize: "0.75rem",
  letterSpacing: "0.08em",
  textTransform: "uppercase",

  marginBottom: "14px",
};

const cardTitle = {
  color: tokens.colors.text,
  fontSize: "1.3rem",
  fontWeight: "600",
  lineHeight: 1.4,
  fontFamily: tokens.fonts.heading,
};
