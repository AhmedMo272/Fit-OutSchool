import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const pixelId = import.meta.env.VITE_META_PIXEL_ID;

function loadMetaPixel() {
  if (!pixelId || typeof window === "undefined" || window.fbq) {
    return;
  }

  const fbq = function (...args) {
    fbq.callMethod ? fbq.callMethod(...args) : fbq.queue.push(args);
  };

  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.queue = [];
  window.fbq = fbq;

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);

  window.fbq("init", pixelId);
}

export function trackMetaEvent(eventName, parameters) {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", eventName, parameters);
  }
}

export default function MetaPixel() {
  const location = useLocation();

  useEffect(() => {
    loadMetaPixel();
  }, []);

  useEffect(() => {
    if (pixelId && typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "PageView");
    }
  }, [location.pathname, location.search]);

  return null;
}