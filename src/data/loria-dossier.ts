/**
 * Bounded, first-party source review: 2026-09-13.
 * A publisher's description is not independent verification or a finished label.
 * No Gengyve formulation, benefit, image, or direction is attributed to Loria.
 * Audit and publication gates: docs/loria-source-audit.md.
 */
export const LORIA_REVIEW = {
  date: '2026-09-13',
  displayDate: 'September 13, 2026',
  version: '01',
  inquiry: '/partner/?intent=loria-dossier#partner-form',
  checklist: '/downloads/loria-evidence-checklist.md',
};

export const LORIA_SOURCES = [
  {
    id: 'fasolati-loria',
    name: 'Fasolati · Loria product information',
    url: 'https://fasolati.life/loria/',
    kind: 'First-party product page',
    observation: 'Fasolati names “Loria™ Daily Oral Rinse” and invites requests for current formulation, labeling, purchasing information and finished-formulation evidence.',
    boundary: 'This verifies what Fasolati publishes, not the finished formula, availability or clinical performance.',
  },
  {
    id: 'gengyve-product',
    name: 'GengyveUSA · Gengyve product page',
    url: 'https://gengyveusa.com/products/gengyve',
    kind: 'Different product name',
    observation: 'GengyveUSA publishes ingredient descriptions, directions and marketing claims under the name Gengyve.',
    boundary: 'Not used as Loria formulation, labeling, imagery, evidence or purchasing information.',
  },
  {
    id: 'gengyve-professionals',
    name: 'GengyveUSA · For professionals',
    url: 'https://gengyveusa.com/pages/for-professionals',
    kind: 'Publisher’s professional information',
    observation: 'The professional page discusses Gengyve and refers to ingredient-related research.',
    boundary: 'These references have not been verified as studies of the current finished Loria product.',
  },
] as const;

export const LORIA_FIELDS = [
  {
    id: 'identity',
    title: 'Product identity',
    status: 'Published by Fasolati',
    published: true,
    description: 'The Fasolati product page names Loria™ Daily Oral Rinse.',
    request: 'For procurement, also request the responsible manufacturer, exact SKU, market and current label revision.',
    source: LORIA_SOURCES[0],
  },
  {
    id: 'formula',
    title: 'Finished formulation',
    status: 'Not yet published here',
    published: false,
    description: 'No verified, complete Loria ingredient panel is included in this dossier.',
    request: 'Request the complete ingredient declaration, relevant concentrations and a version identifier tied to the current product.',
  },
  {
    id: 'label',
    title: 'Label & directions',
    status: 'Not yet published here',
    published: false,
    description: 'This dossier does not provide a use schedule, dose, age range or safety instructions.',
    request: 'Request legible front and back labels, directions, warnings, intended users, storage information and expiry details.',
  },
  {
    id: 'evidence',
    title: 'Finished-product evidence',
    status: 'Not yet published here',
    published: false,
    description: 'No verified Loria finished-product study is included in this dossier.',
    request: 'Request the full report, exact formulation tested, population, comparator, endpoints, duration and adverse-event findings.',
  },
  {
    id: 'packaging',
    title: 'Product photography',
    status: 'Awaiting verified assets',
    published: false,
    description: 'No product photograph is presented as Loria packaging.',
    request: 'Supply original photographs of the exact Loria SKU, readable label views, image ownership permission and capture date.',
  },
  {
    id: 'market',
    title: 'Market & purchasing',
    status: 'Confirm directly',
    published: false,
    description: 'This dossier makes no claim about stock, price, distribution or regulatory status.',
    request: 'Ask for market-specific classification and supporting records, current ordering terms and dated availability confirmation.',
  },
] as const;

export const LORIA_ASSET_REQUIREMENTS = [
  {
    title: 'The exact pack',
    body: 'Original front, back and side photographs of the Loria-labeled SKU. Include a readable close-up of every label panel, pack size, version/date and permission to publish.',
  },
  {
    title: 'The controlled label',
    body: 'A dated, approved label file with the complete ingredient declaration, directions, warnings, intended users and responsible manufacturer. Confirm the market to which it applies.',
  },
  {
    title: 'The evidence trail',
    body: 'Full finished-product reports and the formula version each tested. Provide a claim-to-report mapping; keep ingredient papers in a separate background folder.',
  },
  {
    title: 'Any identity bridge',
    body: 'If Gengyve materials are proposed for Loria, provide a signed, dated manufacturer statement linking the exact products, formula versions and markets. Shared ownership alone is not the bridge.',
  },
] as const;
