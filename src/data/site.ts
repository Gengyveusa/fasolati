/**
 * Site-wide identity and the schema.org nodes that every page shares.
 *
 * The Organization, Person and WebSite nodes are emitted on every page with
 * stable `@id` URIs. Those `@id`s are the join keys: a Product node on
 * /loria/ says `brand: {"@id": ".../#organization"}` and an answer engine can
 * resolve it to the full Organization description without re-reading the home
 * page. Duplicating the whole Organization on each page would work too, but
 * divergent copies of the same entity are how a knowledge graph ends up with
 * two Fasolatis.
 */

export const SITE = 'https://fasolati.life';

export const DEFAULTS = {
  title: 'Fasolati | Oral health, in the whole picture',
  description:
    'An evidence-led oral-systemic health platform in development. Explore the OMV science spine, research questions, and Life Board concept.',
  ogImage: `${SITE}/og-image.png`,
  author: 'S. Thaddeus Connelly, DDS, MD, PhD, FACS',
};

export const ORGANIZATION = {
  '@type': 'Organization',
  '@id': `${SITE}/#organization`,
  name: 'Fasolati',
  alternateName: 'Fasolati™',
  url: `${SITE}/`,
  description:
    'An oral-systemic health research and product-development program connecting oral observations, gut context, and independently measured host response.',
  slogan: 'Oral health, in the whole picture',
  founder: { '@id': `${SITE}/#founder` },
  parentOrganization: {
    '@type': 'Organization',
    name: 'GengyveUSA',
    url: 'https://gengyveusa.com/',
  },
  knowsAbout: [
    'Oral-systemic health',
    'Chronic inflammation',
    'Periodontal medicine',
    'Gut microbiome',
    'Biofilm disruption',
    'Bacterial extracellular vesicles',
  ],
};

export const FOUNDER = {
  '@type': 'Person',
  '@id': `${SITE}/#founder`,
  name: 'Stephen Thaddeus Connelly',
  alternateName: [
    'S. Thaddeus Connelly',
    'Stephen Connelly',
    'Thaddeus Connelly',
    'Thad Connelly',
  ],
  honorificSuffix: 'DDS, MD, PhD, FACS',
  jobTitle: 'Founder',
  description:
    'Oral and maxillofacial surgeon, UCSF Dental Center faculty member, and founder of Fasolati.',
  worksFor: { '@id': `${SITE}/#organization` },
  sameAs: [
    'https://www.linkedin.com/in/stephen-thaddeus-connelly-8954024b',
    'https://www.ucsfdentalcenter.org/providers/stephen-connelly-dds-md-phd',
  ],
};

export const WEBSITE = {
  '@type': 'WebSite',
  '@id': `${SITE}/#website`,
  url: `${SITE}/`,
  name: 'Fasolati',
  description:
    'Evidence-led oral-systemic health research, product programs, and the Life Board concept.',
  publisher: { '@id': `${SITE}/#organization` },
  inLanguage: 'en-US',
};

export const BASE_GRAPH = [ORGANIZATION, FOUNDER, WEBSITE];

/**
 * Breadcrumbs for a page one level below the root.
 *
 * With a single-URL site there was no hierarchy to describe. Now that there
 * is one, saying so explicitly is what puts the "Fasolati › Loria" trail under
 * a result instead of a bare URL.
 */
export function breadcrumb(name: string, path: string) {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${SITE}${path}#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Fasolati', item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name, item: `${SITE}${path}` },
    ],
  };
}
