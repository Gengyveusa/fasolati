import { MECHANISMS } from './science';

function research(id: string) {
  const entry = MECHANISMS.find((mechanism) => mechanism.id === id);
  if (!entry) throw new Error(`Unknown pathway evidence: ${id}`);
  return entry;
}

export const PATHWAY = {
  title: 'Mouth-to-whole-body pathway',
  description:
    'Five questions, not five proven causal links. Inspect the experimental evidence at each stage, then the missing bridge to an individual human claim.',
  scope:
    'Selected studies from the Fasolati science spine, not a systematic review. Model findings, human tissue observations, and proposed clinical uses remain separate.',
  solidLegend: 'Solid evidence markers: a reported finding in the stated study setting.',
  dashedLegend: 'Dashed connections: open human attribution or validation questions.',
};

export const PATHWAY_STAGES = [
  {
    id: 'source-ecology',
    label: 'Source ecology',
    question: 'Which source?',
    shortLabel: 'Organism comparisons',
    title: 'Start with the source. Do not assume it.',
    framing:
      'The source question asks which organisms and local conditions belong in the record. Here, the published comparison is between vesicles from different periodontal organisms—not a personal oral-to-systemic source trace.',
    support: 'Mechanistic assays',
    evidenceIds: ['innate-immune-activation'],
    humanQuestion:
      'How would material from an oral source be distinguished from gut and other competing sources in the relevant person and compartment?',
    gate:
      'Proposed research gate: test source attribution rather than infer it from an organism’s name or a local oral measurement.',
    scienceAnchor: 'experiments',
    scienceLabel: 'Source before systemic attribution',
    bridge: {
      to: 'Released material',
      question: 'Which source produced the material that was actually measured?',
    },
  },
  {
    id: 'released-material',
    label: 'Released material',
    question: 'Which material?',
    shortLabel: 'Cargo experiments',
    title: 'The preparation matters as much as the label.',
    framing:
      'The cited experiments ask about particular vesicle preparations and cargo contributions. They do not justify treating every local activity signal as the same material or the same mechanism.',
    support: 'Cells + animal experiments',
    evidenceIds: ['endothelial-barrier', 'vesicular-rna'],
    humanQuestion:
      'Is the activity attributable to characterized vesicles, their cargo, or material carried alongside them in the preparation?',
    gate:
      'Proposed research gate: compare characterized enriched and depleted fractions, with cargo-specific and interference controls.',
    scienceAnchor: 'measurement',
    scienceLabel: 'Identity before interpretation',
    bridge: {
      to: 'Exposure route',
      question: 'Does the characterized material reach a relevant compartment and remain active?',
    },
  },
  {
    id: 'exposure-route',
    label: 'Exposure route',
    question: 'Which route?',
    shortLabel: 'Delivery experiments',
    title: 'How it gets there changes the question.',
    framing:
      'Intracardiac injection and oral gavage are different experimental routes. The route and dose stay attached to the finding; neither can silently become an ordinary human oral exposure.',
    support: 'Cells + mouse delivery',
    evidenceIds: ['vesicular-rna', 'neuroinflammatory-responses'],
    humanQuestion:
      'What reaches the relevant human compartment after natural oral exposure, at what dose, and with what evidence of its source?',
    gate:
      'Proposed research gate: establish delivered exposure separately from the material measured in a local sample.',
    scienceAnchor: 'measurement',
    scienceLabel: 'A local sample is not delivered exposure',
    bridge: {
      to: 'Host response',
      question: 'Can the response be linked to that exposure rather than an unmeasured alternative?',
    },
  },
  {
    id: 'host-response',
    label: 'Host response',
    question: 'Which response?',
    shortLabel: 'Response experiments',
    title: 'A specific response. Not a universal score.',
    framing:
      'The cited studies examine endothelial-barrier and hepatic insulin-signaling responses in their own experimental settings. These are distinct outcomes, not interchangeable measures of a person’s whole-body health.',
    support: 'Cells + zebrafish + mice',
    evidenceIds: ['endothelial-barrier', 'hepatic-insulin-signaling'],
    humanQuestion:
      'Was the host response measured independently, and does the proposed exposure explain it better than competing explanations?',
    gate:
      'Proposed research gate: keep local observations and host responses separate, including when their directions disagree.',
    scienceAnchor: 'life-board',
    scienceLabel: 'Separate channels, visible disagreement',
    bridge: {
      to: 'Clinical translation',
      question: 'Would this information improve a defined decision beyond ordinary clinical measures?',
    },
  },
  {
    id: 'clinical-translation',
    label: 'Clinical translation',
    question: 'Which decision?',
    shortLabel: 'The human bridge',
    title: 'A human observation is not yet a useful test.',
    framing:
      'The tissue study below contains human observations and separate model experiments. Keep those evidence types apart before considering an oral-source claim, a prediction, or a clinical decision.',
    support: 'Human tissue + models',
    evidenceIds: ['fusobacterium-tissue-interactions'],
    humanQuestion:
      'Would a prospectively validated measurement add useful information—and would acting on it improve outcomes compared with the alternatives?',
    gate:
      'Proposed research gate: establish analytical validity, incremental predictive value, and clinical utility separately. This map is not a validated diagnostic or personal-risk tool.',
    scienceAnchor: 'experiments',
    scienceLabel: 'Incremental value and utility before routine use',
    bridge: null,
  },
].map((stage) => ({
  ...stage,
  evidence: stage.evidenceIds.map(research),
}));
