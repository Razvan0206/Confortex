import { ViewTransition } from "react";

// A template re-mounts on every navigation, so each page change plays enter/exit (see .page-in / .page-out in globals.css).
// Next 16 + data-scroll-behavior="smooth" on <html> also stops the router from scrolling visibly to the top.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="page-in" exit="page-out" default="none">
      {children}
    </ViewTransition>
  );
}
