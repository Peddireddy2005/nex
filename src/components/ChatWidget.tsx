import { useEffect, useState } from "react";

const CHATBOT_URL = "https://nexubotics-chatbot.vercel.app/";

export default function ChatWidget() {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    function handleMessage(e: MessageEvent) {
      if (e.data?.type === "nexubotics-widget-state") {
        setExpanded(e.data.open);
      }
    }
    window.addEventListener("message", handleMessage);

    // Allows any page (Home, Support, etc.) to open THIS real chatbot
    // instead of using a separate fake/canned chat UI.
    function handleOpenRequest() {
      setExpanded(true);
      try {
        const iframe = document.querySelector<HTMLIFrameElement>(
          'iframe[title="Nexubotics Chat"]'
        );
        iframe?.contentWindow?.postMessage(
          { type: "nexubotics-open-widget" },
          "*"
        );
      } catch {
        // no-op
      }
    }
    window.addEventListener("nexubotics:open-chat", handleOpenRequest);

    return () => {
      window.removeEventListener("message", handleMessage);
      window.removeEventListener("nexubotics:open-chat", handleOpenRequest);
    };
  }, []);

  return (
    <iframe
      src={CHATBOT_URL}
      title="Nexubotics Chat"
      allow="clipboard-write"
      style={{
        position: "fixed",
        bottom: 0,
        right: 0,
        width: expanded ? "450px" : "130px",
        height: expanded ? "770px" : "180px",
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