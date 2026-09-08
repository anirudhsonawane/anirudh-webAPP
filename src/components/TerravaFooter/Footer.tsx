"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Footer.module.css";
import { footerData } from "./footerData";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLHeadingElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 901px)", () => {
        const image = imageRef.current;
        const eyebrow = eyebrowRef.current;
        const headline = headlineRef.current;
        const description = descriptionRef.current;
        const cta = ctaRef.current;
        const meta = metaRef.current;
        const nav = navRef.current;
        const brand = brandRef.current;

        if (!image || !eyebrow || !headline || !description || !cta || !meta || !nav || !brand) return;

        gsap.set(image, { scale: 1.08, yPercent: -3 });
        gsap.set([eyebrow, headline, description, cta], { y: 42, autoAlpha: 0 });
        gsap.set([meta, nav], { y: 28, autoAlpha: 0 });
        gsap.set(brand, { yPercent: 32, autoAlpha: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 90%",
            end: "bottom 20%",
            scrub: 0.7,
            invalidateOnRefresh: true,
          },
        });

        tl.to(image, { scale: 1, yPercent: 4, duration: 2.2, ease: "none" }, 0);
        tl.to(eyebrow, { y: 0, autoAlpha: 1, duration: 0.5, ease: "power3.out" }, 0.05);
        tl.to(headline, { y: 0, autoAlpha: 1, duration: 0.65, ease: "power3.out" }, 0.14);
        tl.to(description, { y: 0, autoAlpha: 1, duration: 0.5, ease: "power2.out" }, 0.28);
        tl.to(cta, { y: 0, autoAlpha: 1, duration: 0.45, ease: "power3.out" }, 0.4);
        tl.to(nav, { y: 0, autoAlpha: 1, duration: 0.5 }, 0.68);
        tl.to(meta, { y: 0, autoAlpha: 1, duration: 0.4 }, 0.76);
        tl.to(brand, { yPercent: 0, autoAlpha: 1, duration: 1.1, ease: "power3.out" }, 0.78);

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      });

      mm.add("(max-width: 900px)", () => {
        const targets = [
          eyebrowRef.current,
          headlineRef.current,
          descriptionRef.current,
          ctaRef.current,
          metaRef.current,
          navRef.current,
          brandRef.current,
        ].filter(Boolean);

        const image = imageRef.current;
        if (!image || !targets.length) return;

        gsap.set(image, { scale: 1.04 });
        gsap.set(targets, { y: 22, autoAlpha: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 92%",
            end: "bottom 35%",
            scrub: 0.55,
            invalidateOnRefresh: true,
          },
        });

        tl.to(image, { scale: 1, duration: 1.2, ease: "none" }, 0);
        tl.to(targets, {
          y: 0,
          autoAlpha: 1,
          duration: 0.65,
          stagger: 0.07,
          ease: "power3.out",
        }, 0.05);

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      });

      return () => mm.revert();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={sectionRef} id="contact" className={styles.footer}>
      <div className={styles.landscape}>
        <div
          ref={imageRef}
          className={styles.landscapeImage}
          style={{ backgroundImage: `url(${footerData.backgroundImage})` }}
        />
        <div className={styles.overlay} />
      </div>

      <div className={styles.content}>
        <div className={styles.ctaBlock}>
          <h2 ref={eyebrowRef}>{footerData.eyebrow}</h2>

          <h3 ref={headlineRef} className={styles.headline}>
            <span>{footerData.headline}</span>
            <span className={styles.inlineImage} aria-hidden="true" />
            <span>{footerData.ending}</span>
          </h3>

          <p ref={descriptionRef}>{footerData.description}</p>

          <a ref={ctaRef} className={styles.cta} href="#platform">
            <span>{footerData.cta}</span>
            <span className={styles.ctaIcon}>↗</span>
          </a>
        </div>

        <div className={styles.footerPanel}>
          <div ref={metaRef} className={styles.meta}>
            <span>{footerData.copyright}</span>
            <span className={styles.line} />
            <span>{footerData.rights}</span>
          </div>

          <nav ref={navRef} className={styles.nav}>
            {footerData.links.map((link) => (
              <a key={link.label} href={link.href}>{link.label}</a>
            ))}
          </nav>

          <div ref={brandRef} className={styles.brand}>Terrava</div>
        </div>
      </div>
    </footer>
  );
}
