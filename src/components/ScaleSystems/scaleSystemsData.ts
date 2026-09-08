export interface ScaleSystemItem {
  id: number;
  label: string;
  title: string;
  description: string;
  image: string;
}

export const scaleSystemsData: ScaleSystemItem[] = [
  {
    id: 1,
    label: "Connect",
    title: "Bring Infrastructure Into One System",
    description:
      "Connect assets, sites, and operational data into a single unified platform.",
    image: "/images/system/scale-system-01.jpg",
  },
  {
    id: 2,
    label: "Structure",
    title: "Organize Systems with Clarity",
    description:
      "Structure infrastructure into coherent systems that are easier to manage and understand.",
    image: "/images/system/scale-system-02.jpg",
  },
  {
    id: 3,
    label: "Operate",
    title: "Operate with Confidence",
    description:
      "Bring people, processes, and operational workflows together for reliable execution.",
    image: "/images/system/scale-system-03.jpg",
  },
  {
    id: 4,
    label: "Optimize",
    title: "Continuously Improve Performance",
    description:
      "Use connected information and insights to improve infrastructure performance over time.",
    image: "/images/system/scale-system-04.jpg",
  },
];