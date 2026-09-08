"use client";

import {
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(
  ScrollSmoother
);

export default function Navbar() {
  const navRef =
    useRef<HTMLElement>(null);

  const mobileMenuRef =
    useRef<HTMLDivElement>(null);

  const mobileMenuInnerRef =
    useRef<HTMLDivElement>(null);

  const mobileMenuItemsRef =
    useRef<HTMLAnchorElement[]>([]);

  const menuButtonRef =
    useRef<HTMLButtonElement>(null);

  const menuLineOneRef =
    useRef<HTMLSpanElement>(null);

  const menuLineTwoRef =
    useRef<HTMLSpanElement>(null);

  const menuTimelineRef =
    useRef<gsap.core.Timeline | null>(null);

  const scrollLockRef =
    useRef<{
      scrollY: number;
      bodyOverflow: string;
      bodyPosition: string;
      bodyTop: string;
      bodyWidth: string;
      htmlOverflow: string;
    } | null>(null);

  const [isMenuOpen, setIsMenuOpen] =
    useState(false);

  const addMenuItemRef =
    (element: HTMLAnchorElement | null) => {
      if (
        element &&
        !mobileMenuItemsRef.current.includes(
          element
        )
      ) {
        mobileMenuItemsRef.current.push(
          element
        );
      }
    };

  /*
   * ============================================================
   * MOBILE PAGE SCROLL LOCK
   * ============================================================
   *
   * The fullscreen menu must become a true modal layer.
   *
   * ScrollSmoother is paused first so its virtual scroll position
   * cannot continue moving behind the menu. Body/html locking is
   * also applied as a fallback for native mobile scrolling.
   *
   * The original scroll position is restored exactly when the
   * menu closes.
   * ============================================================
   */

  const lockPageScroll =
    () => {
      if (
        typeof window === "undefined" ||
        typeof document === "undefined"
      ) {
        return;
      }

      if (
        window.matchMedia(
          "(min-width: 768px)"
        ).matches
      ) {
        return;
      }

      if (
        scrollLockRef.current
      ) {
        return;
      }

      const smoother =
        ScrollSmoother.get();

      const scrollY =
        window.scrollY ||
        window.pageYOffset ||
        0;

      scrollLockRef.current = {
        scrollY,

        bodyOverflow:
          document.body.style
            .overflow,

        bodyPosition:
          document.body.style
            .position,

        bodyTop:
          document.body.style
            .top,

        bodyWidth:
          document.body.style
            .width,

        htmlOverflow:
          document.documentElement
            .style.overflow,
      };

      /*
       * Stop the virtual smoother immediately.
       */
      smoother?.paused(true);

      /*
       * Stop native document scrolling.
       */
      document.documentElement.style.overflow =
        "hidden";

      document.body.style.overflow =
        "hidden";

      document.body.style.position =
        "fixed";

      document.body.style.top =
        `-${scrollY}px`;

      document.body.style.width =
        "100%";

      /*
       * Prevent iOS rubber-band / touch scrolling
       * from leaking through the fullscreen menu.
       */
      document.body.style.touchAction =
        "none";
    };

  const unlockPageScroll =
    () => {
      if (
        typeof window === "undefined" ||
        typeof document === "undefined"
      ) {
        return;
      }

      const lock =
        scrollLockRef.current;

      if (!lock) {
        return;
      }

      const smoother =
        ScrollSmoother.get();

      /*
       * Restore the exact body/html styles that existed
       * before opening the menu.
       */
      document.documentElement.style.overflow =
        lock.htmlOverflow;

      document.body.style.overflow =
        lock.bodyOverflow;

      document.body.style.position =
        lock.bodyPosition;

      document.body.style.top =
        lock.bodyTop;

      document.body.style.width =
        lock.bodyWidth;

      document.body.style.removeProperty(
        "touch-action"
      );

      scrollLockRef.current =
        null;

      /*
       * Restore the exact previous scroll position.
       */
      window.scrollTo(
        0,
        lock.scrollY
      );

      /*
       * Resume ScrollSmoother only after the
       * document has been restored.
       */
      smoother?.paused(false);

      /*
       * Recalculate ScrollTrigger positions after
       * the fixed-body state is removed.
       */
      requestAnimationFrame(() => {
        ScrollSmoother.get()
          ?.scrollTop(
            lock.scrollY
          );
      });
    };

  useLayoutEffect(() => {
    const nav =
      navRef.current;

    const menu =
      mobileMenuRef.current;

    const menuInner =
      mobileMenuInnerRef.current;

    const menuButton =
      menuButtonRef.current;

    const lineOne =
      menuLineOneRef.current;

    const lineTwo =
      menuLineTwoRef.current;

    if (
      !nav ||
      !menu ||
      !menuInner ||
      !menuButton ||
      !lineOne ||
      !lineTwo
    ) {
      return;
    }

    const ctx =
      gsap.context(() => {
        const heroTitle =
          document.querySelector(
            "[data-hero-title]"
          ) as HTMLElement | null;

        const heroTitleLines =
          heroTitle
            ? Array.from(
                heroTitle.querySelectorAll(
                  "span"
                )
              )
            : [];

        const heroDescription =
          document.querySelector(
            "[data-hero-description]"
          ) as HTMLElement | null;

        /*
         * ==========================================================
         * NAVBAR INITIAL STATE
         * ==========================================================
         */

        gsap.set(nav, {
          autoAlpha: 0,
          y: -24,
          scale: 0.99,
        });

        /*
         * ==========================================================
         * MOBILE MENU INITIAL STATE
         * ==========================================================
         */

        gsap.set(menu, {
          autoAlpha: 0,
          yPercent: 0,
          clipPath: "inset(0 0 100% 0)",
          pointerEvents: "none",
        });

        gsap.set(menuInner, {
          y: -18,
          opacity: 0,
        });

        gsap.set(
          mobileMenuItemsRef.current,
          {
            y: 24,
            opacity: 0,
          }
        );

        gsap.set(lineOne, {
          transformOrigin:
            "center center",
          rotation: 0,
          y: 0,
        });

        gsap.set(lineTwo, {
          transformOrigin:
            "center center",
          rotation: 0,
          y: 0,
        });

        /*
         * ==========================================================
         * MOBILE MENU TIMELINE
         * ==========================================================
         *
         * One GSAP timeline controls:
         *
         *   backdrop
         *   menu panel
         *   menu content
         *   navigation items
         *   hamburger → close icon
         *
         * This avoids CSS transitions fighting GSAP.
         */

        const menuTl =
          gsap.timeline({
            paused: true,
            defaults: {
              overwrite: "auto",
            },
          });

        menuTl
          .to(
            menu,
            {
              autoAlpha: 1,
              clipPath: "inset(0 0 0% 0)",
              pointerEvents:
                "auto",
              duration: 0.72,
              ease: "power4.inOut",
            },
            0
          )
          .to(
            menuInner,
            {
              y: 0,
              opacity: 1,
              duration: 0.5,
              ease: "power3.out",
            },
            0.08
          )
          .to(
            mobileMenuItemsRef.current,
            {
              y: 0,
              opacity: 1,
              duration: 0.52,
              stagger: 0.065,
              ease: "power3.out",
            },
            0.12
          )
          .to(
            lineOne,
            {
              rotation: 45,
              y: 4,
              duration: 0.28,
              ease: "power3.inOut",
            },
            0
          )
          .to(
            lineTwo,
            {
              rotation: -45,
              y: -4,
              duration: 0.28,
              ease: "power3.inOut",
            },
            0
          );

        menuTimelineRef.current =
          menuTl;

        /*
         * ==========================================================
         * HOMEPAGE ENTER
         * ==========================================================
         */

        const handleHomepageEnter =
          () => {
            const tl =
              gsap.timeline();

            tl.to(
              nav,
              {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                duration: 0.72,
                ease: "power3.out",
              },
              0
            );

            if (
              heroTitleLines.length
            ) {
              tl.to(
                heroTitleLines,
                {
                  autoAlpha: 1,
                  y: 0,
                  duration: 0.72,
                  stagger: 0.045,
                  ease: "power3.out",
                },
                0.08
              );
            }

            if (heroDescription) {
              tl.to(
                heroDescription,
                {
                  autoAlpha: 1,
                  y: 0,
                  duration: 0.6,
                  ease: "power3.out",
                },
                0.35
              );
            }
          };

        window.addEventListener(
          "homepage:enter",
          handleHomepageEnter
        );

        /*
         * ==========================================================
         * ESCAPE
         * ==========================================================
         */

        const handleKeyDown =
          (event: KeyboardEvent) => {
            if (
              event.key === "Escape" &&
              menuTl.progress() > 0
            ) {
              menuTl.reverse();

              setIsMenuOpen(false);

              menuTl.eventCallback(
                "onReverseComplete",
                () => {
                  unlockPageScroll();

                  menuTl.eventCallback(
                    "onReverseComplete",
                    null
                  );
                }
              );
            }
          };

        window.addEventListener(
          "keydown",
          handleKeyDown
        );

        const preventMenuScroll =
          (event: Event) => {
            if (
              menuTl.progress() > 0
            ) {
              event.preventDefault();
            }
          };

        menu.addEventListener(
          "wheel",
          preventMenuScroll,
          {
            passive: false,
          }
        );

        menu.addEventListener(
          "touchmove",
          preventMenuScroll,
          {
            passive: false,
          }
        );

        return () => {
          window.removeEventListener(
            "homepage:enter",
            handleHomepageEnter
          );

          window.removeEventListener(
            "keydown",
            handleKeyDown
          );

          menu.removeEventListener(
            "wheel",
            preventMenuScroll
          );

          menu.removeEventListener(
            "touchmove",
            preventMenuScroll
          );

          unlockPageScroll();

          menuTl.kill();

          menuTimelineRef.current =
            null;
        };
      }, navRef);

    return () => {
      ctx.revert();
    };
  }, []);

  /*
   * ============================================================
   * MENU TOGGLE
   * ============================================================
   */

  const toggleMobileMenu =
    () => {
      const timeline =
        menuTimelineRef.current;

      if (!timeline) {
        return;
      }

      if (isMenuOpen) {
        timeline.reverse();

        setIsMenuOpen(false);

        /*
         * Keep the page locked until the close animation
         * has visually completed.
         */
        timeline.eventCallback(
          "onReverseComplete",
          () => {
            unlockPageScroll();

            timeline.eventCallback(
              "onReverseComplete",
              null
            );
          }
        );

        return;
      }

      lockPageScroll();

      timeline.eventCallback(
        "onReverseComplete",
        null
      );

      timeline.play();

      setIsMenuOpen(true);
    };

  /*
   * ============================================================
   * CLOSE MENU
   * ============================================================
   */

  const closeMobileMenu =
    () => {
      const timeline =
        menuTimelineRef.current;

      if (!timeline) {
        return;
      }

      timeline.reverse();

      setIsMenuOpen(false);

      timeline.eventCallback(
        "onReverseComplete",
        () => {
          unlockPageScroll();

          timeline.eventCallback(
            "onReverseComplete",
            null
          );
        }
      );
    };

  return (
    <>
      <nav
        ref={navRef}
      data-navbar
      className="absolute left-2 right-2 top-2 z-50 flex h-[52px] items-center rounded-[13px] bg-[#f5f4ef]/95 px-3 backdrop-blur-md sm:left-3 sm:right-3 sm:top-3 sm:h-[58px] sm:rounded-[15px] sm:px-5 md:left-5 md:right-5 md:top-5 md:h-[64px] md:rounded-[17px] md:px-7"
    >
      {/* ========================================================
          DESKTOP NAVIGATION
          ======================================================== */}

      <div className="hidden items-center gap-6 text-[13px] font-medium text-neutral-900 md:flex">
        <a
          href="#"
          className="transition-opacity duration-300 hover:opacity-60"
        >
          Platform
        </a>

        <a
          href="#"
          className="transition-opacity duration-300 hover:opacity-60"
        >
          How It Works
        </a>

        <a
          href="#"
          className="transition-opacity duration-300 hover:opacity-60"
        >
          About
        </a>
      </div>

      {/* ========================================================
          LOGO
          ======================================================== */}

      <div className="absolute left-1/2 -translate-x-1/2 text-[18px] font-medium tracking-[-0.04em] text-neutral-900 sm:text-[21px]">
        Terrava
      </div>

      {/* ========================================================
          DESKTOP CTA
          ======================================================== */}

      <button
        type="button"
        className="ml-auto hidden h-[38px] items-center gap-3 rounded-[10px] bg-white px-3 pl-4 text-[12px] font-medium text-neutral-900 transition-transform duration-300 hover:scale-[1.02] md:flex"
      >
        <span>
          Explore Platform
        </span>

        <span className="flex h-[28px] w-[28px] items-center justify-center rounded-[7px] bg-black text-[13px] leading-none text-white">
          ↗
        </span>
      </button>

      {/* ========================================================
          MOBILE MENU BUTTON
          ======================================================== */}

      <button
        ref={menuButtonRef}
        type="button"
        aria-label={
          isMenuOpen
            ? "Close navigation menu"
            : "Open navigation menu"
        }
        aria-expanded={isMenuOpen}
        onClick={
          toggleMobileMenu
        }
        className="relative z-[60] ml-auto flex h-[34px] w-[42px] items-center justify-center rounded-[9px] bg-white md:hidden"
      >
        <span className="relative flex h-[14px] w-[17px] items-center justify-center">
          <span
            ref={menuLineOneRef}
            className="absolute h-[1.5px] w-[17px] rounded-full bg-black"
          />

          <span
            ref={menuLineTwoRef}
            className="absolute h-[1.5px] w-[17px] rounded-full bg-black"
          />
        </span>
      </button>

      </nav>

      {/* ========================================================
          MOBILE GSAP MENU
          ========================================================

          IMPORTANT:
          This panel is a sibling of the navbar, not a child of it.
          The navbar itself is GSAP-transformed during entrance, and a
          transformed ancestor would otherwise make `position: fixed`
          relative to that ancestor instead of the viewport.
          ======================================================== */}

      <div
        ref={mobileMenuRef}
        aria-hidden={!isMenuOpen}
        className="fixed inset-0 z-40 h-[100dvh] w-screen overflow-hidden bg-[#f5f4ef]"
      >
        <div
          ref={mobileMenuInnerRef}
          className="flex h-full min-h-0 flex-col px-5 pb-[max(24px,env(safe-area-inset-bottom))] pt-[88px]"
        >
          <div className="mb-6 flex items-center justify-between border-b border-black/[0.10] pb-4">
            <span className="text-[9px] uppercase tracking-[0.12em] text-neutral-500">
              Navigation
            </span>

            <span className="text-[9px] uppercase tracking-[0.12em] text-neutral-400">
              Terrava
            </span>
          </div>

          <div className="flex min-h-0 flex-1 flex-col">
            <a
              ref={addMenuItemRef}
              href="#"
              onClick={
                closeMobileMenu
              }
              className="flex flex-1 items-center border-b border-black/[0.08] text-[clamp(36px,11vw,58px)] font-light leading-none tracking-[-0.065em] text-neutral-900"
            >
              <span>Platform</span>
            </a>

            <a
              ref={addMenuItemRef}
              href="#"
              onClick={
                closeMobileMenu
              }
              className="flex flex-1 items-center border-b border-black/[0.08] text-[clamp(36px,11vw,58px)] font-light leading-none tracking-[-0.065em] text-neutral-900"
            >
              <span>How It Works</span>
            </a>

            <a
              ref={addMenuItemRef}
              href="#"
              onClick={
                closeMobileMenu
              }
              className="flex flex-1 items-center border-b border-black/[0.08] text-[clamp(36px,11vw,58px)] font-light leading-none tracking-[-0.065em] text-neutral-900"
            >
              <span>About</span>
            </a>

            <a
              ref={addMenuItemRef}
              href="#"
              onClick={
                closeMobileMenu
              }
              className="flex flex-1 items-center justify-between text-[clamp(36px,11vw,58px)] font-light leading-none tracking-[-0.065em] text-neutral-900"
            >
              <span>
                Explore Platform
              </span>

              <span className="ml-4 flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-[10px] bg-black text-[17px] leading-none text-white">
                ↗
              </span>
            </a>
          </div>

          <div className="mt-6 flex items-end justify-between text-[9px] uppercase tracking-[0.12em] text-neutral-400">
            <span>
              Digital restoration
            </span>

            <span>
              © Terrava
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
