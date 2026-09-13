# Fasolati: the next 30 days

Prepared September 13, 2026. This is an execution proposal accompanying a private release candidate, not a public launch announcement or a clinical development commitment. Day 1 begins when Thad approves the direction and assigns the human review roles.

## The objective

Make Fasolati understandable enough to use, transparent enough to question, and concrete enough to get useful feedback. The near-term result is a coherent demonstration and a small, structured learning cycle, not a working diagnostic service.

The five workstreams reinforce one another: the Life Board demonstrates the idea; the pathway explains its scientific questions; the Loria dossier separates product facts from ambition; clinicians test comprehension; and the ledger preserves the claims and their limits.

## What the release candidate contains

| Workstream | Candidate surface | What it is not |
|---|---|---|
| Guided Life Board | `/life-board/`: an authored fictional case across multiple observations, with separate oral, gut and host-response channels | A patient dashboard, personal health score or treatment recommendation |
| Pathway explorer | `/pathway/`: a staged explanation with model settings, citations and unestablished human bridges | Proof of a continuous causal chain in a person |
| Loria dossier | `/loria-dossier/`: product-information structure, evidence boundaries and explicit document gaps | A verified formula, fabricated bottle image, clinical efficacy claim or checkout |
| Clinician design partners | `/design-partners/`, a review brief, moderator kit and unsent invitation drafts | An enrolled cohort, clinical trial, data collection portal or endorsement program |
| Evidence ledger | `/evidence/`, JSON snapshot and RSS revision feed | Exhaustive literature surveillance, an email subscription or automated scientific approval |

All five surfaces are connected through the existing site rather than maintained as separate prototypes. Public rollout, actual recruitment and new product claims remain human decisions.

## The sequence

| Window | Work and proposed owner | Acceptance condition | Dependency and fallback |
|---|---|---|---|
| Days 1–3 | Thad reviews the candidate; a designated scientific reviewer reviews claims; product owner supplies current Loria identity documents | Written decisions on release scope, intended audience, unresolved claims and responsible reviewers | If product documents are unavailable, keep the dossier explicitly incomplete and omit formula, product imagery and purchasing assertions |
| Days 4–7 | Builder incorporates review; Thad approves named recipients and the complete outreach draft; moderator schedules an initial set of conversations | Release candidate passes technical QA and content review; invitations are approved before sending | If no recipients are approved, rehearse the script internally and keep outreach unsent |
| Days 8–14 | Moderator conducts the first design-review conversations using only fictional examples | Each completed session has a consented, de-identified observation sheet, specific confusion points and verbatim non-sensitive feedback when permitted | If reviewers introduce real cases, stop and return to the fictional scenario; do not collect patient records |
| Days 15–21 | Builder fixes the most consequential misunderstandings; scientific and product reviewers review affected wording | Revised flow distinguishes observation, interpretation and missing evidence; any revised claim has a source and review record | Do not add a score or new integration merely to make the demo look more complete |
| Days 22–27 | Moderator retests the revised flow with the remaining reviewers or willing returning reviewers | Compare the same tasks before and after revision; preserve failures and disagreements instead of averaging them away | If access to reviewers slips, extend the learning period rather than declaring success on schedule |
| Days 28–30 | Thad leads a continue / narrow / pause decision; reviewers sign off on any public update | A one-page decision memo identifies what was learned, what remains unknown and the smallest justified next build | Clinical utility and assay development require a separate scoped program; design feedback does not unlock clinical deployment |

Owners above are proposed responsibilities, not claims that anyone has accepted an assignment. No outside person's time or recruitment availability has been assumed.

## The learning agenda

- **Comprehension:** Can a reviewer explain the difference between an observation, an interpretation and a proposed next question without prompting?
- **Uncertainty:** Can the reviewer identify missing measurements and conflicting channels without inferring a hidden overall health score?
- **Scientific attribution:** Can the reviewer distinguish a cell or animal finding, a human treatment result and a product-specific claim?
- **Product-information sufficiency:** What exact labeling, formulation, identity or study documents would the reviewer need before discussing Loria responsibly?
- **Practical relevance:** Which part, if any, would be worth revisiting in a real workflow after validation and governance were separately addressed?

The proposed 5–8-person group is for qualitative design learning. Report completed counts and concrete observations, not population-level percentages, efficacy claims or estimates of market demand.

## Suggested review rubric

Use the same tasks and wording across sessions. Record what happened before the moderator explains the answer.

| Task | Clear without help | Needed a prompt | Material misunderstanding | Note to capture |
|---|---|---|---|---|
| Explain what changed between two fictional observations | Blank until tested | Blank until tested | Blank until tested | What did the person treat as a measurement? |
| Identify the missing channel | Blank until tested | Blank until tested | Blank until tested | Did missing data become “normal” in their interpretation? |
| Explain why a pathway link remains unestablished | Blank until tested | Blank until tested | Blank until tested | Did an animal exposure route become assumed human transport? |
| Locate a source and its interpretation boundary | Blank until tested | Blank until tested | Blank until tested | Was the limit visible before the claim was repeated? |
| State what is and is not known about Loria | Blank until tested | Blank until tested | Blank until tested | Did generic research become a finished-product claim? |

Treat any misunderstanding that turns the demonstration into diagnosis, treatment advice or validated product benefit as a release blocker for the affected wording. The goal is not to train reviewers into agreement; it is to learn where the design itself misleads.

## Evidence maintenance

The ledger has stable claim IDs, source URLs, editorial check dates, interpretation limits and revision records. The six mechanism records reuse the science map as their source of truth; the JSON and page are generated from the same data.

For each proposed update:

1. Identify the claim ID and the specific reason to revisit it.
2. Fetch the primary source and preserve the relevant setting, population, exposure, comparator and uncertainty.
3. Record the proposed wording and its explicit interpretation limit.
4. Have a named scientific reviewer accept, narrow or reject it.
5. Record the actual reviewer, review date, decision and release identifier in the review log.
6. Run build, source-consistency, link and interaction checks.
7. Ask for approval before publishing the reviewed release.

The RSS feed is a static output of these editorial records. No unattended monitoring or recurring paid task is activated by this build. Do not label an automated source check as a human review.

## Loria document gate

Before completing a product-specific dossier, obtain the current approved front and back label, exact product identity, formulation or ingredient documentation, directions and warnings, responsible manufacturer or distributor, intended market and current commercial status. Obtain permission to use any supplied product photographs and confirm that they depict the same product revision.

The source audit and product checklist give the detailed gaps. Do not infer equivalence with a related Gengyve product, copy its packaging, or turn ingredient-level evidence into finished-product efficacy.

## Release and outreach gates

- **Public website:** Thad approves the candidate and its unresolved items. Publish the reviewed build through the existing repository workflow; verify the final public routes afterward.
- **Contact forms:** Preserve explicit submission and the existing service. Test with intercepted requests; do not send fake inquiries to the real account.
- **Outreach:** Approve the actual recipient list, destination and full message. Drafts are not sent automatically.
- **Research participation:** General interest is not enrollment or consent. Any clinical data or specimen work requires a separately reviewed process.
- **Scientific claims:** No personal disease-risk prediction, implied validated assay, clinical deployment or Loria systemic-benefit claim is unlocked by completing this month.

## Now, next, later

- **Now:** Review the coherent candidate, complete product source gaps, and approve a small design-learning effort.
- **Next:** Conduct the conversations, correct the most important misunderstandings, and publish only reviewed changes.
- **Later:** Scope assay identity, analytical performance, source attribution and clinical utility as separate research questions. Decide what to build only after the evidence and intended use justify it.

The recommended first move is a short review of the fictional Life Board and the Loria document gate. That tests the central idea while preventing the product story from running ahead of what can be substantiated.
