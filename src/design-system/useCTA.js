import { useEffect, useState } from "react";

export const useCTA = () => {
  const [showCTA, setShowCTA] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1500) {
        setShowCTA(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return showCTA;
};