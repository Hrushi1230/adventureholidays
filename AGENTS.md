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
- Business data (contact, destinations, upcomingTours, completedToursPreview, testimonials) lives in src/lib/site.ts; components render honest empty states when arrays are empty — never invent tour/testimonial data.
- Each homepage section is its own file in src/components/site/; enquiry form submits via prefilled WhatsApp (no backend); scroll reveal via `.reveal` + useReveal hook.
