"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(false);
    const timeout = window.setTimeout(() => setIsVisible(true), 80);

    return () => window.clearTimeout(timeout);
  }, [pathname, searchParams.toString()]);

  useEffect(() => {
    const handlePageShow = () => {
      setIsVisible(false);
      window.setTimeout(() => setIsVisible(true), 80);
    };

    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, []);

  return (
    <div
      className={`min-h-full transition-all duration-500 ease-out ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
      }`}
      style={{ willChange: "opacity, transform" }}
    >
      {children}
    </div>
  );
}
