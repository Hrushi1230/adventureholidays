import { useEffect } from "react";

/** Adds `is-visible` to every `.reveal` / `.poster-reveal` element; ones already on screen reveal immediately. */
export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal, .poster-reveal");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    els.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) el.classList.add("is-visible");
      else io.observe(el);
    });
    return () => io.disconnect();
  }, []);
}

/** Returns a parallax offset helper bound to scroll. */
export function useParallax(ref: React.RefObject<HTMLElement | null>, speed = 0.15) {
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const parent = el.parentElement!;
        const r = parent.getBoundingClientRect();
        const offset = (r.top + r.height / 2 - window.innerHeight / 2) * -speed;
        el.style.transform = `translate3d(0, ${offset}px, 0) scale(1.15)`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [ref, speed]);
}
