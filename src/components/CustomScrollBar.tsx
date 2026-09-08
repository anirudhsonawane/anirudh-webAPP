"use client";

import { useEffect, useRef } from "react";

export default function CustomScrollBar() {
  const thumbRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const update = () => {
      if (!thumbRef.current) return;

      const viewportHeight = window.innerHeight;
      const documentHeight =
        document.documentElement.scrollHeight;

      const scrollableHeight = Math.max(
        0,
        documentHeight - viewportHeight
      );

      const scrollTop =
        window.scrollY ||
        document.documentElement.scrollTop ||
        0;

      if (scrollableHeight <= 0) {
        thumbRef.current.style.height = "100%";
        thumbRef.current.style.transform =
          "translate3d(0, 0, 0)";
        return;
      }

      const thumbHeight = Math.max(
        70,
        Math.min(
          viewportHeight,
          (viewportHeight / documentHeight) *
            viewportHeight
        )
      );

      const maxThumbTravel = Math.max(
        0,
        viewportHeight - thumbHeight
      );

      const progress = Math.min(
        1,
        Math.max(
          0,
          scrollTop / scrollableHeight
        )
      );

      thumbRef.current.style.height =
        `${thumbHeight}px`;

      thumbRef.current.style.transform =
        `translate3d(0, ${
          progress * maxThumbTravel
        }px, 0)`;
    };

    const requestUpdate = () => {
      if (rafRef.current !== null) return;

      rafRef.current =
        requestAnimationFrame(() => {
          rafRef.current = null;
          update();
        });
    };

    update();

    window.addEventListener(
      "scroll",
      requestUpdate,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      requestUpdate
    );

    window.addEventListener(
      "load",
      requestUpdate
    );

    const resizeObserver =
      new ResizeObserver(requestUpdate);

    resizeObserver.observe(
      document.documentElement
    );

    return () => {
      window.removeEventListener(
        "scroll",
        requestUpdate
      );

      window.removeEventListener(
        "resize",
        requestUpdate
      );

      window.removeEventListener(
        "load",
        requestUpdate
      );

      resizeObserver.disconnect();

      if (rafRef.current !== null) {
        cancelAnimationFrame(
          rafRef.current
        );
      }
    };
  }, []);

  return (
    <div
      className="custom-scrollbar"
      aria-hidden="true"
    >
      <div
        ref={thumbRef}
        className="custom-scrollbar-thumb"
      />
    </div>
  );
}
