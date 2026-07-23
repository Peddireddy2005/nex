import { useEffect, useRef, useState } from "react";

export const CHATBOT_URL = "https://nexubotics-chatbot.vercel.app/";

export default function ChatWidget() {
  const [expanded, setExpanded] = useState(false);
  const suppressUntilRef = useRef(0);

  useEffect(() => {
    // If the bot is ever updated to broadcast its own open/closed state,
    // this keeps working automatically. Until then it's just inert.
    function handleMessage(e: MessageEvent) {
      if (e.data?.type === "nexubotics-widget-state") {
        if (Date.now() < suppressUntilRef.current) return;
        setExpanded(!!e.data.open);
      }
    }
    window.addEventListener("message", handleMessage);

    function handleOpenRequest() {
      setExpanded(true);
      suppressUntilRef.current = Date.now() + 4000;
      try {
        const iframe = document.querySelector<HTMLIFrameElement>(
          'iframe[title="Nexubotics Chat"]'
        );
        iframe?.contentWindow?.postMessage(
          { type: "nexubotics-open-widget" },
          "*"
        );
      } catch {
        /* no-op: this is a best-effort nudge, not load-bearing */
      }

      // Guaranteed fallback: the embedded widget's own message handshake
      // is unconfirmed/unreliable right now, so always also open the same
      // chat experience in a new tab. This always works regardless of
      // whether the bot ever reacts to the postMessage above.
      window.open(CHATBOT_URL, "_blank", "noopener,noreferrer");
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