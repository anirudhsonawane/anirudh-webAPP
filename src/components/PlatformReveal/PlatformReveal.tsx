"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

import styles from "./PlatformReveal.module.css";
import { platformRevealData } from "./platformRevealData";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function PlatformReveal() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const mainImageRef =
    useRef<HTMLDivElement | null>(null);

  const mainImageInnerRef =
    useRef<HTMLImageElement | null>(null);

  const secondaryImageRef =
    useRef<HTMLDivElement | null>(null);

  const eyebrowRef =
    useRef<HTMLDivElement | null>(null);

  const titleRef =
    useRef<HTMLHeadingElement | null>(null);

  const controlsRef =
    useRef<HTMLDivElement | null>(null);

  const featureRef =
    useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      /*
       * ============================================================
       * DESKTOP
       * ============================================================
       *
       * Desktop keeps the pinned composition.
       *
       * ScrollSmoother handles page smoothing.
       * ScrollTrigger therefore uses scrub: true.
       */

      mm.add("(min-width: 1200px)", () => {
        if (
          !mainImageRef.current ||
          !mainImageInnerRef.current ||
          !eyebrowRef.current ||
          !titleRef.current ||
          !controlsRef.current ||
          !featureRef.current ||
          !secondaryImageRef.current
        ) {
          return;
        }

        const titleSplit =
          SplitText.create(
            titleRef.current,
            {
              type: "lines",
              mask: "lines",
              linesClass:
                "platform-title-line",
            }
          );

        /*
         * ------------------------------------------------------------
         * INITIAL STATES
         * ------------------------------------------------------------
         */

        gsap.set(
          mainImageRef.current,
          {
            clipPath:
              "inset(0% 0% 100% 0%)",
          }
        );

        gsap.set(
          mainImageInnerRef.current,
          {
            scale: 1.06,
            yPercent: 3,
          }
        );

        gsap.set(
          eyebrowRef.current,
          {
            y: 24,
            opacity: 0,
          }
        );

        gsap.set(
          titleSplit.lines,
          {
            yPercent: 105,
          }
        );

        gsap.set(
          controlsRef.current,
          {
            y: 28,
            opacity: 0,
          }
        );

        gsap.set(
          featureRef.current,
          {
            y: 30,
            opacity: 0,
          }
        );

        gsap.set(
          secondaryImageRef.current,
          {
            clipPath:
              "inset(100% 0% 0% 0%)",
            y: 24,
            opacity: 0,
          }
        );

        /*
         * ------------------------------------------------------------
         * MASTER TIMELINE
         * ------------------------------------------------------------
         */

        const tl = gsap.timeline({
          defaults: {
            ease: "none",
          },

          scrollTrigger: {
            trigger: section,

            start: "top top",

            /*
             * Enough scroll distance for the composition to breathe
             * without making it unnecessarily slow.
             */
            end: "+=190%",

            pin: true,
            pinSpacing: true,

            /*
             * ScrollSmoother is the only interpolation layer.
             */
            scrub: true,

            anticipatePin: 1,

            invalidateOnRefresh: true,

            fastScrollEnd: false,

            preventOverlaps: true,

            refreshPriority: 1,
          },
        });

        /*
         * ------------------------------------------------------------
         * MAIN IMAGE
         * ------------------------------------------------------------
         */

        tl.to(
          mainImageRef.current,
          {
            clipPath:
              "inset(0% 0% 0% 0%)",

            duration: 1.15,
          },
          0
        );

        tl.to(
          mainImageInnerRef.current,
          {
            scale: 1,
            yPercent: 0,

            duration: 1.15,
          },
          0
        );

        /*
         * ------------------------------------------------------------
         * EYEBROW
         * ------------------------------------------------------------
         */

        tl.to(
          eyebrowRef.current,
          {
            y: 0,
            opacity: 1,

            duration: 0.35,

            ease: "power2.out",
          },
          0.18
        );

        /*
         * ------------------------------------------------------------
         * TITLE
         * ------------------------------------------------------------
         */

        tl.to(
          titleSplit.lines,
          {
            yPercent: 0,

            duration: 0.65,

            stagger: 0.11,

            ease: "power3.out",
          },
          0.28
        );

        /*
         * ------------------------------------------------------------
         * CONTROLS
         * ------------------------------------------------------------
         */

        tl.to(
          controlsRef.current,
          {
            y: 0,
            opacity: 1,

            duration: 0.42,

            ease: "power2.out",
          },
          0.62
        );

        /*
         * ------------------------------------------------------------
         * FEATURE
         * ------------------------------------------------------------
         */

        tl.to(
          featureRef.current,
          {
            y: 0,
            opacity: 1,

            duration: 0.55,

            ease: "power2.out",
          },
          0.78
        );

        /*
         * ------------------------------------------------------------
         * SECONDARY IMAGE
         * ------------------------------------------------------------
         */

        tl.to(
          secondaryImageRef.current,
          {
            clipPath:
              "inset(0% 0% 0% 0%)",

            y: 0,
            opacity: 1,

            duration: 0.65,
          },
          0.98
        );

        /*
         * ------------------------------------------------------------
         * HOLD
         * ------------------------------------------------------------
         */

        tl.to(
          {},
          {
            duration: 0.85,
          }
        );

        /*
         * ------------------------------------------------------------
         * REFRESH
         * ------------------------------------------------------------
         */

        const refresh = () => {
          ScrollTrigger.refresh();
        };

        const frame =
          requestAnimationFrame(() => {
            requestAnimationFrame(refresh);
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

          titleSplit.revert();

          tl.scrollTrigger?.kill();
          tl.kill();
        };
      });

      /*
       * ============================================================
       * TABLET
       * ============================================================
       *
       * Normal document flow.
       *
       * One coordinated entrance timeline is used instead of
       * multiple independent triggers. This prevents elements from
       * appearing out of order after ScrollSmoother measurements.
       */

      mm.add(
        "(min-width: 769px) and (max-width: 1199px)",
        () => {
          if (
            !mainImageRef.current ||
            !mainImageInnerRef.current ||
            !eyebrowRef.current ||
            !titleRef.current ||
            !controlsRef.current ||
            !featureRef.current ||
            !secondaryImageRef.current
          ) {
            return;
          }

          gsap.set(
            mainImageRef.current,
            {
              clipPath:
                "inset(0% 0% 100% 0%)",
              y: 20,
              opacity: 0,
            }
          );

          gsap.set(
            mainImageInnerRef.current,
            {
              scale: 1.06,
              yPercent: 3,
            }
          );

          gsap.set(
            eyebrowRef.current,
            {
              y: 20,
              opacity: 0,
            }
          );

          gsap.set(
            titleRef.current,
            {
              y: 28,
              opacity: 0,
            }
          );

          gsap.set(
            controlsRef.current,
            {
              y: 22,
              opacity: 0,
            }
          );

          gsap.set(
            featureRef.current,
            {
              y: 24,
              opacity: 0,
            }
          );

          gsap.set(
            secondaryImageRef.current,
            {
              clipPath:
                "inset(100% 0% 0% 0%)",
              y: 24,
              opacity: 0,
            }
          );

          const tl =
            gsap.timeline({
              scrollTrigger: {
                trigger: section,

                start: "top 82%",

                toggleActions:
                  "play none none reverse",

                invalidateOnRefresh:
                  true,
              },
            });

          tl.to(
            mainImageRef.current,
            {
              clipPath:
                "inset(0% 0% 0% 0%)",

              y: 0,
              opacity: 1,

              duration: 0.8,

              ease: "power3.out",
            }
          );

          tl.to(
            mainImageInnerRef.current,
            {
              scale: 1,
              yPercent: 0,

              duration: 1,

              ease: "power2.out",
            },
            "<"
          );

          tl.to(
            eyebrowRef.current,
            {
              y: 0,
              opacity: 1,

              duration: 0.45,

              ease: "power3.out",
            },
            "-=0.5"
          );

          tl.to(
            titleRef.current,
            {
              y: 0,
              opacity: 1,

              duration: 0.65,

              ease: "power3.out",
            },
            "-=0.28"
          );

          tl.to(
            controlsRef.current,
            {
              y: 0,
              opacity: 1,

              duration: 0.45,

              ease: "power3.out",
            },
            "-=0.25"
          );

          tl.to(
            featureRef.current,
            {
              y: 0,
              opacity: 1,

              duration: 0.55,

              ease: "power3.out",
            },
            "-=0.15"
          );

          tl.to(
            secondaryImageRef.current,
            {
              clipPath:
                "inset(0% 0% 0% 0%)",

              y: 0,
              opacity: 1,

              duration: 0.65,

              ease: "power2.out",
            },
            "-=0.2"
          );

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

            tl.scrollTrigger?.kill();
            tl.kill();
          };
        }
      );

      /*
       * ============================================================
       * MOBILE
       * ============================================================
       *
       * IMPORTANT:
       *
       * Mobile is now a REAL normal-flow layout.
       *
       * The previous implementation gave every element its own
       * ScrollTrigger. Because the main image was visually clipped
       * while still occupying layout space, the page could show:
       *
       *   title
       *   controls
       *   feature
       *   huge blank area
       *   main image
       *
       * That is exactly the problem visible in the mobile screenshot.
       *
       * The new mobile implementation uses ONE entrance timeline.
       * The DOM order is respected:
       *
       *   main image
       *   eyebrow
       *   title
       *   controls
       *   feature
       *   secondary image
       *
       * ScrollSmoother handles the physical scroll.
       * This timeline only handles the visual entrance.
       */

      mm.add("(max-width: 768px)", () => {
        if (
          !mainImageRef.current ||
          !mainImageInnerRef.current ||
          !eyebrowRef.current ||
          !titleRef.current ||
          !controlsRef.current ||
          !featureRef.current ||
          !secondaryImageRef.current
        ) {
          return;
        }

        /*
         * ------------------------------------------------------------
         * MOBILE DESIGN
         * ------------------------------------------------------------
         *
         * Mobile uses ONE coordinated normal-flow entrance:
         *
         *   1. Eyebrow
         *   2. Title lines
         *   3. Controls
         *   4. Main image reveal
         *   5. Secondary image reveal
         *   6. Feature copy
         *
         * The CSS changes the mobile layout to a one-column grid and
         * uses display: contents for the content wrapper. This keeps
         * the existing JSX structure intact while allowing the main
         * image, secondary image and text to participate in one
         * visual sequence.
         *
         * There is intentionally NO mobile pin and NO scrub.
         * ScrollTrigger only starts the entrance when the section
         * approaches the viewport.
         */

        const titleSplit = SplitText.create(
          titleRef.current,
          {
            type: "lines",
            mask: "lines",
            linesClass: "platform-title-line",
          }
        );

        /*
         * ------------------------------------------------------------
         * INITIAL STATES
         * ------------------------------------------------------------
         */

        gsap.set(
          eyebrowRef.current,
          {
            y: 18,
            opacity: 0,
          }
        );

        gsap.set(
          titleSplit.lines,
          {
            yPercent: 105,
          }
        );

        gsap.set(
          controlsRef.current,
          {
            y: 18,
            opacity: 0,
          }
        );

        /*
         * Both images begin clipped. They stay in their normal-flow
         * grid rows, so their hidden state never creates an incorrect
         * absolute-positioned blank section.
         */

        gsap.set(
          mainImageRef.current,
          {
            clipPath:
              "inset(100% 0% 0% 0%)",
            y: 18,
            opacity: 0,
          }
        );

        gsap.set(
          mainImageInnerRef.current,
          {
            scale: 1.08,
            yPercent: 3,
          }
        );

        gsap.set(
          secondaryImageRef.current,
          {
            clipPath:
              "inset(100% 0% 0% 0%)",
            y: 18,
            opacity: 0,
          }
        );

        gsap.set(
          featureRef.current,
          {
            y: 22,
            opacity: 0,
          }
        );

        /*
         * ------------------------------------------------------------
         * ONE MOBILE ENTRANCE TIMELINE
         * ------------------------------------------------------------
         */

        const tl = gsap.timeline({
          paused: true,
          defaults: {
            overwrite: "auto",
          },
        });

        /*
         * 1. EYEBROW
         */

        tl.to(
          eyebrowRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.42,
            ease: "power3.out",
          }
        );

        /*
         * 2. TITLE — LINE BY LINE
         */

        tl.to(
          titleSplit.lines,
          {
            yPercent: 0,
            duration: 0.62,
            stagger: 0.09,
            ease: "power3.out",
          },
          "-=0.18"
        );

        /*
         * 3. CONTROLS
         */

        tl.to(
          controlsRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            ease: "power3.out",
          },
          "-=0.16"
        );

        /*
         * 4. MAIN IMAGE
         *
         * The image starts immediately after the text sequence.
         */

        tl.to(
          mainImageRef.current,
          {
            clipPath:
              "inset(0% 0% 0% 0%)",
            y: 0,
            opacity: 1,
            duration: 0.72,
            ease: "power3.out",
          },
          "+=0.08"
        );

        tl.to(
          mainImageInnerRef.current,
          {
            scale: 1,
            yPercent: 0,
            duration: 0.9,
            ease: "power2.out",
          },
          "<"
        );

        /*
         * 5. SECONDARY IMAGE
         *
         * It follows very closely so the two image reveals feel like
         * one combined image moment rather than separate triggers.
         */

        tl.to(
          secondaryImageRef.current,
          {
            clipPath:
              "inset(0% 0% 0% 0%)",
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.54"
        );

        /*
         * 6. FEATURE
         */

        tl.to(
          featureRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.52,
            ease: "power3.out",
          },
          "-=0.18"
        );

        /*
         * ------------------------------------------------------------
         * SCROLL TRIGGER
         * ------------------------------------------------------------
         *
         * One trigger only. No pinning and no scrub on mobile.
         * Starting at 84% gives enough lead time for the text to
         * animate before the image section reaches the user's focus.
         */

        const trigger = ScrollTrigger.create({
          trigger: section,
          start: "top 84%",
          toggleActions: "play none none reverse",
          onEnter: () => {
            tl.play();
          },
          onLeaveBack: () => {
            tl.reverse();
          },
          invalidateOnRefresh: true,
        });

        /*
         * ------------------------------------------------------------
         * IMAGE LOAD REFRESH
         * ------------------------------------------------------------
         */

        const images = Array.from(
          section.querySelectorAll<HTMLImageElement>("img")
        );

        const refresh = () => {
          ScrollTrigger.refresh();
        };

        const imageHandlers =
          new Map<HTMLImageElement, () => void>();

        images.forEach((image) => {
          if (!image.complete) {
            const handler = () => {
              refresh();
            };

            imageHandlers.set(image, handler);

            image.addEventListener(
              "load",
              handler,
              { once: true }
            );
          }
        });

        const frame = requestAnimationFrame(() => {
          requestAnimationFrame(refresh);
        });

        window.addEventListener("load", refresh);

        /*
         * ------------------------------------------------------------
         * RESIZE / ORIENTATION
         * ------------------------------------------------------------
         */

        let resizeTimer:
          ReturnType<typeof setTimeout> | null = null;

        const handleResize = () => {
          if (resizeTimer) {
            clearTimeout(resizeTimer);
          }

          resizeTimer = setTimeout(() => {
            ScrollTrigger.refresh();
          }, 120);
        };

        window.addEventListener("resize", handleResize);

        /*
         * ------------------------------------------------------------
         * CLEANUP
         * ------------------------------------------------------------
         */

        return () => {
          cancelAnimationFrame(frame);

          window.removeEventListener(
            "load",
            refresh
          );

          window.removeEventListener(
            "resize",
            handleResize
          );

          if (resizeTimer) {
            clearTimeout(resizeTimer);
          }

          imageHandlers.forEach(
            (handler, image) => {
              image.removeEventListener(
                "load",
                handler
              );
            }
          );

          trigger.kill();
          tl.kill();
          titleSplit.revert();
        };
      });

      /*
       * ============================================================
       * MATCHMEDIA CLEANUP
       * ============================================================
       */

      return () => {
        mm.revert();
      };
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
    >
      <div className={styles.container}>

        {/* ========================================================
            MAIN IMAGE
            ======================================================== */}

        <div
          ref={mainImageRef}
          className={styles.mainImage}
        >
          <img
            ref={mainImageInnerRef}
            src={
              platformRevealData.primaryImage
            }
            alt="Infrastructure landscape"
          />
        </div>

        {/* ========================================================
            RIGHT / CONTENT AREA
            ======================================================== */}

        <div className={styles.content}>

          {/* ======================================================
              EYEBROW
              ====================================================== */}

          <div
            ref={eyebrowRef}
            className={styles.eyebrow}
          >
            {platformRevealData.eyebrow}
          </div>

          {/* ======================================================
              TITLE
              ====================================================== */}

          <h2
            ref={titleRef}
            className={styles.title}
          >
            {platformRevealData.title}
          </h2>

          {/* ======================================================
              CONTROLS
              ====================================================== */}

          <div
            ref={controlsRef}
            className={styles.controls}
          >
            <button
              type="button"
              aria-label="Grid view"
            >
              <span>▦</span>
            </button>

            <button
              type="button"
              aria-label="View"
            >
              <span>◉</span>
            </button>

            <button
              type="button"
              aria-label="Expand"
            >
              <span>↗</span>
            </button>
          </div>

          {/* ======================================================
              FEATURE
              ====================================================== */}

          <div
            ref={featureRef}
            className={styles.feature}
          >
            <h3>
              {
                platformRevealData.featureTitle
              }
            </h3>

            <p>
              {
                platformRevealData.featureDescription
              }
            </p>

            <button
              type="button"
              className={styles.learnMore}
            >
              <span>
                {
                  platformRevealData.buttonText
                }
              </span>

              <span
                className={styles.arrow}
              >
                ↗
              </span>
            </button>
          </div>

          {/* ======================================================
              SECONDARY IMAGE
              ====================================================== */}

          <div
            ref={secondaryImageRef}
            className={
              styles.secondaryImage
            }
          >
            <img
              src={
                platformRevealData.secondaryImage
              }
              alt="Green infrastructure"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
