# Fasolati quality pass

Prepared September 12, 2026. This pass improves the evidence, reader experience, contact handling, and release controls of the science-spine website. It is a reviewed local candidate, not a claim of clinical validation or a completed public deployment.

## What changed

- **Evidence explorer:** Six mechanisms are searchable by organism, experimental setting, or concept. Readers can expand matching rows, open a mechanism directly from a stable URL fragment, and download the cited map as JSON. The page and export derive from the same source data.
- **Life Board demonstration:** Three explicitly fictional scenarios illustrate missing evidence, a local change, and conflicting observations. Oral, gut, and host-response channels remain separate. No invented patient measurements, composite health scores, personal predictions, or treatment recommendations are introduced. The demonstration appears before the update form.
- **Reader orientation:** Separate entry points guide readers toward the human evidence or the experimental detail. Source findings, interpretation limits, and proposed research uses are visibly separated.
- **Forms:** Initial disabled states prevent accidental native submission when JavaScript is unavailable or fails. Pending requests lock editing, failures retain entries, and acceptance is shown only after a successful service response. Query strings and fragments are excluded from the submitted page context.
- **Data handling:** Removed the template's background HubSpot tracking loader, retained the existing form destination, and added a scoped website-information notice. The existing Inter typeface is now hosted with the site, with its license retained.
- **Presentation:** Fixed low-contrast labels, the update-button hover state, heading hierarchy, and a mobile form-stretching issue. Informational content remains visible if enhancement scripts fail. Both themes and the existing brand identity are preserved.

## Scientific corrections

The independent review covered twelve selected sources and a bounded recent-evidence check. It refined several statements rather than treating model findings as evidence of personal disease-risk prediction.

- **Inflammation timing:** The CRP result is now explicitly a six-month finding. Limited longer-term evidence is distinguished from the claim that benefit necessarily disappears ([Luthra et al.](https://pmc.ncbi.nlm.nih.gov/articles/PMC10087558/)).
- **Glycemic effect:** The HbA1c statement now identifies the between-group comparator and confidence interval: 0.43 percentage points lower at three to four months, with a 95% confidence interval of 0.28 to 0.59 points lower, relative to no active treatment or usual care ([Simpson et al.](https://pubmed.ncbi.nlm.nih.gov/35420698/)).
- **Human colorectal specimens:** FomA enrichment in EV-enriched fractions is distinguished from experimentally demonstrated FomA-transfer effects and from vesicle-exclusive source attribution ([Zheng et al.](https://pmc.ncbi.nlm.nih.gov/articles/PMC11414721/), [marker-specificity discussion](https://pmc.ncbi.nlm.nih.gov/articles/PMC12003102/)).
- **Liver experiments:** Mouse liver and glycogen findings are separated from gingipain-dependent signaling experiments in HepG2 cells. Unverified mouse-method details were not invented ([Seyama et al.](https://pubmed.ncbi.nlm.nih.gov/32088316/)).
- **Delivery routes and trial history:** Direct experimental injection is labeled as such rather than implied to demonstrate natural oral escape ([Farrugia et al.](https://pmc.ncbi.nlm.nih.gov/articles/PMC7684789/)). The January 2022 atuzaginstat hold is explicitly historical, not a statement about the current status of every gingipain inhibitor ([Cortexyme filing](https://www.sec.gov/Archives/edgar/data/1662774/000095017022009040/crtx-20220331.htm)).

## Verification performed

| Check | Result |
|---|---|
| Clean dependency installation | Passed under Node 22 |
| Production build | Passed; 12 HTML pages, 26 files |
| Build-validator unit tests | 52 passed |
| Production-output validation | Passed; 690 references and 10 sitemap URLs |
| Dependency audit | Zero reported vulnerabilities at this check |
| Automated browser accessibility | 48 scans: 12 routes × desktop/mobile × dark/light; no remaining violations in the tested WCAG A/AA rule set |
| Structure and viewport fit | One H1 per page, no duplicate IDs or heading-level skips in the checked main content, no horizontal overflow |
| Narrow viewport | All 12 routes checked at 320px; no horizontal overflow |
| Evidence explorer | Search, empty state, clear, expand/collapse, direct fragment, download initiation and six-row JSON checked |
| Life Board | All three scenarios, exclusive pressed state, and expanded interpretation boundary checked |
| Forms | Mocked rejection, retry and acceptance; contact network failure; pending update-input lock; no real submissions |
| No JavaScript | All four forms disabled; main content and native evidence disclosures remain usable |
| Failed enhancement scripts | Engine content and demonstration visible; form controls remain disabled |
| Navigation | Skip link, desktop disclosure/Escape, theme cycle, mobile focus wrap and Escape return checked |
| Print and motion | Evidence-row expansion/restoration events checked; reduced-motion canvas hiding checked |
| Visual review | Desktop/mobile initial states, both-theme overview, expanded evidence, Life Board disagreement, and corrected mobile signup inspected |

The contrast failures and oversized mobile input found during review were corrected and retested. Automated accessibility scans are not a complete accessibility certification; testing was in Chromium rather than a cross-browser or assistive-technology lab.

## Engineering and deployment

Astro is upgraded to 7.3.2 with a Node 22 workflow and compatible transitive dependencies. The relevant critical advisory was patched in 7.2.8; 7.3.2 is the selected maintenance release, not the only patched version, and the advisory does not establish an exploit against this static site ([GitHub advisory](https://github.com/advisories/GHSA-26w7-cxv4-gfx2)).

Only a main-branch push or main-branch manual dispatch can upload and deploy the Pages artifact. Build jobs have read-only repository permissions; Pages-write and OIDC permissions are limited to deployment. Dependency audit, validator tests, and output validation are release gates.

The repository's Pages setting still selects the legacy branch build. Its failed Jekyll run is a configuration mismatch, not something to fix by deleting history ([failed run](https://github.com/Gengyveusa/fasolati/actions/runs/34741992518)). The proposed correction is `build_type=workflow`, while preserving the custom domain and HTTPS.

## Release boundary and remaining decisions

This candidate requires approval before pushing or merging the new changes and correcting the Pages setting. The previous released commit, `c7eb85fb702c247cb4d5177fb409c54e084b3d70`, remains the rollback reference.

No real HubSpot lead was submitted, and downstream inbox delivery was not verified. No claim is made of comprehensive security, legal compliance, assay performance, clinical efficacy, or prospective clinical utility. The private preview uses relative asset paths for its host; a normal build restores the production paths.
