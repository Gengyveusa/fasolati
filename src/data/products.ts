/**
 * Product information and development concepts, shared by the portfolio and
 * individual pages. Status describes the page's purpose, not inventory.
 * No prices, offers, subscriptions or operational software are asserted.
 */
export type Product = {
  slug: string;
  name: string;
  shortName: string;
  status: string;
  stage: 'information' | 'development' | 'research';
  tagline: string;
  body: string;
  specs?: { label: string; value: string }[];
  cta: { label: string; note?: string; href?: string };
  accent: string;
};

export const PRODUCTS: Product[] = [
  {
    slug: 'loria',
    accent: 'var(--loria)',
    name: 'Loria™ Daily Oral Rinse',
    shortName: 'Loria',
    status: 'Product Information',
    stage: 'information',
    tagline: 'Daily oral care within the Fasolati vision.',
    body:
      'Request current product details, labeling and purchasing information for Loria. Product-specific evidence should guide any use; the wider oral-systemic research program is not a claim of benefit from this rinse.',
    specs: [
      { label: 'Product Details', value: 'Ask about the current formulation, labeling and directions.' },
      { label: 'Purchasing', value: 'Contact us for current ordering information.' },
      { label: 'Evidence', value: 'Ask for evidence specific to the finished formulation and intended use.' },
    ],
    cta: {
      label: 'Ask About Loria™',
      note: 'A product-information inquiry, not an order or subscription.',
      href: '/partner/#partner-form',
    },
  },
  {
    slug: 'lytica',
    accent: 'var(--lytica)',
    name: 'Lytica™ Biofilm Intervention Concept',
    shortName: 'Lytica',
    status: 'Development Concept',
    stage: 'development',
    tagline: 'An enzyme-and-phage approach to oral biofilm, in development.',
    body:
      'Lytica is a development concept exploring a staged enzyme-and-phage approach to oral biofilm. Formulation, delivery, safety, clinical benefit and intended use still require evaluation. This is not a treatment protocol.',
    specs: [
      { label: 'Proposed Direction', value: 'Evaluate biofilm intervention as a defined, testable formulation.' },
      { label: 'Before Clinical Use', value: 'Establish safety, performance, appropriate evidence and intended-use requirements.' },
    ],
    cta: {
      label: 'Request Lytica Updates',
      note: 'An expression of interest, not a reservation or promise of access.',
    },
  },
  {
    slug: 'gut-stack',
    accent: 'var(--g)',
    name: 'Fasolati Gut Stack',
    shortName: 'Gut Stack',
    status: 'Research & Development',
    stage: 'research',
    tagline: 'A gut-health research direction, not a barrier-restoration promise.',
    body:
      'The Gut Stack explores which nutrition or microbiome interventions merit testing alongside oral and independently measured host-response channels. Components, dosing and benefits remain to be established; this is not a personalized regimen or a validated gut-integrity score.',
    specs: [
      { label: 'Research Question', value: 'When does a gut-focused intervention add meaningful benefit?' },
      { label: 'Development Standard', value: 'Define the intervention, comparator and outcome before assigning a benefit.' },
    ],
    cta: {
      label: 'Request Gut Stack Updates',
      note: 'An expression of interest, not a product order.',
    },
  },
  {
    slug: 'engine',
    accent: 'var(--t)',
    name: 'Fasolati Engine — Life Board',
    shortName: 'Fasolati Engine',
    status: 'In Development',
    stage: 'development',
    tagline: 'What changed? How confident are we? What next step is justified?',
    body:
      'The Life Board is the proposed front end of the Fasolati Engine. It is being developed to keep measurements, uncertainty and supporting evidence inspectable, with oral, gut and systemic observations shown separately. It is not a live clinical service, an autonomous prescriber or one averaged health score.',
    specs: [
      { label: 'What Changed?', value: 'Show the measured result, specimen, date and comparison—not an inferred organ score.' },
      { label: 'How Confident?', value: 'Show measurement quality, variation and missing evidence; allow “not interpretable yet.”' },
      { label: 'Next Justified Step', value: 'Explain what the evidence supports, including when professional review is appropriate.' },
    ],
    cta: {
      label: 'Request Life Board Updates',
      note: 'Development updates only; no beta access or subscription is offered here.',
    },
  },
];

export const productBySlug = Object.fromEntries(PRODUCTS.map((p) => [p.slug, p]));

/** Describe the information page, not an offer or a currently operating app. */
export function productSchema(p: Product, site: string) {
  const url = `${site}/${p.slug}/`;
  return {
    '@type': 'WebPage',
    '@id': url,
    name: p.name,
    description: `${p.status}. ${p.tagline} ${p.body}`,
    url,
    isPartOf: { '@id': `${site}/#website` },
    about: { '@id': `${site}/#organization` },
    publisher: { '@id': `${site}/#organization` },
  };
}
