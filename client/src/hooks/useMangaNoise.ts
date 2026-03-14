import { useRef, useCallback } from "react";

export const useMangaNoise = (
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
) => {
  const noiseRef = useRef<number | null>(null);

  const playNoise = useCallback(
    (duration: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      canvas.style.opacity = "1";
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const w = canvas.width;
      const h = canvas.height;
      const imageData = ctx.createImageData(w, h);
      const data = imageData.data;

      const draw = () => {
        for (let i = 0; i < data.length; i += 4) {
          const v = Math.random() * 255;
          data[i] = v;
          data[i + 1] = v;
          data[i + 2] = v;
          data[i + 3] = 180;
        }
        ctx.putImageData(imageData, 0, 0);
        noiseRef.current = requestAnimationFrame(draw);
      };

      draw();

      setTimeout(() => {
        canvas.style.opacity = "0";
        // Stop animation ONLY after the transition (0.3s) finishes
        setTimeout(() => {
          if (noiseRef.current) {
            cancelAnimationFrame(noiseRef.current);
            noiseRef.current = null;
          }
        }, 300);
      }, duration);
    },
    [canvasRef],
  );

  return { playNoise };
};
