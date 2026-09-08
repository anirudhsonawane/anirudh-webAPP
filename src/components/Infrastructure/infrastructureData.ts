export type AboutPoint = {
  id: string;
  number: string;
  text: string;
  title: string;
  imageLeft: string;
  imageRight: string;
};

export const aboutPoints: AboutPoint[] = [
  {
    id: "trees",
    number: "01.",
    text: "Millions of trees planted and tracked",
    title:
      "By combining environmental science with digital tools our platform makes it easy to join greening initiatives, track impact in real-time, and contribute to a sustainable future.",
    imageLeft: "/images/home-bg.png",
    imageRight: "/images/home-bg.png",
  },

  {
    id: "monitoring",
    number: "02.",
    text: "Transparent, map-based project monitoring",
    title:
      "Every project can be monitored through transparent digital tools, giving teams a clearer view of progress, impact, and the places where restoration is happening.",
    imageLeft: "/images/home-bg.png",
    imageRight: "/images/home-bg.png",
  },

  {
    id: "communities",
    number: "03.",
    text: "Partnerships with local communities",
    title:
      "Long-term restoration becomes stronger when technology connects projects with the people and communities responsible for creating lasting environmental impact.",
    imageLeft: "/images/home-bg.png",
    imageRight: "/images/home-bg.png",
  },
];

export const aboutContent = {
  eyebrow: "ABOUT US",
  button: "Join Us",
  sideLabel: "Technology Meets Nature",
  sideLabelAccent: "Restoration",
};


/*
 * ============================================================
 * LEGACY INFRASTRUCTURE CARD DATA
 * ============================================================
 *
 * InfrastructureCard.tsx is still part of the project and
 * imports this type. Keep the compatibility export so the
 * production build remains type-safe without changing the
 * current About section data or animation.
 */

export type InfrastructureCardData = {
  id: string;
  number: string;
  title: string;
  description: string;
  image: string;
};

export const infrastructureCards: InfrastructureCardData[] = [
  {
    id: "system-first",
    number: "01",
    title: "System-First Design",
    description:
      "Designed around how infrastructure systems connect and operate.",
    image: "/images/infrastructure-system.jpg",
  },

  {
    id: "built-for-scale",
    number: "02",
    title: "Built for Scale",
    description:
      "Supports growth across sites and regions without losing control.",
    image: "/images/infrastructure-scale.jpg",
  },

  {
    id: "long-term",
    number: "03",
    title: "Long-Term Focus",
    description:
      "Built to support durable, resilient infrastructure over time.",
    image: "/images/infrastructure-long-term.jpg",
  },
];
