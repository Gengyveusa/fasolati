/**
 * The Fasolati product catalogue.
 *
 * One source for the shop index, the individual product pages, and the
 * Product/Offer schema on each. Before this, the products existed only as
 * markup inside a shop overlay panel that shared a single URL — so nothing
 * could be linked, advertised, or cited on its own, and Loria, the only
 * revenue-generating product in the portfolio, was invisible to every
 * product-aware surface.
 *
 * ACCURACY RULES — these markup claims are commercial statements:
 *   • `availability` is emitted as schema.org only when the item is genuinely
 *     purchasable. "Coming soon" and "waitlist" get no Offer at all, because
 *     an Offer asserts something is on sale.
 *   • No price appears anywhere on the site, so no price is asserted here.
 *     Inventing one to win a rich result would be a lie about a medical
 *     product.
 *   • Copy is carried over verbatim from the shop panel. Rewriting for the
 *     consumer register is a separate pass, deliberately not mixed with the
 *     move to real URLs.
 */

export type Availability = 'available' | 'coming-soon' | 'waitlist' | 'beta';

export type Product = {
  /** Permanent URL segment — /loria/, /lytica/. Never rename once shipped. */
  slug: string;
  name: string;
  /** Short label used on cards and in nav. */
  shortName: string;
  status: string;
  availability: Availability;
  /** One line. Used as the card blurb and the meta description seed. */
  tagline: string;
  /** The full description as it appears on the shop panel. */
  body: string;
  /** Spec rows, rendered as a definition list. */
  specs?: { label: string; value: string }[];
  /**
   * Call to action on the product page.
   *
   * `href` means "this is a link somewhere real"; its absence means the CTA is
   * the waitlist form. Loria's Order button was `href="#"` on the live site —
   * a dead link on the only product that is actually for sale. It points at
   * the contact form until a storefront URL exists; that is a holding pattern,
   * not a destination, and it is the one thing standing between the InStock
   * Offer below and a genuinely purchasable product.
   */
  cta: { label: string; note?: string; href?: string };
  /** schema.org type — most are Product; the Engine is software. */
  schemaType: 'Product' | 'SoftwareApplication';
  category: string;
  /** Palette variable the product is identified by across the site. */
  accent: string;
};

export const PRODUCTS: Product[] = [
  {
    slug: 'loria',
    accent: 'var(--loria)',
    name: 'Loria™ Daily Oral Rinse',
    shortName: 'Loria',
    status: 'Available Now',
    availability: 'available',
    tagline:
      'The original Fasolati oral formulation. Barrier, heal, hydrate, hold — every day.',
    body:
      'Dual-weight hyaluronic acid mucosal barrier system. Replaces chlorhexidine with intelligent ecological remodeling. High MW HA blocks bacterial adhesion while low MW HA stimulates fibroblast proliferation and accelerates wound healing. Bio-adhesive film ensures hours of therapeutic residence — not the 30 seconds of a standard rinse.',
    specs: [
      { label: 'Format', value: '240mL bottle · 30-day supply' },
      { label: 'Use', value: 'Twice daily · Rinse 60 seconds' },
      { label: 'Key Actives', value: 'Dual-weight HA · Castor oil · CPC · Pullulan' },
    ],
    cta: {
      label: 'Order Loria™',
      note: 'Free shipping on subscription · Cancel anytime',
      href: '/partner/',
    },
    schemaType: 'Product',
    category: 'Oral care',
  },
  {
    slug: 'lytica',
    accent: 'var(--lytica)',
    name: 'Lytica™ Biofilm Intervention System',
    shortName: 'Lytica',
    status: 'Coming Soon — Rx Required',
    availability: 'coming-soon',
    tagline:
      'Two-stage enzyme + phage biofilm disruption. Ask your periodontist about Lytica.',
    body:
      'Professional-dispensed tray application system. Stage 1 enzymatic matrix degradation followed by Stage 2 targeted bacteriophages. For active periodontal disease, peri-implantitis, and refractory cases. Available through the Maxoral professional channel.',
    cta: { label: 'Get Notified' },
    schemaType: 'Product',
    category: 'Professional dental therapeutics',
  },
  {
    slug: 'gut-stack',
    accent: 'var(--g)',
    name: 'Gut Restoration Stack',
    shortName: 'Gut Stack',
    status: 'Coming Soon',
    availability: 'waitlist',
    tagline: 'Magisnat · Biolumen · Monch Monch — the second origin node, addressed.',
    body:
      'Anti-inflammatory nutraceuticals, precision prebiotic fibers, and metabolic snacks designed to restore gut barrier integrity and microbiome diversity. Three products, one protocol — matched to your Fasolati Engine gut integrity score.',
    cta: { label: 'Join Waitlist' },
    schemaType: 'Product',
    category: 'Nutraceuticals',
  },
  {
    slug: 'engine',
    accent: 'var(--t)',
    name: 'Fasolati Engine Subscription',
    shortName: 'Fasolati Engine',
    status: 'Beta Access',
    availability: 'beta',
    tagline:
      'Three-vector scoring, SciAgent AI protocols, biomarker tracking — your personal inflammation operating system.',
    body:
      'Connect your labs, wearables, and oral exam data. SciAgent builds your personal inflammatory model and writes daily protocol orders. Subscription includes Engine access, protocol updates, and priority access to new products as they launch.',
    cta: { label: 'Request Beta Access' },
    schemaType: 'SoftwareApplication',
    category: 'Health software',
  },
];

export const productBySlug = Object.fromEntries(PRODUCTS.map((p) => [p.slug, p]));

/**
 * schema.org node for a product.
 *
 * Only `available` items get an `offers` block. schema.org treats an Offer as
 * an assertion that the thing is on sale; attaching one to a waitlist item
 * would misrepresent availability to every shopping and answer surface that
 * reads it.
 */
export function productSchema(p: Product, site: string) {
  const id = `${site}/${p.slug}/`;
  const base: Record<string, unknown> = {
    '@type': p.schemaType,
    '@id': `${id}#product`,
    name: p.name,
    description: p.body,
    url: id,
    brand: { '@id': `${site}/#organization` },
    publisher: { '@id': `${site}/#organization` },
  };

  if (p.schemaType === 'SoftwareApplication') {
    base.applicationCategory = 'HealthApplication';
    base.operatingSystem = 'Web';
  } else {
    base.category = p.category;
  }

  const size = p.specs?.find((s) => s.label === 'Format')?.value;
  if (size) base.size = size;

  if (p.availability === 'available') {
    base.offers = {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      url: id,
      seller: { '@id': `${site}/#organization` },
    };
  }

  return base;
}
