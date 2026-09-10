"use client";

import {
  useLayoutEffect,
} from "react";

import gsap from "gsap";

import {
  ScrollTrigger,
} from "gsap/ScrollTrigger";

import {
  ScrollSmoother,
} from "gsap/ScrollSmoother";

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
  useLayoutEffect(() => {
    const wrapper =
      document.getElementById(
        "smooth-wrapper"
      );

    const content =
      document.getElementById(
        "smooth-content"
      );

    if (!wrapper || !content) {
      return;
    }

    const ctx =
      gsap.context(() => {
        const desktopQuery =
          window.matchMedia(
            "(min-width: 901px)"
          );

        ScrollTrigger.config({
          ignoreMobileResize: true,
        });

        /*
         * Mobile/tablet:
         *
         * Use native document scrolling.
         * No transformed scrolling surface is created.
         */
        if (!desktopQuery.matches) {
          const refresh = () => {
            ScrollTrigger.refresh();
          };

          const frame =
            requestAnimationFrame(() => {
              requestAnimationFrame(
                refresh
              );
            });

          window.addEventListener(
            "load",
            refresh
          );

          return () => {
            cancelAnimationFrame(frame);

            window.removeEventListener(
              "load",
              refresh
            );
          };
        }

        /*
         * Desktop:
         *
         * Keep the existing ScrollSmoother experience.
         */
        const smoother =
          ScrollSmoother.create({
            wrapper,
            content,

            smooth: 0.55,

            smoothTouch: 0,

            effects: false,

            normalizeScroll: false,

            ignoreMobileResize: true,
          });

        const refresh = () => {
          ScrollTrigger.refresh();
        };

        const frame =
          requestAnimationFrame(() => {
            requestAnimationFrame(
              refresh
            );
          });

        const observer =
          new ResizeObserver(refresh);

        observer.observe(content);

        window.addEventListener(
          "load",
          refresh
        );

        return () => {
          cancelAnimationFrame(frame);

          observer.disconnect();

          window.removeEventListener(
            "load",
            refresh
          );

          smoother.kill();
        };
      });

    return () => {
      ctx.revert();

      ScrollTrigger.clearScrollMemory();
    };
  }, []);

  return (
    <div
      id="smooth-wrapper"
      className="smooth-wrapper"
    >
      <div
        id="smooth-content"
        className="smooth-content"
      >
        {children}
      </div>
    </div>
  );
}
