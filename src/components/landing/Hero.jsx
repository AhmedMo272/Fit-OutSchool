import Button from "../ui/Button";
import { tokens } from "../../design-system/tokens";

export default function Hero() {
  return (
    <section
      style={{
        background: tokens.colors.background,
        color: tokens.colors.text,
        padding: "120px 20px",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "3rem", fontWeight: "bold" }}>
        Become a Fit-Out Engineer 🚀
      </h1>

      <p style={{ marginTop: "10px", color: tokens.colors.muted }}>
        Real projects. Real site experience. Real career.
      </p>

      <div style={{ marginTop: "30px" }}>
        <Button>Apply Now</Button>
      </div>
    </section>
  );
}
