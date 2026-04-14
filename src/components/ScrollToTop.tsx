import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, search, hash } = useLocation();

  useLayoutEffect(() => {
    const id = window.setTimeout(() => {
      if (hash) return;
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }, 0);
    return () => window.clearTimeout(id);
  }, [pathname, search, hash]);

  return null;
};

export default ScrollToTop;
