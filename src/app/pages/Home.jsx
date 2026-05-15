import Scene from "../../components/immersive/Scene";
import CursorGlow from "../../components/immersive/CursorGlow";
import CTA from "../../components/landing/CTA";
import Counter from "../../components/landing/Counter";
import Sponsors from "../../components/landing/Sponsors";
import ParallaxSection from "../../components/immersive/ParallaxSection";
import Carousel from "../../components/landing/Carousel";
import Program from "../../components/landing/Program_new";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Timeline from "../../components/landing/Accordion";
export default function Home() {
  return (
    <>
      <Navbar />
      {/* 🟣 Global Effect */}
      <CursorGlow />

      {/* 🎬 STORY START */}
      <div id="home">
        <Scene
          title="You don’t become a Fit-Out Engineer in classrooms."
          subtitle="You become one on site."
          image="/images/scene.png"
        />
      </div>

      <Scene
        title="You studied for years..."
        subtitle="But can you handle a real project?"
        image="/images/scene2.png"
      />

      <Scene
        title="Deadlines. Clients. Real Pressure."
        subtitle="This is the real world."
        image="/images/scene3.png"
      />
      <Scene
        title="This is where everything changes."
        subtitle="Welcome to Fit-Out School."
        image="/images/scene4.png"
      />
      <Scene
        title="3 Weeks. Real Site Experience."
        subtitle="From zero to professional."
        image="/images/scene5.png"
      />

      {/* 🚨 FINAL PUSH */}
      <Scene
        title="Only 100 seats."
        subtitle="No second chances."
        image="/images/scene7.png"
      />
      {/* 🔢 SOCIAL PROOF */}
      <section>
        <Counter target={500} image="/images/img2.JPG" />
      </section>
      {/* 🖼️ CAROUSEL */}
      <div id="carousel">
        <Carousel />
      </div>
      {/* 🤝 TRUST */}

      <div id="sponsors">
        <Sponsors />
        {/* <section style={sectionStyle}></section> */}
      </div>

      <div id="program">
        {/* 📚 PROGRAM */}
        {/* <section style={sectionStyle}> */}
        <Program />
        {/* </section> */}
      </div>

      {/* 🎯 CTA */}
      <div id="apply">
        <CTA />
      </div>
      <Footer />
    </>
  );
}

const sectionStyle = {
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  position: "relative",
  background: "#020617",
  backgroundSize: "cover",
  backgroundPosition: "center",
};
