"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  aboutContent,
  aboutPoints,
} from "./infrastructureData";

gsap.registerPlugin(ScrollTrigger);

export default function InfrastructureSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const pointsRef = useRef<HTMLDivElement>(null);
  const scenesRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;

    if (!section || !stage) return;

    const mm = gsap.matchMedia();


  /* ========================================================
     DESKTOP
     ======================================================== */

  mm.add("(min-width: 901px)", () => {
    const label = labelRef.current;
    const points = pointsRef.current;
    const scenes = scenesRef.current;

    if (!label || !points || !scenes || !stage) return;

    const pointItems = Array.from(


      points.querySelectorAll<HTMLElement>(


        "[data-about-point]"


      )


    );

    const sceneItems = Array.from(


      scenes.querySelectorAll<HTMLElement>(


        "[data-about-scene]"


      )


    );

    if (
      pointItems.length !== 3 ||
      sceneItems.length !== 3
    ) {
      return;
    }

    /* ======================================================
       INITIAL STATE
       ====================================================== */

    /*
     * The About stage must not simply appear when the Hero ends.
     * It enters from below while the user is still approaching
     * the section. The stage is then fully settled when the main
     * 01 → 02 → 03 pinned timeline takes over.
     */
    gsap.set(stage, {
      autoAlpha: 0.01,
      y: 42,
      scale: 0.985,
      transformOrigin: "center center",
    });

    gsap.set(label, {
      autoAlpha: 0,
      y: 20,
    });

    gsap.set(pointItems, {
      autoAlpha: 0.28,
      y: 0,
    });

    gsap.set(pointItems[0], {
      autoAlpha: 1,
    });

    gsap.set(sceneItems, {
      autoAlpha: 0,
      y: 70,
      scale: 0.985,
    });

    gsap.set(sceneItems[0], {
      autoAlpha: 1,
      y: 0,
      scale: 1,
    });

    /* ======================================================
       MASTER TIMELINE — NUMBER-SYNCED PARALLAX
       ====================================================== */

    const sceneParts = sceneItems.map((scene) => ({
      copy: scene.querySelector<HTMLElement>(".about-copy"),
      heading: scene.querySelector<HTMLElement>(".about-heading"),
      button: scene.querySelector<HTMLElement>(".about-button"),
      leftImage: scene.querySelector<HTMLElement>(".about-image-left"),
      side: scene.querySelector<HTMLElement>(".about-side"),
      sideLabel: scene.querySelector<HTMLElement>(".about-side-label"),
      rightImage: scene.querySelector<HTMLElement>(".about-image-right"),
    }));

    /*
     * All three scenes share one canvas. The 01 / 02 / 03 numbers
     * are driven by this exact same timeline, so the active number
     * changes at the visual midpoint of its corresponding transition.
     */
    gsap.set(sceneItems, {
      autoAlpha: 0,
      x: 0,
      y: 0,
      scale: 1,
    });

    gsap.set(sceneItems[0], {
      autoAlpha: 1,
    });

    gsap.set(pointItems, {
      autoAlpha: 0.28,
      scale: 1,
    });

    gsap.set(pointItems[0], {
      autoAlpha: 1,
    });

    const tl = gsap.timeline({
      defaults: {
        ease: "none",
      },
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${Math.round(window.innerHeight * 3.7)}`,
        pin: true,
        pinSpacing: true,
        scrub: 0.7,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        fastScrollEnd: false,
        refreshPriority: 10,
      },
    });

    /* HERO → ABOUT */

    tl.to(
      stage,
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
      },
      0
    );

    tl.to(
      label,
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.42,
        ease: "power3.out",
      },
      0.05
    );

    tl.to(
      pointItems,
      {
        autoAlpha: 0.28,
        duration: 0.35,
        stagger: 0.03,
      },
      0.08
    );

    tl.to(
      pointItems[0],
      {
        autoAlpha: 1,
        duration: 0.35,
      },
      0.12
    );

    /* 01 HOLD */
    tl.to({}, { duration: 0.9 });

    /*
     * Each layer moves by a different amount:
     *
     *   central copy  = 28px
     *   side details   = 48px
     *   imagery        = 68px
     *
     * This gives the scene a restrained depth/parallax effect.
     */
    const transitionScene = (
      currentIndex: number,
      nextIndex: number
    ) => {
      const current = sceneItems[currentIndex];
      const next = sceneItems[nextIndex];

      const currentParts = sceneParts[currentIndex];
      const nextParts = sceneParts[nextIndex];

      const currentCopy = [
        currentParts.copy,
        currentParts.heading,
        currentParts.button,
      ].filter(Boolean) as HTMLElement[];

      const currentImages = [
        currentParts.leftImage,
        currentParts.rightImage,
      ].filter(Boolean) as HTMLElement[];

      const currentSide = [
        currentParts.side,
        currentParts.sideLabel,
      ].filter(Boolean) as HTMLElement[];

      const nextCopy = [
        nextParts.copy,
        nextParts.heading,
        nextParts.button,
      ].filter(Boolean) as HTMLElement[];

      const nextImages = [
        nextParts.leftImage,
        nextParts.rightImage,
      ].filter(Boolean) as HTMLElement[];

      const nextSide = [
        nextParts.side,
        nextParts.sideLabel,
      ].filter(Boolean) as HTMLElement[];

      /*
       * Incoming scene is already underneath the outgoing scene.
       * This prevents a blank frame during the transition.
       */
      gsap.set(next, {
        autoAlpha: 1,
        x: 38,
        scale: 1.015,
      });

      gsap.set(nextCopy, {
        autoAlpha: 0,
        x: 28,
        y: 6,
      });

      gsap.set(nextImages, {
        autoAlpha: 0,
        x: 62,
        scale: 0.965,
      });

      gsap.set(nextSide, {
        autoAlpha: 0,
        x: 46,
      });

      /* OUTGOING — layered parallax */

      tl.to(
        current,
        {
          x: -32,
          scale: 0.99,
          duration: 0.9,
          ease: "power2.inOut",
        }
      );

      tl.to(
        currentCopy,
        {
          autoAlpha: 0,
          x: -28,
          duration: 0.72,
          stagger: 0.025,
          ease: "power2.inOut",
        },
        "<"
      );

      tl.to(
        currentImages,
        {
          autoAlpha: 0,
          x: -68,
          scale: 0.94,
          duration: 0.9,
          stagger: 0.035,
          ease: "power2.inOut",
        },
        "<"
      );

      tl.to(
        currentSide,
        {
          autoAlpha: 0,
          x: -48,
          duration: 0.78,
          stagger: 0.025,
          ease: "power2.inOut",
        },
        "<"
      );

      /* INCOMING — imagery first, copy last */

      tl.to(
        next,
        {
          x: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
        },
        "<0.12"
      );

      tl.to(
        nextImages,
        {
          autoAlpha: 1,
          x: 0,
          scale: 1,
          duration: 0.92,
          stagger: 0.035,
          ease: "power2.out",
        },
        "<0.02"
      );

      tl.to(
        nextSide,
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.78,
          stagger: 0.025,
          ease: "power2.out",
        },
        "<0.07"
      );

      tl.to(
        nextCopy,
        {
          autoAlpha: 1,
          x: 0,
          y: 0,
          duration: 0.72,
          stagger: 0.035,
          ease: "power3.out",
        },
        "<0.08"
      );

      /*
       * NUMBER SYNC
       *
       * This is deliberately inside the transition timeline.
       * Therefore 01→02 and 02→03 are tied directly to the visual
       * transition rather than running as independent triggers.
       */
      tl.to(
        pointItems[currentIndex],
        {
          autoAlpha: 0.28,
          scale: 0.98,
          duration: 0.34,
          ease: "power2.inOut",
        },
        "<0.18"
      );

      tl.to(
        pointItems[nextIndex],
        {
          autoAlpha: 1,
          scale: 1,
          duration: 0.42,
          ease: "power3.out",
        },
        "<0.04"
      );

      tl.to({}, { duration: 0.18 });

      /*
       * Do not leave transform values accumulating between scenes.
       */
      tl.set(
        [next, ...nextCopy, ...nextImages, ...nextSide],
        {
          clearProps: "x,y,scale",
        }
      );
    };

    /* 01 → 02 */
    transitionScene(0, 1);

    /* 02 HOLD */
    tl.to({}, { duration: 0.82 });

    /* 02 → 03 */
    transitionScene(1, 2);

    /* 03 HOLD */
    tl.to({}, { duration: 0.92 });

    /*
     * No exit animation. The About composition remains intact until
     * the pin naturally releases, avoiding a white/blank handoff.
     */
    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };

  });

  mm.add("(max-width: 900px)", () => {
    const label = labelRef.current;
    const points = pointsRef.current;
    const scenes = scenesRef.current;

    if (!label || !points || !scenes) {
      return;
    }

    const pointItems = Array.from(
      points.querySelectorAll<HTMLElement>(
        "[data-about-point]"
      )
    );

    const sceneItems = Array.from(
      scenes.querySelectorAll<HTMLElement>(
        "[data-about-scene]"
      )
    );

    if (
      pointItems.length !== sceneItems.length ||
      sceneItems.length === 0
    ) {
      return;
    }

    const sceneParts = sceneItems.map((scene) => ({
      scene,
      copy: scene.querySelector<HTMLElement>(
        ".about-copy"
      ),
      heading: scene.querySelector<HTMLElement>(
        ".about-heading"
      ),
      button: scene.querySelector<HTMLElement>(
        ".about-button"
      ),
      image: scene.querySelector<HTMLElement>(
        ".about-image-left"
      ),
      sideLabel: scene.querySelector<HTMLElement>(
        ".about-side-label"
      ),
    }));

    /*
     * ==========================================================
     * MOBILE ABOUT STORY
     * ==========================================================
     *
     * The About stage is pinned only on mobile.
     *
     * The 01 / 02 / 03 indicator stays at the top of the stage
     * while the content below it changes with the user's scroll.
     *
     * The indicator and scene transitions are controlled by the
     * SAME master timeline, keeping them perfectly synchronized.
     *
     * The secondary image is not part of the mobile story.
     */

    gsap.set(label, {
      autoAlpha: 0,
      y: 12,
    });

    gsap.set(pointItems, {
      autoAlpha: 0.3,
      y: 0,
      scale: 1,
      transformOrigin: "center left",
    });

    gsap.set(pointItems[0], {
      autoAlpha: 1,
      scale: 1,
    });

    gsap.set(sceneItems, {
      autoAlpha: 0,
      x: 0,
      y: 0,
      scale: 1,
      zIndex: 1,
    });

    gsap.set(sceneItems[0], {
      autoAlpha: 1,
      zIndex: 3,
    });

    sceneParts.forEach((parts, index) => {
      const copyParts = [
        parts.copy,
        parts.heading,
        parts.button,
      ].filter(Boolean) as HTMLElement[];

      const imageParts = [
        parts.image,
      ].filter(Boolean) as HTMLElement[];

      const sideParts = [
        parts.sideLabel,
      ].filter(Boolean) as HTMLElement[];

      if (index === 0) {
        gsap.set(copyParts, {
          autoAlpha: 1,
          x: 0,
          y: 0,
        });

        gsap.set(imageParts, {
          autoAlpha: 1,
          x: 0,
          y: 0,
          scale: 1,
        });

        gsap.set(sideParts, {
          autoAlpha: 1,
          x: 0,
          y: 0,
        });

        return;
      }

      gsap.set(copyParts, {
        autoAlpha: 0,
        x: 24,
        y: 10,
      });

      gsap.set(imageParts, {
        autoAlpha: 0,
        x: 34,
        y: 10,
        scale: 0.96,
      });

      gsap.set(sideParts, {
        autoAlpha: 0,
        x: 22,
        y: 8,
      });
    });

    const activatePoint = (
      index: number,
      ping = false
    ) => {
      pointItems.forEach((item, itemIndex) => {
        gsap.to(
          item,
          {
            autoAlpha:
              itemIndex === index
                ? 1
                : 0.3,

            scale:
              itemIndex === index
                ? 1
                : 0.98,

            duration: 0.2,
            ease: "power2.out",
            overwrite: true,
          }
        );
      });

      if (ping && pointItems[index]) {
        gsap.fromTo(
          pointItems[index],
          {
            scale: 0.96,
          },
          {
            scale: 1.08,
            duration: 0.14,
            ease: "power2.out",
            yoyo: true,
            repeat: 1,
            overwrite: true,
          }
        );
      }
    };

    const tl = gsap.timeline({
      defaults: {
        ease: "none",
      },

      scrollTrigger: {
        trigger: stage,

        start: "top top",

        /*
         * Enough physical scroll distance for:
         *
         *   01 hold
         *   01 → 02
         *   02 hold
         *   02 → 03
         *   03 hold
         */
        end: () =>
          `+=${Math.round(
            window.innerHeight * 3.6
          )}`,

        pin: true,
        pinSpacing: true,

        scrub: true,

        anticipatePin: 1,

        invalidateOnRefresh: true,

        fastScrollEnd: false,

        refreshPriority: 10,

        onUpdate: () => {
          const time = tl.time();

          const scene01 =
            tl.labels.scene01;

          const scene02 =
            tl.labels.scene02;

          const scene03 =
            tl.labels.scene03;

          let activeIndex = 0;

          if (
            time >=
            (scene02 + scene03) / 2
          ) {
            activeIndex = 2;
          } else if (
            time >=
            (scene01 + scene02) / 2
          ) {
            activeIndex = 1;
          }

          const previousIndex =
            Number(
              section.dataset.aboutActiveIndex ??
                "0"
            );

          if (
            activeIndex !==
            previousIndex
          ) {
            section.dataset.aboutActiveIndex =
              String(activeIndex);

            activatePoint(
              activeIndex,
              true
            );
          }
        },
      },
    });

    /*
     * ----------------------------------------------------------
     * ABOUT ENTRY
     * ----------------------------------------------------------
     */

    tl.to(
      label,
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.45,
        ease: "power3.out",
      },
      0
    );

    tl.addLabel(
      "scene01",
      0.45
    );

    /*
     * ----------------------------------------------------------
     * 01 HOLD
     * ----------------------------------------------------------
     */

    tl.to(
      {},
      {
        duration: 0.8,
      }
    );

    const transitionScene = (
      currentIndex: number,
      nextIndex: number
    ) => {
      const current =
        sceneParts[currentIndex];

      const next =
        sceneParts[nextIndex];

      const currentCopy = [
        current.copy,
        current.heading,
        current.button,
      ].filter(Boolean) as HTMLElement[];

      const currentImage = [
        current.image,
      ].filter(Boolean) as HTMLElement[];

      const currentSide = [
        current.sideLabel,
      ].filter(Boolean) as HTMLElement[];

      const nextCopy = [
        next.copy,
        next.heading,
        next.button,
      ].filter(Boolean) as HTMLElement[];

      const nextImage = [
        next.image,
      ].filter(Boolean) as HTMLElement[];

      const nextSide = [
        next.sideLabel,
      ].filter(Boolean) as HTMLElement[];

      gsap.set(
        next.scene,
        {
          autoAlpha: 1,
          x: 24,
          y: 0,
          scale: 1.01,
          zIndex: 4,
        }
      );

      /*
       * OUTGOING
       */

      tl.to(
        currentCopy,
        {
          autoAlpha: 0,
          x: -24,
          y: -8,
          duration: 0.62,
          stagger: 0.025,
          ease: "power2.inOut",
        }
      );

      tl.to(
        currentImage,
        {
          autoAlpha: 0,
          x: -34,
          y: -5,
          scale: 0.965,
          duration: 0.72,
          ease: "power2.inOut",
        },
        "<"
      );

      tl.to(
        currentSide,
        {
          autoAlpha: 0,
          x: -20,
          y: -5,
          duration: 0.58,
          ease: "power2.inOut",
        },
        "<"
      );

      /*
       * INCOMING
       */

      tl.to(
        next.scene,
        {
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.72,
          ease: "power3.out",
        },
        "<0.08"
      );

      tl.to(
        nextImage,
        {
          autoAlpha: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.68,
          ease: "power3.out",
        },
        "<0.04"
      );

      tl.to(
        nextSide,
        {
          autoAlpha: 1,
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
        },
        "<0.12"
      );

      tl.to(
        nextCopy,
        {
          autoAlpha: 1,
          x: 0,
          y: 0,
          duration: 0.62,
          stagger: 0.035,
          ease: "power3.out",
        },
        "<0.08"
      );

      /*
       * The active number ping is synchronized with the
       * visual scene transition.
       */
      tl.call(
        () => {
          activatePoint(
            nextIndex,
            true
          );
        },
        [],
        "<0.18"
      );

      tl.set(
        [
          next.scene,
          ...nextCopy,
          ...nextImage,
          ...nextSide,
        ],
        {
          clearProps:
            "x,y,scale",
        }
      );
    };

    /*
     * ----------------------------------------------------------
     * 01 → 02
     * ----------------------------------------------------------
     */

    transitionScene(0, 1);

    tl.addLabel(
      "scene02"
    );

    /*
     * ----------------------------------------------------------
     * 02 HOLD
     * ----------------------------------------------------------
     */

    tl.to(
      {},
      {
        duration: 0.82,
      }
    );

    /*
     * ----------------------------------------------------------
     * 02 → 03
     * ----------------------------------------------------------
     */

    transitionScene(1, 2);

    tl.addLabel(
      "scene03"
    );

    /*
     * ----------------------------------------------------------
     * 03 HOLD
     * ----------------------------------------------------------
     */

    tl.to(
      {},
      {
        duration: 0.95,
      }
    );

    section.dataset.aboutActiveIndex =
      "0";

    const refresh = () => {
      ScrollTrigger.refresh();
    };

    const frame =
      requestAnimationFrame(() => {
        requestAnimationFrame(
          refresh
        );
      });

    return () => {
      cancelAnimationFrame(frame);
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  });


    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="about-section"
      aria-label="About Terrava"
    >
      <div
        ref={stageRef}
        className="about-stage"
      >
        <div className="about-container">

          {/* ====================================================
              TOP
              ==================================================== */}

          <div className="about-top">

            <div
              ref={labelRef}
              className="about-label"
            >
              <span className="about-label-dot" />

              <span>
                {aboutContent.eyebrow}
              </span>
            </div>

            <div
              ref={pointsRef}
              className="about-points"
            >
              {aboutPoints.map((point) => (
                <div
                  key={point.id}
                  data-about-point
                  className="about-point"
                >
                  <span className="about-point-number">
                    {point.number}
                  </span>

                  <p>
                    {point.text}
                  </p>
                </div>
              ))}
            </div>

          </div>

          {/* ====================================================
              SCENES
              ==================================================== */}

          <div
            ref={scenesRef}
            className="about-scenes"
          >
            {aboutPoints.map((point) => (
              <article
                key={point.id}
                data-about-scene
                className="about-scene"
              >

                {/* LEFT IMAGE */}

                <div className="about-image about-image-left">
                  <img
                    src={point.imageLeft}
                    alt=""
                    loading="lazy"
                  />
                </div>

                {/* CENTER */}

                <div className="about-copy">

                  <h2 className="about-heading">
                    {point.title}
                  </h2>

                  <a
                    href="#contact"
                    className="about-button"
                  >
                    <span>
                      {aboutContent.button}
                    </span>

                    <span className="about-button-arrow">
                      ↗
                    </span>
                  </a>

                </div>

                {/* RIGHT */}

                <div className="about-side">

                  <div className="about-side-label">

                    <span className="about-side-icon">
                      ↗
                    </span>

                    <span>
                      {aboutContent.sideLabel}
                      <br />

                      <em>
                        {aboutContent.sideLabelAccent}
                      </em>
                    </span>

                  </div>

                  <div className="about-image about-image-right">
                    <img
                      src={point.imageRight}
                      alt=""
                      loading="lazy"
                    />
                  </div>

                </div>

              </article>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
