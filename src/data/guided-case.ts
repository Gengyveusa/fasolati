import { MECHANISMS } from './science';

function research(id: string) {
  const entry = MECHANISMS.find((mechanism) => mechanism.id === id);
  if (!entry) throw new Error(`Unknown guided-case evidence: ${id}`);
  return entry;
}

export const GUIDED_CASE = {
  name: 'Case A',
  label: 'Entirely fictional · Educational design example',
  description:
    'One invented sequence, four visits. Follow the oral observations, keep gut context separate, and ask what the host observations actually allow you to say.',
  disclaimer:
    'Every visit, observation, and interpretation in this case is fictional. These are not patient data, assay results, or medical recommendations. The published research is real and is identified separately; it neither contains nor validates this case.',
  privacy:
    'This demonstration accepts no health information. It sends and stores no case inputs, makes no clinical predictions, and uses no live AI or external API.',
};

export const GUIDED_STAGES = [
  {
    id: 'initial-observation',
    label: 'Initial observation',
    time: 'Opening visit',
    title: 'A starting point. Not a trend.',
    status: 'Baseline only',
    story:
      'The fictional record opens with an oral research sample and a separate host observation. There is no earlier visit to compare with, and no gut observation has been collected.',
    channels: [
      {
        id: 'oral',
        name: 'Oral',
        status: 'One local observation',
        observation:
          'An authored oral activity readout is recorded as the starting point. It has no numerical value or clinical threshold.',
        comparison: 'No earlier comparable oral observation.',
      },
      {
        id: 'gut',
        name: 'Gut',
        status: 'Not measured',
        observation:
          'The fictional record contains no gut sample or gut-source measurement.',
        comparison: 'An absent observation is not a negative result.',
      },
      {
        id: 'host',
        name: 'Host response',
        status: 'Recorded independently',
        observation:
          'A separate, qualitative host observation is present. It is not calculated from the oral readout.',
        comparison: 'No earlier host observation and no established source link.',
      },
    ],
    interpretation:
      'This visit can establish the structure of a record, not a direction of change. Keeping the oral and host observations side by side does not connect them causally.',
    retained: 'The opening observations stay visible as a reference, not a verdict.',
    withheld: 'No trend, no systemic-load estimate, and no personal-risk score.',
    nextQuestion:
      'Could a repeat sample be collected and characterized under comparable conditions, with the host observation recorded separately?',
    whyNot:
      'A single authored observation cannot support a longitudinal claim. The experimental paper below tests a biological response under specified conditions; it does not turn this invented local observation into a measurement of exposure elsewhere in a person.',
    researchIds: ['innate-immune-activation'],
    scienceAnchor: 'measurement',
    scienceLabel: 'What a measurement would need to establish',
  },
  {
    id: 'follow-up',
    label: 'Follow-up',
    time: 'First repeat visit',
    title: 'A local change stays local.',
    status: 'Comparison, not attribution',
    story:
      'At the first fictional follow-up, the oral readout is described as lower than at the opening visit. The separately recorded host observation has no corresponding shift. Gut information is still absent.',
    channels: [
      {
        id: 'oral',
        name: 'Oral',
        status: 'Lower in the narrative',
        observation:
          'The authored local readout is lower than at the opening visit. This is an invented qualitative comparison, not a measured treatment effect.',
        comparison:
          'Comparable collection is assumed for the story, not demonstrated by an assay.',
      },
      {
        id: 'gut',
        name: 'Gut',
        status: 'Still not measured',
        observation:
          'No new gut observation has been added. The oral result does not fill this channel.',
        comparison: 'There is still no gut comparison.',
      },
      {
        id: 'host',
        name: 'Host response',
        status: 'No corresponding shift',
        observation:
          'The independent host observation is described as unchanged relative to the opening visit.',
        comparison: 'The two channels do not show a shared direction of change.',
      },
    ],
    interpretation:
      'The fictional record supports the sentence “the local observation changed.” It does not support “whole-body health improved” or “a product worked.” No intervention has been assigned or tested in this case.',
    retained: 'A qualitative oral comparison, with the host observation kept separate.',
    withheld: 'No treatment effect, organ benefit, or systemic improvement claim.',
    nextQuestion:
      'Would the local difference survive repeat collection, preparation controls, and interference checks before any biological interpretation?',
    whyNot:
      'Even if this were a real, repeatable local change, the story supplies no transported-exposure measurement and no controlled intervention. The liver experiment below cannot be used to convert this invented oral change into a human metabolic benefit.',
    researchIds: ['hepatic-insulin-signaling'],
    scienceAnchor: 'experiments',
    scienceLabel: 'The proposed gates before an efficacy claim',
  },
  {
    id: 'discordance',
    label: 'Discordance',
    time: 'Later review',
    title: 'When signals disagree, keep both.',
    status: 'Discordance retained',
    story:
      'At the next fictional visit, the oral readout remains below its opening level while the separate host observation moves upward. No gut-source information explains the difference.',
    channels: [
      {
        id: 'oral',
        name: 'Oral',
        status: 'Still below the starting point',
        observation:
          'The authored oral readout remains lower than at the opening visit, without another clear local shift.',
        comparison: 'Its local direction is retained, not labeled “healthy.”',
      },
      {
        id: 'gut',
        name: 'Gut',
        status: 'Source question unresolved',
        observation:
          'There is still no gut observation. The story does not assign the host change to the gut by elimination.',
        comparison: 'Unmeasured is neither excluded nor established.',
      },
      {
        id: 'host',
        name: 'Host response',
        status: 'Different direction',
        observation:
          'The separate, authored host readout moves upward. No disease meaning or clinical threshold is attached to that direction.',
        comparison: 'It does not track the lower local oral readout.',
      },
    ],
    interpretation:
      'The mismatch is the point of this visit. The board retains both observations and leaves their relationship unresolved. It does not average them into a reassuring number or invent a cause for the host change.',
    retained: 'The disagreement itself, plus the original observations and their limits.',
    withheld: 'No blended score and no assignment of the host change to an oral or gut source.',
    nextQuestion:
      'Are timing and measurement comparable, and what independently observed context would be needed to investigate the discordance?',
    whyNot:
      'The direction of two fictional readouts cannot identify an exposure source. A barrier response in experimental cells or zebrafish is a separate piece of evidence, not a rule that every lower oral observation must produce a lower host response.',
    researchIds: ['endothelial-barrier'],
    scienceAnchor: 'life-board',
    scienceLabel: 'Why the Life Board keeps discordance visible',
  },
  {
    id: 'missing-data',
    label: 'Missing data',
    time: 'Incomplete follow-up',
    title: 'An honest blank is information.',
    status: 'Current trend unavailable',
    story:
      'The final fictional visit has no usable new oral sample and no current host observation. The earlier visits remain part of the record, but neither is carried forward as a new result.',
    channels: [
      {
        id: 'oral',
        name: 'Oral',
        status: 'No usable current sample',
        observation:
          'The new fictional oral collection is unusable. Its result is left blank rather than estimated from the preceding visits.',
        comparison: 'The prior local observation is historical, not current.',
      },
      {
        id: 'gut',
        name: 'Gut',
        status: 'Never measured in this case',
        observation:
          'The gut channel remains explicitly unobserved across the whole sequence.',
        comparison: 'No gut trajectory can be constructed.',
      },
      {
        id: 'host',
        name: 'Host response',
        status: 'No current observation',
        observation:
          'The record contains no new host observation for this visit. The earlier discordance has not been resolved.',
        comparison: 'No current oral–host comparison is possible.',
      },
    ],
    interpretation:
      'There is no defensible update for this visit. The earlier record is retained, the current gap is explicit, and the sequence ends without a manufactured recovery or conclusion.',
    retained: 'The last documented fictional observations, clearly dated to earlier visits.',
    withheld: 'No imputed value, automatic trend continuation, or “all clear.”',
    nextQuestion:
      'What valid, comparable observations would be required to reopen the comparison? The demonstration stops here; it does not order tests or treatment.',
    whyNot:
      'Missing observations cannot be supplied by an explanation, a model, or an unrelated experiment. The source below illustrates a different missing link: experimental delivery by injection is not evidence of natural transit from the mouth.',
    researchIds: ['vesicular-rna'],
    scienceAnchor: 'measurement',
    scienceLabel: 'Why an explanation cannot supply a missing measurement',
  },
].map((stage) => ({
  ...stage,
  evidence: stage.researchIds.map(research),
}));

/** A static, authored text export. No user values or runtime generation. */
export const GUIDED_NARRATIVE = [
  'FASOLATI — THE GUIDED LIFE BOARD',
  GUIDED_CASE.label,
  GUIDED_CASE.disclaimer,
  GUIDED_CASE.privacy,
  ...GUIDED_STAGES.flatMap((stage, index) => [
    '',
    `FICTIONAL VISIT ${index + 1}: ${stage.label.toUpperCase()}`,
    `${stage.time} — ${stage.title}`,
    stage.story,
    ...stage.channels.flatMap((channel) => [
      `${channel.name}: ${channel.status}. ${channel.observation}`,
      `Comparison limit: ${channel.comparison}`,
    ]),
    `Fictional interpretation: ${stage.interpretation}`,
    `Retained: ${stage.retained}`,
    `Withheld: ${stage.withheld}`,
    `Next research question, not a care instruction: ${stage.nextQuestion}`,
    `Why no stronger conclusion: ${stage.whyNot}`,
    'ORIGINAL RESEARCH — SEPARATE FROM THE FICTIONAL CASE',
    ...stage.evidence.flatMap((entry) => [
      `${entry.source}. Experimental setting: ${entry.setting}.`,
      entry.finding,
      `Boundary: ${entry.boundary}`,
      entry.url,
      ...(entry.boundaryUrl ? [entry.boundaryUrl] : []),
    ]),
    `Fasolati research framework: https://fasolati.life/science/#${stage.scienceAnchor}`,
  ]),
  '',
  'Educational design example only. No patient data. No diagnosis. No personal-risk score.',
].join('\n\n');
