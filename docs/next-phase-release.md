# Fasolati next-phase release report

Prepared September 13, 2026. This is a technically checked private release candidate containing all five proposed additions, not a public launch or clinical validation. The existing production site has not been changed by this candidate, and no invitations, live form tests or scheduled work have been sent or started.

## What is ready

| Addition | Implemented result | Boundary preserved |
|---|---|---|
| Guided Life Board | Four fictional visits, separate oral/gut/host observations, qualitative timeline, step controls, read-all mode, keyboard navigation and narrative download | No patient input, composite health score, diagnosis, treatment recommendation or claimed intervention effect |
| Evidence pathway | Five interactive stages, four visibly uncertain connections, source/model context, inference limits, comparison view and deep links | A proposed causal path is not presented as a proven human exposure-to-disease chain |
| Loria dossier | Product-information destination, explicit document gaps, buyer-question checklist, evidence checklist and contextual inquiry | No invented formula, labeling, packaging photo, availability, clinical benefit or product equivalence |
| Clinician design-partner program | Proposed 5–8-person program page, downloadable review brief and complete operator kit | Not launched; no enrolled reviewers, collected feedback, endorsement or clinical study implied |
| Evidence and claims ledger | Eleven searchable records, category filters, five historical wording revisions, stable claim anchors, JSON snapshot and RSS feed | Selected evidence rather than an exhaustive review; editorial checks are not human scientific sign-off |

The additions use the existing Fasolati visual identity, self-hosted typography and light/dark themes. Navigation, the science reader, the shorter existing Life Board example, product pages, privacy description and inquiry form now connect the new destinations.

## Technical verification

| Check | Result |
|---|---|
| Production build | 17 generated HTML pages |
| Production-output validator | 38 files and 1,367 references checked; 15 sitemap URLs |
| Regression tests | 52 existing validator tests plus 10 next-phase tests passed |
| Dependency audit | Zero vulnerabilities reported by `npm audit --audit-level=low` at the time of this build |
| Browser route/theme coverage | 68 scans: all 17 routes at 1440px and 375px, in both themes |
| Automated accessibility | No axe WCAG 2 A/AA or WCAG 2.1 AA violations detected in those scans |
| Layout and structure | No horizontal overflow, duplicate IDs, H1 failures, skipped heading levels or sub-12px text detected in the scanned states |
| Browser script errors | None recorded during the final route/theme scan |
| Additional reflow | All five new pages checked at 320px, 720px and 768px without horizontal overflow |
| JavaScript disabled | All four visits, five pathway stages and eleven claims remain readable; fallback navigation remains available; native disclosures work |
| No-JavaScript inquiry safety | First-name input and submit button remain disabled; the form does not silently submit without its script |
| Inquiry tests | Ten intercepted mock requests covering errors, retry, acceptance and topic payload; zero live submissions |
| Data exports | JSON claims match rendered content; five RSS revision entries align with the JSON history; XML parses successfully |
| Repository formatting | `git diff --check` passed |
| Deployed private preview | All five new destinations, two inquiry intents, interactive visit/stage selection and claim filtering verified on the hosted version |
| Hosted static files | Claims JSON, revision RSS, fictional narrative and both Markdown downloads returned HTTP 200; self-hosted fonts loaded |

Desktop/mobile screenshots were inspected separately from the automated checks. Additional visual inspection covered discordant observations, exposure-route boundaries and an expanded human-evidence claim on narrow screens; no clipping or misleading visual merging of the three observation channels was found.

### Interaction coverage

- **Guided case:** All four states, three observation channels, timeline markers, native evidence/interpretation disclosures, first/last limits, previous/next, read-all/return, reset, arrow/Home/End keys, deep links and download. The complete flow also passed at 320px.
- **Pathway:** All five stages and four uncertain connections, settings and inference limits, previous/next, compare-all/return, reset, keyboard controls and exposure-route deep link. The complete flow also passed at 320px.
- **Ledger:** Search/category intersection, empty results, clear, deep-link recovery of a filtered-out claim, every claim/revision disclosure and JSON download.
- **Dossier and program:** Every native disclosure, both Markdown downloads and contextual inquiry links. The resulting topic is visible and editable rather than a hidden classification.
- **Existing site:** Theme round trip, desktop menus, mobile focus trap and return, mobile-menu scroll reach, all five new destinations, existing science filters/download and all three shorter fictional scenarios.
- **Off-happy-path checks:** Unknown or markup-shaped intent values fall back safely, arbitrary query data is not copied into the inquiry payload, source URLs omit query strings, failed submissions can be retried, and an empty evidence search has a working clear action.

### What these checks do not establish

This is Chromium-based technical QA, not a guarantee of behavior in every browser or assistive technology. There was no manual screen-reader evaluation, live email-delivery test, penetration test, clinical evaluation, regulatory determination or systematic literature update. A clean automated accessibility scan is not an accessibility certification.

## Evidence and product gates

The reviewed first-party Loria page supplies product identity and an information-request framing, but the bounded review did not verify the full formulation, current label/directions, exact packaging photography or finished-product clinical evidence. Those fields remain explicitly incomplete; this does not establish that the documents do not exist. ([Fasolati Loria product information](https://fasolati.life/loria/))

Gengyve information was not treated as proof of an identical Loria product. Its ingredients, directions, images, testimonials and benefit claims were not transferred to the dossier. ([Gengyve product information](https://gengyveusa.com/products/gengyve), [Fasolati Loria product information](https://fasolati.life/loria/))

Before adding those materials, obtain the exact current SKU/market/version, controlled label and complete ingredient declaration, approved directions and warnings, image provenance, and any full finished-product reports tied to that formulation. The source-audit document and downloadable evidence checklist detail the required identity and claim checks.

The evidence-review log is intentionally blank for future human approvals. The five historical revisions document actual prior wording corrections; the static feed does not imply that a new study, external scientific review or unattended monitoring program has occurred.

## Handoff

- **30-day roadmap:** Relative days begin after approval and assignment of review roles. It defines the initial review, clinician-feedback cycle, revisions, retesting and a continue/narrow/pause decision.
- **Clinician operations kit:** Recruitment criteria, proposed role mix, three core questions, 30-minute moderator script, blank observation/rating/action templates, note-handling proposal, launch gates and complete UNSENT invitations/follow-ups.
- **Loria source audit:** Exact reviewed sources, permitted and excluded uses, packaging/formulation gaps and document requests.
- **Evidence review log:** Human-review template for the source, proposed wording, decision, reviewer and release identifier.

Nothing in the kit represents a booked conversation or permission to contact someone. Outreach requires approval of the actual recipients, channel and complete message, and participant handling must be agreed before a session.

## Release procedure and recovery

The implementation is saved as local commit `237366f` on the `next-phase` branch, with this final hosted-preview verification recorded in a subsequent documentation commit. Its starting production commit is `3e28299`, the previously published quality-pass release; no push or production deployment is part of this handoff.

Before an approved production release:

1. Review the visible candidate, claim boundaries and product-document gaps; record the human release decision.
2. Rebuild from source under Node 22 using `npm ci`, `npm run audit`, `npm run test:build-validation`, `npm run build`, `npm run validate:build` and `npm run test:next-phase`.
3. Push a review branch only with authorization, verify the actual GitHub checks, then merge/release only after approval.
4. Verify production routes, fonts, downloads, canonical URLs and non-submitting inquiry behavior after deployment.
5. If a release introduces a regression, restore the previously approved source using a reviewed revert and the same verified deployment workflow. Preserve deployment history; do not reset remote history or delete workflow runs.

The private preview uses a generated-output-only relative-path adaptation for its nested hosting location. Production must always use a fresh normal build, not the preview-adapted output. Canonical URLs and feed links continue to describe the intended production locations; they are not evidence that the new routes have already been published.
