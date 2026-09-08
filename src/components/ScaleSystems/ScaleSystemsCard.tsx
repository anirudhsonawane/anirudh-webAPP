"use client";

import Image from "next/image";
import type { ScaleSystemItem } from "./scaleSystemsData";
import styles from "./ScaleSystems.module.css";

interface ScaleSystemsCardProps {
  item: ScaleSystemItem;
  priority?: boolean;
}

export default function ScaleSystemsCard({
  item,
  priority = false,
}: ScaleSystemsCardProps) {
  return (
    <article className={styles.card}>
      <Image
        src={item.image}
        alt={item.title}
        fill
        priority={priority}
        sizes="(max-width: 768px) 90vw, 32vw"
        className={styles.cardImage}
      />

      <div className={styles.cardOverlay} />

      <div className={styles.cardContent}>
        <span className={styles.cardLabel}>
          {item.label}
        </span>

        <div className={styles.cardBottom}>
          <h3 className={styles.cardTitle}>
            {item.title}
          </h3>

          <p className={styles.cardDescription}>
            {item.description}
          </p>
        </div>
      </div>
    </article>
  );
}