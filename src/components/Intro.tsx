"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export default function Intro() {
  const introRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const lineOneRef = useRef<HTMLDivElement>(null);
  const lineTwoRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      /*
       * INITIAL STATES
       */

      gsap.set(brandRef.current, {
        opacity: 0,
        y: 15,
      });

      gsap.set(imageContainerRef.current, {
        clipPath: "inset(100% 0% 0% 0%)",
      });

      gsap.set(imageRef.current, {
        scale: 1.12,
      });

      gsap.set([lineOneRef.current, lineTwoRef.current], {
        opacity: 0,
        y: 60,
      });

      /*
       * INTRO
       */

      tl.to(brandRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
      })

        .to(
          imageContainerRef.current,
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.2,
            ease: "power4.inOut",
          },
          "-=0.1"
        )

        .to(
          imageRef.current,
          {
            scale: 1,
            duration: 1.8,
            ease: "power2.out",
          },
          "<"
        )

        .to(
          lineOneRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.65"
        )

        .to(
          lineTwoRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.55"
        )

        /*
         * HOLD
         */

        .to({}, {
          duration: 0.5,
        })

        /*
         * PREPARE EXIT
         *
         * The content disappears first,
         * but the image itself stays completely
         * stable.
         */

        .to(
          [lineOneRef.current, lineTwoRef.current],
          {
            opacity: 0,
            y: -35,
            duration: 0.5,
            stagger: 0.035,
            ease: "power3.in",
          }
        )

        .to(
          brandRef.current,
          {
            opacity: 0,
            y: -15,
            duration: 0.4,
            ease: "power2.in",
          },
          "<"
        )

        /*
         * HOMEPAGE HANDOFF
         *
         * The event fires at the exact start
         * of the curtain movement.
         */

        .to(
          introRef.current,
          {
            yPercent: 100,
            duration: 1.15,
            ease: "power3.inOut",
            pointerEvents: "none",

            onStart: () => {
              window.dispatchEvent(
                new CustomEvent("homepage:enter")
              );
            },
          }
        );

    }, introRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={introRef}
      aria-hidden="true"
      className="fixed inset-0 z-50 bg-[#f3f2ed]"
    >
      <div className="absolute inset-0 flex items-center justify-center p-2.5 sm:p-4 md:p-6">
        <div
          ref={imageContainerRef}
          className="relative h-full w-full overflow-hidden rounded-[18px] sm:rounded-[24px] md:rounded-[32px]"
        >
          <div
            ref={imageRef}
            className="absolute inset-0 h-full w-full"
          >
            <img
              src="/images/hero-bg.jpg"
              alt=""
              className="h-full w-full object-cover"
            />
          </div>

          <div className="absolute inset-0 bg-black/5" />

          <div
            ref={brandRef}
            className="absolute left-1/2 top-6 -translate-x-1/2 text-[13px] font-medium tracking-tight text-white sm:top-8 sm:text-sm md:top-10 md:text-base"
          >
            Anirudh
          </div>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <div
                ref={lineOneRef}
                className="text-[clamp(3.4rem,15vw,5rem)] font-light leading-[0.85] tracking-[-0.06em] sm:text-[clamp(4rem,10vw,10rem)]"
              >
                Green
              </div>

              <div
                ref={lineTwoRef}
                className="text-[clamp(3.4rem,15vw,5rem)] font-light leading-[0.85] tracking-[-0.065em] sm:text-[clamp(4rem,10vw,10rem)]"
              >
                Infrastructure
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}