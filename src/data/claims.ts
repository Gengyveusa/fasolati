import { MECHANISMS } from './science';

export type Claim = {
  id: string; title: string; category: string; setting: string;
  statement: string; boundary: string; next: string;
  sources: { label: string; url: string }[]; reviewed: string;
};
export const LEDGER_VERSION = '2026-09-13';
export const CLAIMS: Claim[] = [
  ...MECHANISMS.map(m => ({
    id: m.id, title: m.name, category: 'Mechanism', setting: m.setting,
    statement: m.finding, boundary: m.boundary, next: m.use,
    sources: [{ label: m.source, url: m.url }, ...(m.boundaryUrl ? [{ label: 'Marker-specificity context', url: m.boundaryUrl }] : [])],
    reviewed: '2026-09-12'
  })),
  {
    id: 'human-glycemic-control', title: 'Periodontal treatment and glycemic control',
    category: 'Human evidence', setting: 'Clinical systematic review',
    statement: 'In people with diabetes and periodontitis, the Cochrane review found HbA1c 0.43 percentage points lower at three to four months with periodontal treatment versus no active treatment or usual care (95% CI: 0.28 to 0.59 points lower; moderate-certainty evidence).',
    boundary: 'This concerns periodontal treatment in a defined population. It does not identify OMVs as the mediator or demonstrate Fasolati or Loria efficacy.',
    next: 'Keep population, comparator, time point, uncertainty and intervention attached to the result.',
    sources: [{ label: 'Simpson et al., Cochrane, 2022', url: 'https://pubmed.ncbi.nlm.nih.gov/35420698/' }], reviewed: '2026-09-13'
  },
  {
    id: 'human-crp', title: 'Periodontal treatment and systemic inflammation',
    category: 'Human evidence', setting: 'Clinical systematic review',
    statement: 'Luthra and colleagues reported lower C-reactive protein at six months after periodontal treatment, with heterogeneous results. The smaller analysis at twelve months or longer did not detect an effect, with limited longer-term evidence.',
    boundary: 'A change in CRP is not proof of oral-vesicle mediation, a universal sustained effect, or benefit from a Fasolati product.',
    next: 'Retain follow-up duration and heterogeneity. Do not replace the original intervention with an oral-care product.',
    sources: [{ label: 'Luthra et al., 2023', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10087558/' }], reviewed: '2026-09-13'
  },
  {
    id: 'material-identity', title: 'Identify the material before interpreting activity',
    category: 'Measurement', setting: 'Methodological guidance',
    statement: 'The Fasolati research proposal separates bacterial burden, vesicle-associated material, non-vesicular material and functional activity. MISEV2023 is a methodological reference, not validation of a Fasolati assay.',
    boundary: 'Enrichment is not purity. A detected marker or active fraction alone is not sufficient to establish the identity, origin and activity of intact bacterial vesicles.',
    next: 'Specify collection, separation, identity, contamination, interference and repeatability controls before interpreting a proposed assay.',
    sources: [{ label: 'MISEV2023 guidance', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10850029/' }], reviewed: '2026-09-12'
  },
  {
    id: 'life-board-boundary', title: 'Life Board is a design demonstration',
    category: 'Design boundary', setting: 'Fasolati product-design rule',
    statement: 'The demonstration uses authored fictional observations to show change, missingness and disagreement across separate oral, gut and host-response channels.',
    boundary: 'It is not a live assay, clinical decision system, validated disease-risk score, patient record or completed clinical study.',
    next: 'Test whether reviewers understand the separation between observation, interpretation and the next question before considering clinical evaluation.',
    sources: [], reviewed: '2026-09-13'
  },
  {
    id: 'product-specific-evidence', title: 'Product claims require product-specific support',
    category: 'Design boundary', setting: 'Fasolati editorial rule',
    statement: 'Finished-product identity, current labeling, formulation and intended use must be verified before product-specific efficacy language or purchase instructions are added to the dossier.',
    boundary: 'An ingredient paper, periodontal-treatment trial or OMV mechanism study cannot be relabeled as a clinical result for Loria. A related brand is not evidence that two products have the same formulation.',
    next: 'Obtain approved product assets and source documents; have the responsible product and scientific reviewers approve the resulting dossier.',
    sources: [], reviewed: '2026-09-13'
  }
];

export const REVISIONS = [
  {
    id: 'exposure-route-2026-09-12', date: '2026-09-12', claimId: 'endothelial-barrier',
    title: 'Made the exposure route explicit',
    before: 'The summary described endothelial-barrier disruption without naming the zebrafish exposure route.',
    after: 'The summary now states that the zebrafish experiments used direct systemic injection, not oral exposure.',
    reason: 'Prevent a model-delivery experiment from reading as a demonstrated natural oral-to-systemic route.'
  },
  {
    id: 'hepatic-setting-2026-09-12', date: '2026-09-12', claimId: 'hepatic-insulin-signaling',
    title: 'Separated animal and cell findings',
    before: 'The summary grouped liver translocation, signaling and glycogen synthesis as effects in experimental systems.',
    after: 'Mouse liver translocation and glycogen findings are separated from the HepG2 insulin-signaling experiment.',
    reason: 'Readers should be able to tell which experimental system supports each statement.'
  },
  {
    id: 'foma-identity-2026-09-12', date: '2026-09-12', claimId: 'fusobacterium-tissue-interactions',
    title: 'Narrowed the human-tissue statement',
    before: 'The summary described EV enrichment in clinical colorectal-cancer tissue.',
    after: 'The summary specifies five paired samples and greater FomA signal in EV-enriched tumor fractions, with a non-exclusive-marker caveat.',
    reason: 'Distinguish observed signal, the authors’ interpretation and separate model experiments.'
  },
  {
    id: 'glycemic-context-2026-09-12', date: '2026-09-12', claimId: 'human-glycemic-control',
    title: 'Restored the clinical comparison and uncertainty',
    before: 'The clinical summary gave the average HbA1c reduction, population and time point without the comparator or confidence interval.',
    after: 'The wording includes no active treatment or usual care as the comparator and the 95% confidence interval.',
    reason: 'A treatment effect should travel with the comparison and its uncertainty.'
  },
  {
    id: 'crp-duration-2026-09-12', date: '2026-09-12', claimId: 'human-crp',
    title: 'Added follow-up limits to the CRP result',
    before: 'The summary described lower CRP with heterogeneity but did not specify the six-month result.',
    after: 'The summary separates the six-month result from the smaller, limited longer-term analysis.',
    reason: 'Avoid implying a demonstrated durable effect across follow-up periods.'
  }
];
