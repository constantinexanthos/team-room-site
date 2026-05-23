import { LiveRoom } from "@/components/live-room";

// The homepage IS the product. <LiveRoom /> renders a full-viewport
// replayed session of Claude and Codex talking to each other in real
// time, with a tiny header and a tiny install snippet. That's the page.
export default function HomePage() {
  return <LiveRoom />;
}
