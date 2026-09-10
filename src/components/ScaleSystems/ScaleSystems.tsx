"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import ScaleSystemsCard from "./ScaleSystemsCard";
import { scaleSystemsData } from "./scaleSystemsData";

import styles from "./ScaleSystems.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function ScaleSystems() {
  const sectionRef =
    useRef<HTMLElement | null>(null);

  const stageRef =
    useRef<HTMLDivElement | null>(null);

  const headingRef =
    useRef<HTMLHeadingElement | null>(null);

  const introRef =
    useRef<HTMLParagraphElement | null>(null);

  const panelsRef =
    useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const section =
      sectionRef.current;

    const stage =
      stageRef.current;

    const panelsStage =
      panelsRef.current;

    if (
      !section ||
      !stage ||
      !panelsStage
    ) {
      return;
    }

    const ctx =
      gsap.context(() => {
        const mm =
          gsap.matchMedia();

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

        return () => {
          trigger.kill();
          tl.kill();
        };
      });

      /*
       * ----------------------------------------------------------
       * MOBILE
       * ----------------------------------------------------------
       *
       * Mobile is a normal document-flow story.
       *
       * Every chapter is a real block in the document. There is
       * deliberately no mobile pin, sticky stage, fixed track or
       * absolute panel stack.
       */
      mm.add("(max-width: 900px)", () => {
        const heading = headingRef.current;
        const intro = introRef.current;

        if (!heading || !intro) {
          return;
        }

        const panels =
          Array.from(
            panelsStage.querySelectorAll<HTMLElement>(
              `.${styles.panel}`
            )
          );

        if (!panels.length) {
          return;
        }

        /*
         * MOBILE:
         *
         * No ScrollTrigger is created here.
         * Native document scrolling is completely independent from
         * GSAP. IntersectionObserver starts short, finite animations
         * only after a panel enters the viewport.
         */
        gsap.set([heading, intro], {
          autoAlpha: 0.55,
          y: 16,
        });

        panels.forEach((panel, index) => {
          const number =
            panel.querySelector<HTMLElement>(
              `.${styles.giantNumber}`
            );

          const label =
            panel.querySelector<HTMLElement>(
              `.${styles.panelLabel}`
            );

          const panelIndex =
            panel.querySelector<HTMLElement>(
              `.${styles.panelIndex}`
            );

          const card =
            panel.querySelector<HTMLElement>(
              `.${styles.card}`
            );

          const content =
            panel.querySelector<HTMLElement>(
              `.${styles.cardContent}`
            );

          const items = [
            number,
            label,
            panelIndex,
            card,
            content,
          ].filter(Boolean) as HTMLElement[];

          gsap.set(panel, {
            autoAlpha: 1,
            clearProps:
              "opacity,visibility,transform",
          });

          if (index === 0) {
            gsap.set(items, {
              autoAlpha: 1,
              x: 0,
              y: 0,
              scale: 1,
            });
          } else {
            const direction =
              index % 2 === 0 ? -1 : 1;

            gsap.set(items, {
              autoAlpha: 0,
              x: 24 * direction,
              y: 18,
              scale: 0.985,
            });
          }
        });

        const revealPanel = (
          panel: HTMLElement,
          index: number
        ) => {
          const number =
            panel.querySelector<HTMLElement>(
              `.${styles.giantNumber}`
            );

          const label =
            panel.querySelector<HTMLElement>(
              `.${styles.panelLabel}`
            );

          const panelIndex =
            panel.querySelector<HTMLElement>(
              `.${styles.panelIndex}`
            );

          const card =
            panel.querySelector<HTMLElement>(
              `.${styles.card}`
            );

          const content =
            panel.querySelector<HTMLElement>(
              `.${styles.cardContent}`
            );

          const items = [
            number,
            label,
            panelIndex,
            card,
            content,
          ].filter(Boolean) as HTMLElement[];

          gsap.killTweensOf(items);

          gsap.to(items, {
            autoAlpha: 1,
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.48,
            stagger: 0.04,
            ease: "power3.out",
            overwrite: true,
          });
        };

        const resetPanel = (
          panel: HTMLElement,
          index: number
        ) => {
          if (index === 0) {
            return;
          }

          const number =
            panel.querySelector<HTMLElement>(
              `.${styles.giantNumber}`
            );

          const label =
            panel.querySelector<HTMLElement>(
              `.${styles.panelLabel}`
            );

          const panelIndex =
            panel.querySelector<HTMLElement>(
              `.${styles.panelIndex}`
            );

          const card =
            panel.querySelector<HTMLElement>(
              `.${styles.card}`
            );

          const content =
            panel.querySelector<HTMLElement>(
              `.${styles.cardContent}`
            );

          const items = [
            number,
            label,
            panelIndex,
            card,
            content,
          ].filter(Boolean) as HTMLElement[];

          const direction =
            index % 2 === 0 ? -1 : 1;

          gsap.killTweensOf(items);

          gsap.to(items, {
            autoAlpha: 0,
            x: 24 * direction,
            y: 18,
            scale: 0.985,
            duration: 0.25,
            ease: "power2.in",
            overwrite: true,
          });
        };

        const panelObserver =
          new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                const panel =
                  entry.target as HTMLElement;

                const index =
                  panels.indexOf(panel);

                if (entry.isIntersecting) {
                  revealPanel(panel, index);
                } else if (
                  entry.boundingClientRect.top > 0
                ) {
                  resetPanel(panel, index);
                }
              });
            },
            {
              root: null,
              rootMargin: "-8% 0px -12% 0px",
              threshold: 0.12,
            }
          );

        panels.forEach((panel) => {
          panelObserver.observe(panel);
        });

        const headerObserver =
          new IntersectionObserver(
            (entries) => {
              if (!entries[0]?.isIntersecting) {
                return;
              }

              gsap.to([heading, intro], {
                autoAlpha: 1,
                x: 0,
                y: 0,
                duration: 0.5,
                stagger: 0.06,
                ease: "power3.out",
                overwrite: true,
              });

              headerObserver.disconnect();
            },
            {
              root: null,
              rootMargin: "0px 0px -15% 0px",
              threshold: 0.01,
            }
          );

        headerObserver.observe(section);

        return () => {
          panelObserver.disconnect();
          headerObserver.disconnect();
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
