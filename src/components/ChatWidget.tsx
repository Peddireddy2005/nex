import { useEffect, useRef, useState } from "react";

const CHATBOT_URL = "https://nexubotics-chatbot.vercel.app/";

export default function ChatWidget() {
  const [expanded, setExpanded] = useState(false);
  const suppressUntilRef = useRef(0);

  useEffect(() => {
    function handleMessage(e: MessageEvent) {
      if (e.data?.type === "nexubotics-widget-state") {
        // eslint-disable-next-line no-console
        console.log("[ChatWidget] received widget-state from iframe:", e.data);
        if (Date.now() < suppressUntilRef.current) return;
        setExpanded(e.data.open);
      }
    }
    window.addEventListener("message", handleMessage);

    function handleOpenRequest() {
      // eslint-disable-next-line no-console
      console.log("[ChatWidget] nexubotics:open-chat received, expanding");
      setExpanded(true);
      suppressUntilRef.current = Date.now() + 1500;
      try {
        const iframe = document.querySelector<HTMLIFrameElement>(
          'iframe[title="Nexubotics Chat"]'
        );
        if (!iframe) {
          // eslint-disable-next-line no-console
          console.warn("[ChatWidget] could not find iframe to postMessage to");
        }
        iframe?.contentWindow?.postMessage(
          { type: "nexubotics-open-widget" },
          "*"
        );
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn("[ChatWidget] postMessage failed:", err);
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
        width: expanded ? "min(450px, 100vw)" : "min(130px, 40vw)",
        height: expanded ? "min(770px, 100dvh)" : "min(180px, 30dvh)",
        maxWidth: "100vw",
        maxHeight: "100dvh",
        border: "none",
        background: "transparent",
        zIndex: 9999,
        overscrollBehavior: "contain",
        transition: "width 0.15s ease, height 0.15s ease",
      }}
    />
  );
}