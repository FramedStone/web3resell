"use client";

import { useEffect } from "react";

export default function ScrollToTop() {
  useEffect(() => {
    // Scroll to top on page refresh
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
    }
  }, []);

  return null;
}
