"use client";

import { forwardRef } from "react";
import type { InfrastructureCardData } from "./infrastructureData";

type InfrastructureCardProps = {
  card: InfrastructureCardData;
  overlay?: boolean;
};

const InfrastructureCard = forwardRef<
  HTMLElement,
  InfrastructureCardProps
>(({ card, overlay = false }, ref) => {
  return (
    <article
      ref={ref}
      data-infrastructure-card
      className={`infrastructure-card ${
        overlay ? "infrastructure-card--overlay" : ""
      }`}
    >
      <div className="infrastructure-card-inner">
        <div
          data-card-image-wrap
          className="infrastructure-card-image-wrap"
        >
          <img
            data-card-image
            src={card.image}
            alt=""
            loading="lazy"
            className="infrastructure-card-image"
          />
        </div>

        <div
          data-card-content
          className="infrastructure-card-content"
        >
          <div className="infrastructure-card-copy">
            <div className="infrastructure-card-number">
              {card.number}
            </div>

            <h3
              data-card-title
              className="infrastructure-card-title"
            >
              {card.title}
            </h3>

            <p
              data-card-description
              className="infrastructure-card-description"
            >
              {card.description}
            </p>
          </div>

          <button
            type="button"
            className="infrastructure-card-button"
          >
            <span>Learn More</span>

            <span className="infrastructure-card-arrow">
              ↗
            </span>
          </button>
        </div>
      </div>
    </article>
  );
});

InfrastructureCard.displayName = "InfrastructureCard";

export default InfrastructureCard;