import { ScrollSmoother } from "gsap/ScrollSmoother";

type ScrollOptions = {
  block?: ScrollLogicalPosition;
  offset?: number;
};

const isReducedMotion = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

const getElement = (target: string | HTMLElement | null) => {
  if (!target) return null;
  if (typeof target === "string") {
    const clean = target.startsWith("#") ? target.slice(1) : target;
    return document.getElementById(clean);
  }
  return target;
};

const getTargetScroll = (element: HTMLElement, block: ScrollLogicalPosition, offset: number) => {
  const rect = element.getBoundingClientRect();
  const height = rect.height;
  const viewport = window.innerHeight;
  const current = window.scrollY;
  const elementTop = current + rect.top;

  let target = elementTop;
  if (block === "center") {
    target = elementTop - (viewport - height) / 2;
  } else if (block === "end") {
    target = elementTop - (viewport - height);
  }

  return Math.max(0, target + offset);
};

export const smoothScrollTo = (
  target: string | HTMLElement,
  { block = "start", offset = 0 }: ScrollOptions = {}
) => {
  if (typeof window === "undefined") return;
  const element = getElement(target);
  if (!element) return;

  const prefersReduce = isReducedMotion();
  const smoother = ScrollSmoother.get();

  const targetScroll = getTargetScroll(element, block, offset);

  if (smoother && !prefersReduce) {
    smoother.scrollTo(targetScroll, true);
  } else {
    window.scrollTo({
      top: targetScroll,
      behavior: prefersReduce ? "auto" : "smooth",
    });
  }
};

export const smoothScrollToTop = () => {
  if (typeof window === "undefined") return;
  const prefersReduce = isReducedMotion();
  const smoother = ScrollSmoother.get();

  if (smoother && !prefersReduce) {
    smoother.scrollTo(0, true);
  } else {
    window.scrollTo({ top: 0, behavior: prefersReduce ? "auto" : "smooth" });
  }
};
