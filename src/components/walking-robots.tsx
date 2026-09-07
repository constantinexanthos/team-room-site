"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { PixelRobot } from "@/components/pixel-robot";
import { OfficeDesk } from "@/components/office-props";
import styles from "./walking-robots.module.css";

type Agent = "claude" | "chatgpt";
type Side = "left" | "right";
type Layout = {
  width: number;
  contentLeft: number;
  contentRight: number;
  lowerTop: number;
  controls: HTMLElement | null;
};
type Point = { x: number; y: number };

const ROOMS = [
  { id: "upper-left", side: "left", lower: false, duration: 28, delay: -2, messages: ["Cache the API response?", "Key it by user ID."] },
  { id: "upper-right", side: "right", lower: false, duration: 30, delay: -11, messages: ["This effect runs twice.", "Check the cleanup hook."] },
  { id: "lower-left", side: "left", lower: true, duration: 32, delay: -25, messages: ["Retries duplicate writes.", "Add an idempotency key."] },
  { id: "lower-right", side: "right", lower: true, duration: 29, delay: -7, messages: ["The query scans every row.", "Index the foreign key."] },
] as const;

function subscribeToEnvironment(onChange: () => void) {
  const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  preference.addEventListener("change", onChange);
  document.addEventListener("visibilitychange", onChange);
  return () => {
    preference.removeEventListener("change", onChange);
    document.removeEventListener("visibilitychange", onChange);
  };
}

function getEnvironmentSnapshot() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "reduced";
  return document.hidden ? "hidden" : "active";
}

function getServerSnapshot() { return "active"; }

/** Quiet office activity lives entirely outside the reading column. */
export function WalkingRobots() {
  const world = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState<Layout | null>(null);
  const [userPaused, setUserPaused] = useState(false);
  const environment = useSyncExternalStore(subscribeToEnvironment, getEnvironmentSnapshot, getServerSnapshot);
  const reducedMotion = environment === "reduced";
  const paused = userPaused || environment !== "active";

  useEffect(() => {
    const page = world.current?.closest<HTMLElement>(".room-page");
    const content = page?.querySelector<HTMLElement>(".room-content");
    if (!page || !content) return;
    let frame = 0;
    let disposed = false;
    const measure = () => {
      if (disposed) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const pageRect = page.getBoundingClientRect();
        const contentRect = content.getBoundingClientRect();
        const sections = content.querySelectorAll<HTMLElement>(".room-section");
        const lowerSection = sections[3] ?? sections[1];
        const lowerTop = Math.max(900, Math.round((lowerSection?.getBoundingClientRect().top ?? pageRect.top + 1500) - pageRect.top + 48));
        const next = {
          width: Math.round(pageRect.width),
          contentLeft: contentRect.left - pageRect.left,
          contentRight: contentRect.right - pageRect.left,
          lowerTop,
          controls: page.querySelector<HTMLElement>("[data-room-controls]"),
        };
        setLayout((previous) => {
          if (previous?.width === next.width && previous.contentLeft === next.contentLeft &&
            previous.contentRight === next.contentRight && previous.lowerTop === next.lowerTop &&
            previous.controls === next.controls) return previous;
          return next;
        });
      });
    };
    const observer = new ResizeObserver(measure);
    observer.observe(page);
    observer.observe(content);
    window.addEventListener("resize", measure);
    document.fonts.ready.then(measure);
    measure();
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  // A minimum 16 px clear gap separates every prop and speech bubble from
  // the complete content box, including its existing reading-column padding.
  const sideSpace = layout ? Math.min(layout.contentLeft, layout.width - layout.contentRight) : 0;
  const visible = !!layout && layout.width >= 1200 && sideSpace >= 136;
  const railWidth = Math.min(200, sideSpace - 32);
  const control = (
    <button
      type="button"
      className={styles.control}
      aria-controls="team-room-landscape"
      aria-pressed={userPaused || reducedMotion}
      disabled={reducedMotion}
      title={reducedMotion ? "Your device’s reduced motion setting pauses the scene." : undefined}
      onClick={() => setUserPaused((value) => !value)}
    >
      <span className={styles.controlIcon} aria-hidden="true">{userPaused || reducedMotion ? "▶" : "Ⅱ"}</span>
      {reducedMotion ? "Motion reduced" : userPaused ? "Resume scene" : "Pause scene"}
    </button>
  );

  return (
    <>
      <div
        ref={world}
        id="team-room-landscape"
        className={styles.scene}
        data-room-scene
        data-paused={paused}
        aria-hidden="true"
      >
        {visible && ROOMS.map((room) => (
          <SideRoom
            key={room.id}
            id={room.id}
            side={room.side}
            left={room.side === "left"
              ? (layout.contentLeft - railWidth) / 2
              : layout.contentRight + (layout.width - layout.contentRight - railWidth) / 2}
            top={room.lower ? layout.lowerTop : 120}
            width={railWidth}
            duration={room.duration}
            delay={room.delay}
            messages={room.messages}
          />
        ))}
      </div>
      {visible && layout.controls && createPortal(control, layout.controls)}
    </>
  );
}

function SideRoom({ id, side, left, top, width, duration, delay, messages }: {
  id: string;
  side: Side;
  left: number;
  top: number;
  width: number;
  duration: number;
  delay: number;
  messages: readonly [string, string];
}) {
  const size = 36;
  // Leave a full walking aisle beside each desk, even in the narrowest rail.
  const deskWidth = Math.min(88, width - size - 12);
  const deskHeight = deskWidth * 100 / 130;
  const desks = [
    { x: 0, y: 0 },
    { x: width - deskWidth, y: 340 },
  ];
  const homes = desks.map((desk) => ({
    x: desk.x + deskWidth / 2 - size / 2,
    y: desk.y + deskHeight + 4,
  }));
  const meetings = [
    { x: width / 2 + 7, y: 194 },
    { x: width / 2 - 43, y: 201 },
  ];
  // Outbound paths: leave the chair horizontally, follow the clear aisle,
  // then approach the partner. The return traces that same path in reverse.
  const aisles = [width - size - 4, 4];
  const variables = {
    left,
    top,
    width,
    height: 470,
    "--cycle-duration": `${duration}s`,
    "--phase-delay": `${delay}s`,
  } as CSSProperties;

  return (
    <div className={styles.sideRoom} data-side-room={id} data-side={side} style={variables}>
      {(["claude", "chatgpt"] as const).map((agent, index) => (
        <div key={agent}>
          <div
            className={styles.desk}
            data-desk={agent}
            style={{ left: desks[index].x, top: desks[index].y, width: deskWidth }}
          >
            <OfficeDesk agent={agent} />
          </div>
          <span
            className={styles.chair}
            style={{ left: homes[index].x + 8, top: homes[index].y + 18 }}
          />
          <Walker
            agent={agent}
            message={messages[index]}
            home={homes[index]}
            meeting={meetings[index]}
            aisle={aisles[index]}
            width={width}
            size={size}
          />
        </div>
      ))}
    </div>
  );
}

function Walker({ agent, message, home, meeting, aisle, width, size }: {
  agent: Agent;
  message: string;
  home: Point;
  meeting: Point;
  aisle: number;
  width: number;
  size: number;
}) {
  const bubbleWidth = Math.min(148, width);
  const bubbleLeft = (width - bubbleWidth) / 2 - meeting.x;
  const variables = {
    width: size,
    height: size * 16 / 14,
    "--home-x": `${home.x}px`,
    "--home-y": `${home.y}px`,
    "--aisle-x": `${aisle}px`,
    "--meet-x": `${meeting.x}px`,
    "--meet-y": `${meeting.y}px`,
    "--bubble-width": `${bubbleWidth}px`,
    "--bubble-left": `${bubbleLeft}px`,
    "--tail-left": `${size / 2 - bubbleLeft - 4}px`,
  } as CSSProperties;

  return (
    <div className={styles.walker} data-agent={agent} style={variables}>
      <span className={styles.shadow} />
      <PixelRobot size={size} agent={agent} className={styles.robot} />
      <div className={styles.bubble}><span>{message}</span></div>
    </div>
  );
}
