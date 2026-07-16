"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRive, Layout, Fit, Alignment } from "@rive-app/react-canvas";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const { RiveComponent } = useRive({
    src: "https://cdn.rive.app/animations/vehicles.riv",
    autoplay: true,
    layout: new Layout({ fit: Fit.Contain, alignment: Alignment.Center }),
  });

  useEffect(() => {
    setIsVisible(false);
    const timeout = window.setTimeout(() => setIsVisible(true), 120);

    return () => window.clearTimeout(timeout);
  }, [pathname, searchParams.toString()]);

  useEffect(() => {
    const handlePageShow = () => {
      setIsVisible(false);
      window.setTimeout(() => setIsVisible(true), 120);
    };

    const handleScroll = () => {
      const maxScroll = Math.max(220, window.innerHeight * 0.4);
      const nextProgress = Math.min(1, window.scrollY / maxScroll);
      setScrollProgress(nextProgress);
    };

    handleScroll();
    window.addEventListener("pageshow", handlePageShow);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("pageshow", handlePageShow);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const transformStyle = useMemo(
    () => ({
      transform: `translate3d(0, ${22 * (1 - scrollProgress)}px, 0) scale(${0.96 + scrollProgress * 0.04})`,
      opacity: `${0.5 + scrollProgress * 0.5}`,
    }),
    [scrollProgress]
  );

  return (
    <div className="min-h-full" style={{ willChange: "opacity, transform" }}>
      <div
        className={`pointer-events-none fixed inset-0 z-40 flex items-center justify-center bg-cream/95 transition-opacity duration-400 ${
          isVisible ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="w-56 max-w-[80vw]" style={{ transform: `scale(${0.9 + scrollProgress * 0.08})` }}>
          <RiveComponent />
        </div>
      </div>
      <div
        className={`min-h-full transition-all duration-500 ease-out ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
        }`}
        style={transformStyle}
      >
        {children}
      </div>
    </div>
  );
}
