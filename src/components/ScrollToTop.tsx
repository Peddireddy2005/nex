import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLenis } from "./SmoothScroll";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const lenisRef = useLenis();

  useEffect(() => {
    lenisRef?.current?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0); // fallback
  }, [pathname, lenisRef]);

  return null;
}
