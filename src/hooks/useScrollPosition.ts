import { useEffect, useRef, useSyncExternalStore } from "react";

// Single shared scroll listener for the entire app
type ScrollData = {
  scrollY: number;
  scrollPercent: number;
  viewportHeight: number;
};

let currentData: ScrollData = {
  scrollY: 0,
  scrollPercent: 0,
  viewportHeight: typeof window !== "undefined" ? window.innerHeight : 0,
};

const listeners = new Set<() => void>();

let ticking = false;

const update = () => {
  const scrollY = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  currentData = {
    scrollY,
    scrollPercent: docHeight > 0 ? scrollY / docHeight : 0,
    viewportHeight: window.innerHeight,
  };
  listeners.forEach((l) => l());
  ticking = false;
};

const onScroll = () => {
  if (!ticking) {
    ticking = true;
    requestAnimationFrame(update);
  }
};

let listening = false;
const ensureListening = () => {
  if (listening) return;
  listening = true;
  window.addEventListener("scroll", onScroll, { passive: true });
  update();
};

const subscribe = (cb: () => void) => {
  ensureListening();
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
    if (listeners.size === 0) {
      listening = false;
      window.removeEventListener("scroll", onScroll);
    }
  };
};

const getSnapshot = () => currentData;

export const useScrollPosition = () => {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
};
