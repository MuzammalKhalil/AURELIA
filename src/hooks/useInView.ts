"use client";

import { useState, useEffect, useRef } from "react";

export function useInView<T extends HTMLElement = HTMLDivElement>(threshold = 0.1) {
  const [isInView, setIsInView] = useState(true);
  const ref = useRef<T | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold, rootMargin: "200px" } // preload 200px before scrolling in
    );

    const current = ref.current;
    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [threshold]);

  return { ref, isInView };
}

