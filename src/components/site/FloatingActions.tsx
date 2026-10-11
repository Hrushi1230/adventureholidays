import { MessageCircle, Phone, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { business } from "@/lib/site";

export function FloatingActions({ heroDock = false }: { heroDock?: boolean }) {
  const [dockTop, setDockTop] = useState<number>();
  useEffect(() => {
    if (!heroDock) return;
    const update = () => {
      const hero = document.getElementById("home");
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      setDockTop(rect.bottom > 80 ? rect.bottom + window.scrollY - 68 : undefined);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    const observer = new ResizeObserver(update);
    const hero = document.getElementById("home");
    if (hero) observer.observe(hero);
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", update); observer.disconnect(); };
  }, [heroDock]);
  return (
    <div className={`floating-actions ${dockTop !== undefined ? "absolute" : "fixed"} right-4 z-40 flex items-center gap-2 md:right-6`} style={dockTop !== undefined ? { top: dockTop } : { bottom: "max(1rem, env(safe-area-inset-bottom))" }}>
      {business.whatsappGroupInvite && (
        <a href={business.whatsappGroupInvite} target="_blank" rel="noopener noreferrer" className="flex h-12 items-center gap-2 rounded-full bg-background px-4 text-xs font-bold uppercase tracking-wider text-primary shadow-soft">
          <Users className="h-4 w-4" /> Join Group
        </a>
      )}
      <a href={business.whatsappHref} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" className="grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5"><MessageCircle className="h-5 w-5" /></a>
      <a href={business.phoneHref} aria-label={`Call ${business.phone}`} className="grid h-12 w-12 place-items-center rounded-full bg-accent text-accent-foreground shadow-soft transition-transform hover:-translate-y-0.5"><Phone className="h-5 w-5" /></a>
    </div>
  );
}
