# Final Adventure Holiday integration

## Build
- Replace the departure-led homepage hero with an evergreen Adventure Holiday hero using a real completed-tour photograph, explicit three-line mobile headline, and the approved CTA hierarchy.
- Set the official WhatsApp group invite once in business data and route every group/community action through it, while preserving normal tour-enquiry WhatsApp links.
- Keep the existing hanging cloth banner and confirm its immediate viewport-fixed entrance, top-origin ropes, compact mobile placement, stacked multi-tour preview, navigation, dismissal, and demo-query behavior.
- Keep the existing editorial Recent Journeys and Gallery hero, and confirm reveal-on-refresh behavior.
- Finish Traveller Stories with authentic testimonial priority, a production-safe empty state, verified trust facts, and query-gated preview metrics.
- Replace the two separate homepage experience teasers with one combined Rural Camps and Picnic Point showcase sourced from the existing experience data; leave both full pages unchanged.

## Technical details
- Continue using `src/lib/tours.ts`, `src/lib/gallery.ts`, `src/lib/site.ts`, and `src/lib/experiences.ts` as the only data sources.
- Preserve all existing routes, tour details, album grouping, lightbox, enquiry flow, header, footer, pricing, and contact logic.
- Use existing CSS/React animation patterns only, eager-load the brand hero, and lazy-load below-fold images.

## Validation
- Check homepage at 390×844, 430×932, 1366×768, 1440×900, and 1920×1080.
- Check Gallery desktop/mobile, Rural Camps mobile, Picnic Point mobile, Andaman tour mobile, `/?bannerDemo=2`, and `/?trustDemo=1`.
- Confirm no horizontal overflow, no normal-page demo data, and no build/runtime errors.
