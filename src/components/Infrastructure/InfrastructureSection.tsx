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
  const sectionRef =
    useRef<HTMLElement>(null);

  const stageRef =
    useRef<HTMLDivElement>(null);

  const labelRef =
    useRef<HTMLDivElement>(null);

  const pointsRef =
    useRef<HTMLDivElement>(null);

  const scenesRef =
    useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section =
      sectionRef.current;

    const stage =
      stageRef.current;

    if (!section || !stage) {
      return;
    }

    const ctx =
      gsap.context(() => {
        const mm =
          gsap.matchMedia();

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

      /*
       * ----------------------------------------------------------
       * MOBILE
       * ----------------------------------------------------------
       *
       * Mobile uses normal document flow.
       *
       * There is no mobile pin, sticky stage, fixed story track,
       * or whole-scene opacity animation. Every scene remains a
       * real document block and only its internal elements animate.
       */
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

        /*
         * MOBILE ARCHITECTURE
         * --------------------------------------------------------
         * Every About chapter stays in normal document flow.
         * Nothing is pinned, sticky, fixed, or hidden as a whole.
         *
         * The chapter reveal alternates horizontally:
         *
         *   01  -> enters from LEFT  -> center -> exits LEFT
         *   02  -> enters from RIGHT -> center -> exits RIGHT
         *   03  -> enters from LEFT  -> center -> exits LEFT
         *
         * Because the animation is scrubbed by ScrollTrigger, the
         * movement reverses naturally when the user scrolls upward.
         * This gives the mobile section the same physical feeling as
         * the intro without creating artificial blank scroll space.
         */

        gsap.set(label, {
          autoAlpha: 0.65,
          y: 18,
        });

        /* The desktop points are hidden on mobile by CSS. */
        gsap.set(pointItems, {
          autoAlpha: 1,
          x: 0,
          y: 0,
          scale: 1,
        });

        gsap.set(sceneItems, {
          clearProps: "visibility,opacity,transform",
        });

        const triggers: ScrollTrigger[] = [];

        /* --------------------------------------------------------
           ABOUT HEADER
           -------------------------------------------------------- */

        const headerTimeline = gsap.timeline({
          paused: true,
          defaults: {
            ease: "power3.out",
          },
        });

        headerTimeline.to(label, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
        });

        triggers.push(
          ScrollTrigger.create({
            trigger: stage,
            animation: headerTimeline,
            start: "top 88%",
            toggleActions: "play none none reverse",
            invalidateOnRefresh: true,
            fastScrollEnd: true,
          })
        );

        /* --------------------------------------------------------
           ALTERNATING CHAPTER REVEALS
           -------------------------------------------------------- */

        sceneItems.forEach((scene, index) => {
          const copy =
            scene.querySelector<HTMLElement>(
              ".about-copy"
            );

          const heading =
            scene.querySelector<HTMLElement>(
              ".about-heading"
            );

          const button =
            scene.querySelector<HTMLElement>(
              ".about-button"
            );

          const image =
            scene.querySelector<HTMLElement>(
              ".about-image-left"
            );

          const side =
            scene.querySelector<HTMLElement>(
              ".about-side"
            );

          const scenePoint =
            scene.querySelector<HTMLElement>(
              ".about-scene-point"
            );

          const revealItems = [
            scenePoint,
            copy,
            heading,
            button,
            image,
            side,
          ].filter(Boolean) as HTMLElement[];

          /*
           * Keep the article itself visible at all times. Only its
           * internal content moves, so the document can never expose
           * a blank white chapter because of an opacity/pin failure.
           */
          gsap.set(scene, {
            autoAlpha: 1,
            clearProps:
              "visibility,opacity,transform",
          });

          /*
           * Even chapter = LEFT -> RIGHT into the center.
           * Odd chapter  = RIGHT -> LEFT into the center.
           */
          const direction =
            index % 2 === 0 ? -1 : 1;

          const enterX = 110 * direction;
          const exitX = 110 * direction;

          gsap.set(revealItems, {
            autoAlpha: 0.12,
            x: enterX,
            y: 18,
            scale: 0.985,
          });

          const revealTimeline =
            gsap.timeline({
              paused: true,
              defaults: {
                ease: "power3.out",
              },
            });

          /*
           * ENTER
           * The complete chapter slides horizontally into place.
           * The stagger keeps the number, heading, image and side
           * information connected while still feeling alive.
           */
          revealTimeline.to(
            revealItems,
            {
              autoAlpha: 1,
              x: 0,
              y: 0,
              scale: 1,
              duration: 0.48,
              stagger: 0.045,
              ease: "power3.out",
            },
            0.08
          );

          const trigger =
            ScrollTrigger.create({
              trigger: scene,
              animation: revealTimeline,

              /*
               * Use the actual chapter bounds. There is no pin and no
               * artificial viewport-sized spacer.
               */
              start: "top 88%",
              toggleActions: "play none none reverse",
              invalidateOnRefresh: true,
              fastScrollEnd: true,
            });

          triggers.push(trigger);

        });

        /* --------------------------------------------------------
           REFRESH AFTER MOBILE LAYOUT / IMAGES SETTLE
           -------------------------------------------------------- */

        const refresh = () => {
          ScrollTrigger.refresh();
        };

        const frame =
          requestAnimationFrame(() => {
            requestAnimationFrame(refresh);
          });

        const handleLoad = () => {
          requestAnimationFrame(refresh);
        };

        window.addEventListener(
          "load",
          handleLoad,
          { once: true }
        );

        const observer =
          new ResizeObserver(refresh);

        observer.observe(stage);

        sceneItems.forEach((scene) => {
          const image =
            scene.querySelector<HTMLImageElement>(
              "img"
            );

          if (image) {
            if (image.complete) {
              refresh();
            } else {
              image.addEventListener(
                "load",
                refresh,
                { once: true }
              );
            }
          }
        });

        return () => {
          cancelAnimationFrame(frame);

          window.removeEventListener(
            "load",
            handleLoad
          );

          observer.disconnect();

          triggers.forEach((trigger) => {
            trigger.kill();
          });
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

                {/* MOBILE CHAPTER POINT */}

                <div
                  className="about-scene-point"
                  data-about-scene-point
                >
                  <span className="about-point-number">
                    {point.number}
                  </span>

                  <p>
                    {point.text}
                  </p>
                </div>

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
