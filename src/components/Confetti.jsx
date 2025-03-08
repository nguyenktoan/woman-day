import { useEffect } from "react";
import ConfettiGenerator from "confetti-js";

export default function Confetti({ show }) {
  useEffect(() => {
    if (show) {
      const confetti = new ConfettiGenerator({
        target: "confetti-canvas",
        max: 80,
        size: 1,
        animate: true,
        props: ["circle", "square", "triangle"],
        colors: [
          [255, 107, 107],
          [240, 101, 149],
          [204, 93, 232],
          [255, 192, 203],
        ],
        clock: 25,
        rotate: true,
        start_from_edge: true,
        respawn: true,
        opacity: 0.8,
      });

      confetti.render();
      return () => confetti.clear();
    }
  }, [show]);

  if (!show) return null;

  return (
    <canvas
      id="confetti-canvas"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1,
      }}
    />
  );
}
