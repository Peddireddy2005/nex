import { useEffect, useRef, useState } from "react";

const CHATBOT_URL = "https://nexubotics-chatbot.vercel.app/";
// How long to wait for the iframe to load before we assume it's broken.
const LOAD_TIMEOUT_MS = 6000;

export default function ChatWidget() {
  const [expanded, setExpanded] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeFailed, setIframeFailed] = useState(false);
  const suppressUntilRef = useRef(0);
  const loadTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Once the user has explicitly asked to open the widget (via a page
  // button), we trust that intent over any stray "closed" broadcast from
  // the iframe until the iframe *itself* confirms it's open. This avoids
  // the race where the bot's own initial "closed" state message arrives
  // shortly after we force-open the widget and silently collapses it
  // again, making the click look like it did nothing.
  const userRequestedOpenRef = useRef(false);

  useEffect(() => {
    function handleMessage(e: MessageEvent) {
      if (e.data?.type === "nexubotics-widget-state") {
        // eslint-disable-next-line no-console
        console.log("[ChatWidget] received widget-state from iframe:", e.data);

        if (e.data.open) {
          // The bot confirming it's open is always trusted immediately,
          // and clears any pending "user requested open" guard.
          userRequestedOpenRef.current = false;
          setExpanded(true);
          return;
        }

        // e.data.open is false (bot reporting closed/collapsed).
        if (Date.now() < suppressUntilRef.current) return;
        if (userRequestedOpenRef.current) {
          // We just asked it to open — ignore this stale "closed" report
          // instead of collapsing the widget the user just opened.
          return;
        }
        setExpanded(false);
      }
    }
    window.addEventListener("message", handleMessage);

    function handleOpenRequest() {
      // eslint-disable-next-line no-console
      console.log("[ChatWidget] nexubotics:open-chat received, expanding");
      setExpanded(true);
      userRequestedOpenRef.current = true;
      suppressUntilRef.current = Date.now() + 4000;
      setTimeout(() => {
        userRequestedOpenRef.current = false;
      }, 4000);
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

  // Start a "did it actually load" timer as soon as the widget expands.
  // If the iframe never fires onLoad (or loads but the app inside never
  // sends us a heartbeat) within LOAD_TIMEOUT_MS, treat it as failed and
  // show a fallback so the user isn't stuck staring at a blank box.
  useEffect(() => {
    if (!expanded) return;

    if (loadTimeoutRef.current) clearTimeout(loadTimeoutRef.current);

    if (!iframeLoaded) {
      loadTimeoutRef.current = setTimeout(() => {
        setIframeFailed(true);
      }, LOAD_TIMEOUT_MS);
    }

    return () => {
      if (loadTimeoutRef.current) clearTimeout(loadTimeoutRef.current);
    };
  }, [expanded, iframeLoaded]);

  const handleIframeLoad = () => {
    setIframeLoaded(true);
    setIframeFailed(false);
    if (loadTimeoutRef.current) clearTimeout(loadTimeoutRef.current);
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        right: 0,
        width: expanded ? "min(450px, 100vw)" : "min(130px, 40vw)",
        height: expanded ? "min(770px, 100dvh)" : "min(180px, 30dvh)",
        maxWidth: "100vw",
        maxHeight: "100dvh",
        zIndex: 9999,
        transition: "width 0.15s ease, height 0.15s ease",
      }}
    >
      <iframe
        src={CHATBOT_URL}
        title="Nexubotics Chat"
        allow="clipboard-write"
        onLoad={handleIframeLoad}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          border: "none",
          background: "transparent",
          overscrollBehavior: "contain",
        }}
      />

      {/* Fallback shown only when expanded AND the iframe never confirmed
          it loaded/responded in time. Guarantees the user always has a
          working way to reach the chat instead of a dead blank box. */}
      {expanded && iframeFailed && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            padding: 24,
            textAlign: "center",
            background: "#ffffff",
            border: "1px solid rgba(9,13,31,0.08)",
            borderRadius: 16,
            boxShadow: "0 12px 30px -5px rgba(9,13,31,0.15)",
          }}
        >
          <p style={{ fontSize: 13, fontWeight: 600, color: "#334155", margin: 0 }}>
            The chat assistant is taking longer than expected to load.
          </p>
          <p style={{ fontSize: 12, color: "#64748b", margin: 0 }}>
            You can open it directly in a new tab instead.
          </p>
          <a
            href={CHATBOT_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              padding: "8px 18px",
              borderRadius: 10,
              background: "#2563eb",
              color: "#fff",
              fontSize: 12,
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Open Chat in New Tab
          </a>
          <button
            type="button"
            onClick={() => setExpanded(false)}
            style={{
              marginTop: 4,
              fontSize: 11,
              color: "#94a3b8",
              background: "none",
              border: "none",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}