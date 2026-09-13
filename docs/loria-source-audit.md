# Loria source audit and implementation handoff

**Review date: September 13, 2026 · Version 01 · Scope: bounded first-party product-source review**

## Bottom line

The first-party Loria page names **“Loria™ Daily Oral Rinse”**, describes its purpose as product information, and invites requests for formulation, labeling, purchasing information and evidence specific to the finished formulation and intended use. It does not publish those requested documents in its retrieved text. [Fasolati Loria page](https://fasolati.life/loria/)

No finished Loria formula, directions, product-specific clinical benefit, availability, price, regulatory status or professional endorsement has been verified by this review. The relevant fields remain explicitly unfilled in the dossier rather than inferred from the product name or broader research program. [Fasolati Loria page reviewed](https://fasolati.life/loria/)

The reviewed Gengyve pages concern a product named **Gengyve**, not a verified identical Loria formulation. No explicit finished-product equivalence document was identified in the reviewed materials. Do not transfer its ingredient descriptions, directions, reviews, images or benefits to Loria. [Gengyve product page](https://gengyveusa.com/products/gengyve) · [Gengyve professional page](https://gengyveusa.com/pages/for-professionals) · [Loria product page](https://fasolati.life/loria/)

**Implementation choice:** an intentional editorial dossier with publication status, six information fields, evidence boundaries, specific document requests and a buyer-question checklist. No bottle mockup, product-photo placeholder, borrowed Gengyve image or generated asset was used.

## Search and retrieval method

Four bounded SDK operations, no model-switched generation, no LLM extraction and no image generation:

1. Web search: `Loria oral rinse Fasolati`.
2. Web search: `Gengyve oral rinse official`.
3. Plain content fetch, cache disabled, of three first-party pages:
   - https://fasolati.life/loria/
   - https://gengyveusa.com/products/gengyve
   - https://gengyveusa.com/pages/for-professionals
4. Plain fetch of https://fasolati.life/loria/ with HTML returned, cache disabled, to inspect product-asset context.

Search results were used for discovery only. The live Loria fetch was used in preference to search snippets describing earlier, stronger Fasolati marketing language. This is not a comprehensive internet search, a systematic literature review, a regulatory-record search or a determination that missing documents do not exist.

## Source-level observations and permitted use

### S1 — Fasolati, Loria product information

URL: https://fasolati.life/loria/

Retrieved title: “Loria™ Daily Oral Rinse — Product Information | Fasolati.”

Exact useful passages:

> “Loria™ Daily Oral Rinse”
>
> “Request current product details, labeling and purchasing information for Loria. Product-specific evidence should guide any use; the wider oral-systemic research program is not a claim of benefit from this rinse.”
>
> “Ask about the current formulation, labeling and directions.”
>
> “Ask for evidence specific to the finished formulation and intended use.”

These establish what Fasolati publishes about the page and name; they do not verify a complete formula or support a clinical benefit. [Fasolati Loria product information](https://fasolati.life/loria/)

**Permitted use in the new dossier:** product name with explicit first-party attribution; explanation that the original page requests current details; distinction between a product-information inquiry and an order.

**Not permitted from this record:** a list of Loria ingredients, directions, contraindications, dosing, current stock, prices, subscriptions, regulatory status, safety claims, efficacy claims or claims of systemic benefit.

### S2 — GengyveUSA, product page

URL: https://gengyveusa.com/products/gengyve

Retrieved title: “Gengyve Natural Mouthwash — Fluoride-Free Daily Oral Rinse.”

The page has an “Ingredients” section discussing hyaluronic acid, castor oil, CPC, pullulan and PVP, plus directions and marketing claims under the Gengyve name. This is a publisher's ingredient overview, not a verified complete Loria label. [Gengyve product page](https://gengyveusa.com/products/gengyve)

**Permitted use:** explain that different-product information exists and is not being used to populate Loria fields.

**Excluded:** all Gengyve benefit statements, comparisons, use instructions, testimonials, endorsements, ordering terms and imagery as Loria content.

### S3 — GengyveUSA, For Professionals

URL: https://gengyveusa.com/pages/for-professionals

The professional page discusses Gengyve ingredients and contains short research summaries attributed to Tartaglia et al. (2019), Lauritano et al. (2017) and Tartaglia et al. (2017). These references were not independently resolved or verified as studies of the current finished Loria formulation during this bounded review. [Gengyve professional page](https://gengyveusa.com/pages/for-professionals)

**Permitted use:** note that publisher-provided ingredient-related research references should not be treated as finished-product Loria evidence.

**Excluded:** treating the page's “proven efficacy,” long-term safety, “no side effects,” disease-related statements or comparison claims as established findings. No such statements have been adopted for Loria.

## Photography and product identity outcome

The retrieved Loria HTML contains no product-image element in the product-information page body. Its social image points to the general site asset `https://fasolati.life/og-image.png`, with generic Fasolati oral-health/research alternative text; it is not identified there as exact Loria packaging. [Loria page HTML reviewed](https://fasolati.life/loria/)

The same HTML includes site-wide organization metadata naming GengyveUSA as parent organization. Corporate metadata does not establish equality of two finished formulations, labels, SKUs or markets. [Loria page organization metadata](https://fasolati.life/loria/)

**Outcome:** no defensible exact-Loria packaging photo was identified in this review. No photo was downloaded or displayed as Loria. No Gengyve packaging was substituted. This is a limited-source result, not a claim that no Loria photography exists anywhere.

### User-supplied assets needed before photography/formula publication

1. Original, high-resolution front, back and side photographs of the exact Loria-labeled SKU; no other brand's pack.
2. Readable label-panel close-ups or a controlled label PDF, with revision/effective date and applicable market.
3. Product identifiers, pack size, manufacturer/responsible party and formula-version mapping.
4. Complete ingredient declaration and relevant concentrations tied to that version.
5. Current approved directions, warnings, intended users, storage and expiry information.
6. Image provenance: owner, permission to publish, capture date and confirmation that the physical pack matches the current approved label.
7. Full finished-product reports, tested formula versions, adverse-event findings, intended use and claim-to-report mapping.
8. If Gengyve material is proposed: a signed, dated manufacturer statement connecting the exact products, formula revisions and markets, plus an assessment of whether the evidence/label applies. Shared ownership, similar ingredients or a similar bottle is insufficient.

## Content decision matrix

| Field | Current disposition | Gate to change |
|---|---|---|
| Product name | Published with first-party attribution | Current manufacturer/label identity if expanded beyond publisher description |
| Full formula | Not yet published in dossier | Complete controlled declaration, relevant concentrations, SKU/version/market match |
| Directions and warnings | Not supplied | Current approved, applicable label; exact wording review |
| Finished-product clinical evidence | No verified report included | Full report and formula identity; claim-specific review |
| Photo | No product image used | Exact Loria packaging with provenance and usage rights |
| Gengyve equivalence | Not established in reviewed materials | Documented product-identity bridge; no automatic transfer of claims |
| Availability/pricing | No assertion | Dated, authorized commercial confirmation |
| Regulatory status/FDA language | No assertion | Market-specific documentation and appropriate review |
| Testimonials/endorsements | None used | Separate verification and permission; not supplied by a design review |

“Not yet published here” is a content-state label, not proof of absence, an accusation or a promise of eventual publication.

## Files created

Only the eight assigned new repository files:

- `src/data/loria-dossier.ts`
- `src/pages/loria-dossier.astro`
- `src/pages/design-partners.astro`
- `src/styles/dossier-program.css`
- `docs/loria-source-audit.md`
- `docs/clinician-design-partner-kit.md`
- `public/downloads/loria-evidence-checklist.md`
- `public/downloads/clinician-review-brief.md`

Both pages reuse `Base.astro`, its existing navigation/footer, self-hosted Inter and dark/light theme variables. The new CSS is scoped under `dp-` classes. Native `details`/`summary` disclosures require no new client script. No dependencies, existing files, external resources or services were changed by this subtask.

### Integrated contextual routes

- Loria calls to action: `/partner/?intent=loria-dossier#partner-form`.
- Program calls to action: `/partner/?intent=design-partner#partner-form`.
- Both intents use an explicit allowlist and an editable visible form topic; unknown values fall back to a general inquiry.
- `/evidence/#claim-product-specific-evidence` and `/evidence/#claim-life-board-boundary` are integrated, verified evidence anchors.
- The primary Life Board destination is `/life-board/`; the shorter existing example remains available on `/engine/`.
- Download links point to the new static Markdown files and use native `download` attributes.

## QA inventory and handoff

### Static and functional checks

- Build both Astro routes and static downloads.
- Confirm exactly one H1, a distinct title/description/canonical, valid WebPage and BreadcrumbList schema, and sitemap inclusion per public-route policy.
- Check source links, same-page anchor targets and both parent-owned evidence anchors.
- Open and close every native disclosure using keyboard and pointer.
- Activate both downloads and inspect filenames/content; test the content with JavaScript disabled.
- Follow both contextual inquiry CTAs to the form; verify intent is safely recognized without sending a live inquiry.
- Verify the existing form's privacy and error boundaries remain intact; no new patient-data input has been introduced.
- Ensure no `Product`, `Offer`, medical-study, participant-count or review schema falsely implies commerce or an active program.

### Visual and accessibility checks

- Desktop at 1280px or wider; mobile at 375px; additional narrow 320px check.
- Both dark/teal and ivory/teal themes; retain self-hosted Inter.
- No horizontal overflow or clipped headings, badges, citations, downloads or focus indicators.
- Visible editorial content rather than a fake package or an empty image frame.
- Confirm “proposed,” “interest only,” “planning target” and no-patient-data boundaries are readable, not hidden solely in disclosures.
- Reduced motion and keyboard focus; no new animations or custom disclosure controls.
- Off-happy-path: JavaScript disabled; all disclosures open on a narrow screen; long source titles and evidence questions wrap.

### Release boundaries

No public deployment, git commit/push, outreach, enrollment, scheduling or external service creation was performed by this subtask. The result is a review candidate. The parent must complete private-preview QA and separately obtain any required public-release or outreach approval.

### QA results

Assigned-file static checks passed: all eight files are nonempty; both routes contain exactly one H1, native disclosures and WebPage schema; neither contains a product image or new script; both downloads exist; the linked `demo-title` anchor exists in the current Life Board component.

The integrated build and 62 regression tests subsequently passed. Browser QA covered all 17 routes in both themes at desktop and mobile widths, plus narrow-layout and no-JavaScript checks; both dossier/program downloads and contextual inquiry flows passed without a live form submission. The accompanying next-phase release report records final integration results and remaining publication gates.
