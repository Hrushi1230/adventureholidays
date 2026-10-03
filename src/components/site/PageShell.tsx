import { ArrowLeft } from "lucide-react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { FloatingActions } from "./FloatingActions";
import { btnOutline } from "./ui";

/** Minimal branded shell for sections whose full content arrives in a later pass. */
export function PageShell({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <>
      <Header solidAlways />
      <main className="mx-auto min-h-[70svh] max-w-7xl px-5 pb-24 pt-36 md:px-8 md:pt-44">
        <p className="eyebrow text-accent">{eyebrow}</p>
        <h1 className="display mt-4 text-5xl text-primary md:text-7xl">{title}</h1>
        <p className="mt-6 max-w-xl text-muted-foreground md:text-lg">{text}</p>
        <a href="/" className={`${btnOutline} mt-10`}><ArrowLeft className="h-4 w-4" /> Back to Home</a>
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
