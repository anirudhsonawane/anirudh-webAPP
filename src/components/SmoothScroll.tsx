"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(
  ScrollTrigger,
  ScrollSmoother
);

type SmoothScrollProps = {
  children: React.ReactNode;
};

export default function SmoothScroll({
  children,
}: SmoothScrollProps) {
  const wrapperRef =
    useRef<HTMLDivElement>(null);

  const contentRef =
    useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const wrapper =
      wrapperRef.current;

    const content =
      contentRef.current;

    if (!wrapper || !content) {
      return;
    }

    const ctx = gsap.context(() => {
      /*
       * ==========================================================
       * SCROLLSMOOTHER
       * ==========================================================
       */

      const smoother =
        ScrollSmoother.create({
          wrapper,
          content,

          /*
           * Main desktop smoothness.
           *
           * 0.55 gives a premium smooth feel without making
           * the page feel delayed.
           */
          smooth: 0.55,

          /*
           * Very short touch smoothing.
           *
           * This keeps mobile responsive instead of feeling
           * like the page is floating behind the finger.
           */
          smoothTouch: 0,

          /*
           * Effects are not required for this project.
           */
          effects: false,

          /*
           * Helps keep browser/mobile scrolling synchronized.
           */
          normalizeScroll: false,

          /*
           * Prevents mobile browser address-bar resizing from
           * constantly changing the smoother's measurements.
           */
          ignoreMobileResize: true,
        });

      /*
       * ==========================================================
       * INITIAL REFRESH
       * ==========================================================
       */

      const refresh = () => {
        ScrollTrigger.refresh();
      };

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          refresh();
        });
      });

      const resizeObserver =
        new ResizeObserver(refresh);

      resizeObserver.observe(content);

      window.addEventListener(
        "load",
        refresh
      );

      return () => {
        window.removeEventListener(
          "load",
          refresh
        );

        resizeObserver.disconnect();

        ScrollTrigger.clearScrollMemory();

        smoother.kill();
      };
    }, wrapperRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      id="smooth-wrapper"
      className="smooth-wrapper"
    >
      <div
        ref={contentRef}
        id="smooth-content"
        className="smooth-content"
      >
        {children}
      </div>
    </div>
  );
}