# Fasolati science-spine website update

Prepared September 12, 2026. This release replaces unsupported clinical and operational promises with an evidence-linked public research architecture while preserving the existing domain, product routes, and brand identity.

## Content scope

- Homepage: source ecology, effector activity, delivered exposure, and host response remain distinct. Life Board is visibly labeled a product concept.
- Science: six expandable mechanism summaries, cited experimental settings, human evidence, assay limitations, proposed falsification experiments, and translation rules.
- Product pages: distinguish product-information inquiries from development concepts. No checkout, clinical enrollment, autonomous treatment protocol, or validated personal systemic-risk score is offered.
- About: corrected founder name and removed unsupported biography, timeline, and partnership claims.
- Navigation and metadata: internal Science Spine destinations replace stale prototype links. Updated social image, favicon, page descriptions, and WebPage structured data.

## Form behavior

The existing HubSpot portal and form IDs are retained. Successful submission is shown only after an HTTP success response; failure retains entries and permits a retry. Form scripts no longer persist contact details in local storage. Copy names HubSpot and warns against submitting sensitive health information.

HubSpot's pre-existing tracking script remains present. This is not a full privacy or security audit. Form tests used intercepted responses only; no real test leads were submitted, and inbox delivery has not been verified.

## Verification

- Production build: passed; 11 generated pages.
- Desktop and mobile: initial-view screenshots reviewed at 1440px and 375px.
- Narrow-screen check: no horizontal page overflow across all routes at 320px.
- All generated pages: one H1, no duplicate IDs, expected canonical URLs.
- Internal links and fragment targets: no unresolved targets in the checked build.
- Six mechanism disclosures and four research disclosures: open/close tested.
- Navigation: desktop open/Escape; mobile open, focus wrap, Escape, and link navigation tested.
- Theme: dark/light/dark cycle tested; both homepage themes reviewed.
- Contact and three update forms: invalid email, mocked service rejection, retained entries, and mocked acceptance tested.
- JavaScript disabled: homepage content and fallback navigation visible; native science disclosure works.
- Reduced motion: static content visible and particle canvas hidden.
- Domain and verification files: retained unchanged.
- Syntax/build output and git whitespace checks: passed.

No assertion is made about live deployment, live lead delivery, clinical validity, legal classification, or comprehensive accessibility/security conformance from these checks alone.

## Outstanding maintenance

The existing dependency audit reports six advisories: one critical, four high, and one low. Packages named in the audit are Astro, esbuild, js-yaml, nanoid, sharp, and svgo. The suggested Astro remediation is a major-version upgrade; dependency versions were not changed in this content release. This finding concerns the dependency tree, not a demonstrated exploit against the static published pages. A separate dependency upgrade and regression-testing pass remains warranted.

## Release gate

The reviewed build is prepared for a private preview. Public publication requires approval, followed by the repository build/deploy workflow and verification of the live domain. Preserve the prior commit as the rollback point.
