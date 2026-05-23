"use client";

import { Suspense, lazy } from "react";

// The Next.js-optimized Spline import handles SSR properly and ships a
// thinner runtime. Dynamic-import via React.lazy so we don't block first paint.
const Spline = lazy(() => import("@splinetool/react-spline/next"));

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
            LOADING…
          </div>
        </div>
      }
    >
      <Spline scene={scene} className={className} />
    </Suspense>
  );
}
