"use client";

import { Suspense, lazy } from "react";

// Lazy-load the Spline runtime — it's ~500KB. Don't block initial render.
const Spline = lazy(() => import("@splinetool/react-spline"));

interface SplineSceneProps {
  scene: string;
  className?: string;
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <Suspense
      fallback={
        <div className={"flex h-full w-full items-center justify-center " + (className ?? "")}>
          <div className="font-mono text-[10px] tracking-[0.3em] text-white/40">
            LOADING SCENE…
          </div>
        </div>
      }
    >
      <Spline scene={scene} className={className} />
    </Suspense>
  );
}
