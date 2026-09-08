"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const titleLineOneRef = useRef<HTMLSpanElement>(null);
  const titleLineTwoRef = useRef<HTMLSpanElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(imageRef.current, {
        scale: 1.04,
      });

      gsap.set(
        [
          titleLineOneRef.current,
          titleLineTwoRef.current,
        ],
        {
          opacity: 0,
          y: 70,
        }
      );

      gsap.set(descriptionRef.current, {
        opacity: 0,
        y: 30,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={heroRef}
      className="absolute inset-0 overflow-hidden"
    >
      <img
        ref={imageRef}
        data-hero-image
        src="/images/home-bg.png"
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      <div className="absolute inset-0 bg-white/[0.04]" />

      <div
        data-hero-title
        className="absolute inset-0 z-[2] flex items-center justify-center px-4 pb-[13svh] text-center sm:px-6 sm:pb-[11vh] md:pb-[10vh]"
      >
        <h1
          ref={titleRef}
          className="font-light leading-[0.8] tracking-[-0.08em] text-white"
        >
          <span
            ref={titleLineOneRef}
            className="block text-[clamp(3rem,14vw,5rem)] sm:text-[clamp(4.5rem,12vw,11.5rem)]"
          >
            Green
          </span>

          <span
            ref={titleLineTwoRef}
            className="block text-[clamp(3rem,14vw,5rem)] sm:text-[clamp(4.5rem,12vw,11.5rem)]"
          >
            Infrastructure
          </span>
        </h1>
      </div>

      <div
        ref={descriptionRef}
        data-hero-description
        className="absolute bottom-[max(18px,env(safe-area-inset-bottom))] left-1/2 z-[3] w-full max-w-[760px] -translate-x-1/2 px-5 text-center text-white sm:bottom-10 sm:px-6 md:bottom-11 lg:bottom-12"
      >
        <p className="text-[11px] font-normal leading-[1.35] tracking-[-0.015em] sm:text-[15px] md:text-[17px]">
          A platform for planning, managing, and scaling green infrastructure
          across complex systems.
        </p>
      </div>
    </div>
  );
}