import { useEffect, useState } from "react";

const CHATBOT_URL = "https://nexubotics-chatbot.vercel.app/";

export default function ChatWidget() {
  const [expanded, setExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleMessage(e: MessageEvent) {
      if (e.data?.type === "nexubotics-widget-state") {
        setExpanded(e.data.open);
      }
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const collapsedWidth = isMobile ? "88px" : "130px";
  const collapsedHeight = isMobile ? "88px" : "180px";

  return (
    <iframe
      src={CHATBOT_URL}
      title="Nexubotics Chat"
      allow="clipboard-write"
      style={{
        position: "fixed",
        bottom: "env(safe-area-inset-bottom, 0px)",
        right: "env(safe-area-inset-right, 0px)",
        width: expanded ? "min(450px, 100vw)" : collapsedWidth,
        // Cap expanded height so it never fully covers a short mobile
        // viewport (a fixed 770px hid the page and the widget's own
        // close control on phones).
        height: expanded ? "min(770px, calc(100vh - 24px))" : collapsedHeight,
        maxWidth: "100vw",
        maxHeight: "100vh",
        border: "none",
        background: "transparent",
        zIndex: 9999,
        transition: "width 0.15s ease, height 0.15s ease",
      }}
    />
  );
}