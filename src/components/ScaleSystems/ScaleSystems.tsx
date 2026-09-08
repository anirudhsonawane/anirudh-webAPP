"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import ScaleSystemsCard from "./ScaleSystemsCard";
import { scaleSystemsData } from "./scaleSystemsData";

import styles from "./ScaleSystems.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function ScaleSystems() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const introRef = useRef<HTMLParagraphElement | null>(null);
  const panelsRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const panelsStage = panelsRef.current;

    if (!section || !stage || !panelsStage) {
      return;
    }

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      /*
       * ==========================================================
       * DESKTOP
       * ==========================================================
       *
       * The desktop composition remains the editorial multi-panel
       * experience. Every visual element is controlled by one
       * master timeline.
       */

      mm.add("(min-width: 901px)", () => {
        const heading = headingRef.current;
        const intro = introRef.current;

        if (!heading || !intro) {
          return;
        }

        const panels = Array.from(
          panelsStage.querySelectorAll<HTMLElement>(
            `.${styles.panel}`
          )
        );

        const giantNumbers = panels.map((panel) =>
          panel.querySelector<HTMLElement>(
            `.${styles.giantNumber}`
          )
        );

        const panelCards = panels.map((panel) =>
          panel.querySelector<HTMLElement>(
            `.${styles.card}`
          )
        );

        const cardImages = panels.map((panel) =>
          panel.querySelector<HTMLElement>(
            `.${styles.cardImage}`
          )
        );

        const panelLabels = panels.map((panel) =>
          panel.querySelector<HTMLElement>(
            `.${styles.panelLabel}`
          )
        );

        if (
          panels.length !== scaleSystemsData.length ||
          giantNumbers.some((item) => !item) ||
          panelCards.some((item) => !item) ||
          cardImages.some((item) => !item) ||
          panelLabels.some((item) => !item)
        ) {
          return;
        }

        const safeNumbers = giantNumbers as HTMLElement[];
        const safeCards = panelCards as HTMLElement[];
        const safeImages = cardImages as HTMLElement[];
        const safeLabels = panelLabels as HTMLElement[];

        gsap.set([heading, intro], {
          autoAlpha: 0,
          y: 30,
        });

        gsap.set(panels, {
          flexBasis: "19.3333%",
          autoAlpha: 0,
          y: 42,
        });

        gsap.set(panels[0], {
          flexBasis: "42%",
          autoAlpha: 1,
          y: 0,
        });

        gsap.set(safeNumbers, {
          scale: 1.04,
          yPercent: 4,
          opacity: 0.2,
        });

        gsap.set(safeNumbers[0], {
          scale: 1,
          yPercent: 0,
          opacity: 1,
        });

        gsap.set(safeCards, {
          scale: 0.985,
        });

        gsap.set(safeCards[0], {
          scale: 1,
        });

        gsap.set(safeImages, {
          scale: 1.1,
        });

        gsap.set(safeImages[0], {
          scale: 1,
        });

        gsap.set(safeLabels, {
          autoAlpha: 0.35,
          y: 14,
        });

        gsap.set(safeLabels[0], {
          autoAlpha: 1,
          y: 0,
        });

        const tl = gsap.timeline({
          paused: true,
        });

        tl.to(
          heading,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          0
        );

        tl.to(
          intro,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.65,
            ease: "power3.out",
          },
          0.1
        );

        tl.to(
          panels,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.04,
            ease: "power3.out",
          },
          0.18
        );

        const activeBasis = 42;
        const inactiveBasis =
          58 / Math.max(1, panels.length - 1);

        panels.forEach((panel, index) => {
          if (index === 0) {
            return;
          }

          const start =
            1 + (index - 1) * 1.15;

          panels.forEach((target, targetIndex) => {
            const targetBasis =
              targetIndex === index
                ? activeBasis
                : inactiveBasis;

            tl.to(
              target,
              {
                flexBasis: `${targetBasis}%`,
                duration: 0.95,
                ease: "power3.inOut",
              },
              start
            );
          });

          safeNumbers.forEach((number, numberIndex) => {
            tl.to(
              number,
              {
                scale:
                  numberIndex === index
                    ? 1
                    : 1.04,
                yPercent:
                  numberIndex === index
                    ? 0
                    : 4,
                opacity:
                  numberIndex === index
                    ? 1
                    : 0.2,
                duration: 0.72,
                ease: "power3.out",
              },
              start + 0.08
            );
          });

          safeCards.forEach((card, cardIndex) => {
            tl.to(
              card,
              {
                scale:
                  cardIndex === index
                    ? 1
                    : 0.985,
                duration: 0.72,
                ease: "power3.out",
              },
              start + 0.04
            );
          });

          safeImages.forEach((image, imageIndex) => {
            tl.to(
              image,
              {
                scale:
                  imageIndex === index
                    ? 1
                    : 1.1,
                duration: 0.92,
                ease: "power2.out",
              },
              start
            );
          });

          safeLabels.forEach((label, labelIndex) => {
            tl.to(
              label,
              {
                autoAlpha:
                  labelIndex === index
                    ? 1
                    : 0.35,
                y:
                  labelIndex === index
                    ? 0
                    : 14,
                duration: 0.55,
                ease: "power3.out",
              },
              start + 0.2
            );
          });
        });

        tl.to(
          {},
          {
            duration: 0.65,
          },
          1 +
            Math.max(
              0,
              panels.length - 2
            ) *
              1.15 +
            1.15
        );

        const totalScroll =
          Math.max(
            1,
            scaleSystemsData.length - 1
          ) *
          window.innerHeight *
          0.9;

        const trigger = ScrollTrigger.create({
          id: "scale-systems-editorial",
          trigger: section,
          pin: stage,
          pinSpacing: true,
          start: "top top",
          end: `+=${Math.round(totalScroll)}`,
          animation: tl,
          scrub: 0.55,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          fastScrollEnd: false,
        });

        const refresh = () => {
          ScrollTrigger.refresh();
        };

        const frame = requestAnimationFrame(() => {
          requestAnimationFrame(refresh);
        });

        const observer = new ResizeObserver(refresh);
        observer.observe(section);

        return () => {
          cancelAnimationFrame(frame);
          observer.disconnect();
          trigger.kill();
          tl.kill();
        };
      });

      /*
       * ==========================================================
       * MOBILE — IMMERSIVE CHAPTER SCROLL
       * ==========================================================
       *
       * Mobile intentionally uses a different composition.
       *
       * The section becomes a single viewport-sized storytelling
       * stage. The user scrolls through four chapters while the
       * stage stays pinned.
       *
       * Each chapter is a full-screen editorial card:
       *
       *   giant number
       *   chapter label
       *   image
       *   title
       *   description
       *
       * One GSAP timeline controls every chapter. There is no React
       * active state, no individual ScrollTrigger per card and no
       * competing animation system.
       *
       * Scroll direction automatically reverses the entire timeline.
       */

      mm.add("(max-width: 900px)", () => {
        const heading = headingRef.current;
        const intro = introRef.current;

        if (!heading || !intro) {
          return;
        }

        const panels = Array.from(
          panelsStage.querySelectorAll<HTMLElement>(
            `.${styles.panel}`
          )
        );

        if (
          panels.length !== scaleSystemsData.length ||
          panels.length === 0
        ) {
          return;
        }

        const panelData = panels.map((panel) => ({
          panel,
          number:
            panel.querySelector<HTMLElement>(
              `.${styles.giantNumber}`
            ),
          label:
            panel.querySelector<HTMLElement>(
              `.${styles.panelLabel}`
            ),
          index:
            panel.querySelector<HTMLElement>(
              `.${styles.panelIndex}`
            ),
          card:
            panel.querySelector<HTMLElement>(
              `.${styles.card}`
            ),
          image:
            panel.querySelector<HTMLElement>(
              `.${styles.cardImage}`
            ),
          content:
            panel.querySelector<HTMLElement>(
              `.${styles.cardContent}`
            ),
        }));

        if (
          panelData.some(
            (item) =>
              !item.number ||
              !item.label ||
              !item.index ||
              !item.card ||
              !item.image ||
              !item.content
          )
        ) {
          return;
        }

        const safeData = panelData as Array<{
          panel: HTMLElement;
          number: HTMLElement;
          label: HTMLElement;
          index: HTMLElement;
          card: HTMLElement;
          image: HTMLElement;
          content: HTMLElement;
        }>;

        /*
         * ----------------------------------------------------------
         * INITIAL STATES
         * ----------------------------------------------------------
         */

        gsap.set(
          [heading, intro],
          {
            autoAlpha: 0,
            y: 24,
          }
        );

        gsap.set(
          panels,
          {
            position: "absolute",
            inset: 0,
            autoAlpha: 0,
            yPercent: 12,
            scale: 0.965,
            zIndex: 1,
          }
        );

        safeData.forEach((item, index) => {
          gsap.set(item.number, {
            autoAlpha:
              index === 0 ? 1 : 0,
            yPercent:
              index === 0 ? 0 : 12,
            scale:
              index === 0 ? 1 : 1.08,
          });

          gsap.set(item.label, {
            autoAlpha:
              index === 0 ? 1 : 0,
            y: index === 0 ? 0 : 12,
          });

          gsap.set(item.index, {
            autoAlpha:
              index === 0 ? 0.65 : 0.28,
          });

          gsap.set(item.card, {
            yPercent:
              index === 0 ? 0 : 105,
            scale:
              index === 0 ? 1 : 0.985,
          });

          gsap.set(item.image, {
            scale:
              index === 0 ? 1 : 1.08,
          });

          gsap.set(item.content, {
            autoAlpha:
              index === 0 ? 1 : 0,
            y:
              index === 0 ? 0 : 20,
          });
        });

        gsap.set(panels[0], {
          autoAlpha: 1,
          yPercent: 0,
          scale: 1,
          zIndex: 5,
        });

        /*
         * ----------------------------------------------------------
         * MOBILE MASTER TIMELINE
         * ----------------------------------------------------------
         *
         * Every chapter transition has the same structure:
         *
         *   1. Current chapter lifts/fades.
         *   2. Giant number follows that movement.
         *   3. Next image rises from below.
         *   4. Next image settles with a subtle scale.
         *   5. Next number and label appear.
         *   6. Next card copy settles.
         *
         * The number and image therefore never have separate
         * scroll triggers. They are literally the same timeline.
         */

        const tl = gsap.timeline({
          paused: true,
          defaults: {
            ease: "none",
          },
        });

        tl.to(
          heading,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.55,
            ease: "power3.out",
          },
          0
        );

        tl.to(
          intro,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            ease: "power3.out",
          },
          0.08
        );

        /*
         * Give the first chapter a little time to breathe.
         */
        tl.to({}, { duration: 0.75 });

        safeData.forEach((current, index) => {
          if (index === safeData.length - 1) {
            return;
          }

          const next = safeData[index + 1];
          const start =
            tl.duration() + 0.05;

          /*
           * Bring the next panel above the current one.
           */
          tl.set(
            next.panel,
            {
              autoAlpha: 1,
              zIndex: 6,
            },
            start
          );

          /*
           * Current chapter exits upward.
           */
          tl.to(
            current.panel,
            {
              yPercent: -9,
              scale: 0.975,
              autoAlpha: 0.42,
              duration: 0.78,
              ease: "power3.inOut",
            },
            start
          );

          tl.to(
            current.number,
            {
              yPercent: -15,
              scale: 0.93,
              autoAlpha: 0.18,
              duration: 0.72,
              ease: "power3.inOut",
            },
            start
          );

          tl.to(
            current.label,
            {
              y: -12,
              autoAlpha: 0.18,
              duration: 0.55,
              ease: "power3.inOut",
            },
            start
          );

          tl.to(
            current.content,
            {
              y: -18,
              autoAlpha: 0,
              duration: 0.58,
              ease: "power3.inOut",
            },
            start
          );

          /*
           * Next panel starts slightly below the viewport.
           */
          tl.fromTo(
            next.panel,
            {
              yPercent: 10,
              scale: 0.965,
            },
            {
              yPercent: 0,
              scale: 1,
              duration: 0.9,
              ease: "power4.out",
            },
            start
          );

          /*
           * The IMAGE is the main movement.
           * It rises from the bottom like a physical surface.
           */
          tl.to(
            next.card,
            {
              yPercent: 0,
              scale: 1,
              duration: 0.92,
              ease: "power4.out",
            },
            start
          );

          tl.to(
            next.image,
            {
              scale: 1,
              duration: 1.05,
              ease: "power2.out",
            },
            start + 0.02
          );

          /*
           * Giant number appears with the image rather than
           * waiting for the card transition to finish.
           */
          tl.to(
            next.number,
            {
              yPercent: 0,
              scale: 1,
              autoAlpha: 1,
              duration: 0.68,
              ease: "power3.out",
            },
            start + 0.13
          );

          tl.to(
            next.label,
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.55,
              ease: "power3.out",
            },
            start + 0.22
          );

          tl.to(
            next.index,
            {
              autoAlpha: 0.65,
              duration: 0.4,
              ease: "power2.out",
            },
            start + 0.24
          );

          tl.to(
            next.content,
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.62,
              ease: "power3.out",
            },
            start + 0.29
          );

          /*
           * A short editorial hold after every chapter.
           */
          tl.to(
            {},
            {
              duration: 0.7,
            }
          );

          /*
           * Keep the previous panel underneath the next one.
           */
          tl.set(
            current.panel,
            {
              zIndex: 1,
            }
          );
        });

        /*
         * Final breathing room before the pin releases.
         */
        tl.to(
          {},
          {
            duration: 0.8,
          }
        );

        /*
         * ----------------------------------------------------------
         * MOBILE SCROLL TRIGGER
         * ----------------------------------------------------------
         *
         * The stage itself is pinned.
         *
         * One pixel of scroll corresponds to one point in the
         * master timeline, so all visual layers remain synchronized.
         */
        const trigger = ScrollTrigger.create({
          id: "scale-systems-mobile-story",
          trigger: section,
          pin: stage,
          pinSpacing: true,
          start: "top top",
          end: () =>
            `+=${Math.round(
              window.innerHeight *
                (3.45)
            )}`,
          animation: tl,
          scrub: 0.45,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          fastScrollEnd: false,
          refreshPriority: 2,
        });

        const refresh = () => {
          ScrollTrigger.refresh();
        };

        const frame = requestAnimationFrame(() => {
          requestAnimationFrame(refresh);
        });

        const observer = new ResizeObserver(refresh);
        observer.observe(section);

        return () => {
          cancelAnimationFrame(frame);
          observer.disconnect();
          trigger.kill();
          tl.kill();
        };
      });

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
      aria-label="Designed to Work at Scale"
    >
      <div
        ref={stageRef}
        className={styles.stage}
      >
        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.headerCopy}>
              <span className={styles.eyebrow}>
                How It Works
              </span>

              <h2
                ref={headingRef}
                className={styles.heading}
              >
                Designed to
                <br />
                Work at Scale
              </h2>
            </div>

            <p
              ref={introRef}
              className={styles.intro}
            >
              A structured approach to managing complex infrastructure
              systems—from connection to long-term operation.
            </p>
          </div>

          <div
            ref={panelsRef}
            className={styles.panels}
          >
            {scaleSystemsData.map((item, index) => (
              <article
                key={item.id}
                className={styles.panel}
              >
                <div className={styles.panelTop}>
                  <span className={styles.panelLabel}>
                    {item.label}
                  </span>

                  <span className={styles.panelIndex}>
                    {String(item.id).padStart(2, "0")}
                  </span>
                </div>

                <div className={styles.numberWrap}>
                  <span className={styles.giantNumber}>
                    {String(item.id).padStart(2, "0")}
                  </span>
                </div>

                <div className={styles.panelCard}>
                  <ScaleSystemsCard
                    item={item}
                    priority={index === 0}
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
