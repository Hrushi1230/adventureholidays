<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->
# Agent rules
- Business data (contact, destinations, completedToursPreview (tours in src/lib/tours.ts), testimonials) lives in src/lib/site.ts; components render honest empty states when arrays are empty — never invent tour/testimonial data.
- Each homepage section is its own file in src/components/site/; enquiry form submits via prefilled WhatsApp (no backend); scroll reveal via `.reveal` + useReveal hook.
- Scheduled group departures live only in `tours` in src/lib/tours.ts; homepage, /tours/$slug, WhatsApp text and SEO all derive from it via helpers, so a tour is defined once. `status` is authoritative (no date-based auto-completion).
- Homepage upcoming tours appear at three levels: UpcomingHero (featured), UpcomingTourSpotlight (dismissible non-modal reminder, per-tour 24h localStorage dismissal, homepage only), compact UpcomingDepartures strip — all derived from src/lib/tours.ts helpers.
