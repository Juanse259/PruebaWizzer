"use client";

import React, { useEffect } from "react";
import "./background.css";

const StarryBackground = () => {
  useEffect(() => {
    const colors = ["#fff", "#fff4", "#fff7", "#fffc"];

    const layers = [
      { selector: ".space-1", size: "1px", duration: "30s", totalStars: 300 },
      { selector: ".space-2", size: "2px", duration: "20s", totalStars: 200 },
      { selector: ".space-3", size: "4px", duration: "10s", totalStars: 100 },
    ];

    layers.forEach(({ selector, size, duration, totalStars }) => {
      const layer = [];

      for (let i = 0; i < totalStars; i++) {
        const x = Math.floor(Math.random() * 100);
        const y = Math.floor(Math.random() * 100);
        const color = colors[Math.floor(Math.random() * colors.length)];
        layer.push(
          `${x}vw ${y}vh ${size} ${color}, ${x}vw ${y - 100}vh ${size} ${color}`
        );
      }

      const container = document.querySelector(selector);
      if (container) {
        container.style.setProperty("--space-layer", layer.join(","));
        container.style.setProperty("--size", size);
        container.style.setProperty("--duration", duration);
      }
    });
  }, []);

  return (
    <div className="contain">
      <div className="space space-1"></div>
      <div className="space space-1"></div> {/* Duplico la capa */}
      <div className="space space-2"></div>
      <div className="space space-2"></div> {/* Duplico la capa */}
      <div className="space space-3"></div>
      <div className="space space-3"></div> {/* Duplico la capa */}
    </div>
  );
};

export default StarryBackground;
