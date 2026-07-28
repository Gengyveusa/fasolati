/**
 * The navigation model.
 *
 * Previously the nav was hand-written markup where every entry carried a
 * `data-open-products` / `data-open-bb` / `data-open-shop` attribute and JS
 * pushed a full-screen overlay over the single page. Nothing in the nav was a
 * link, so nothing in it could be followed by a crawler, bookmarked, shared,
 * or opened in a new tab.
 *
 * Every entry is now an href. Same menu, same wording, same grouping — the
 * difference is that each destination has an address.
 *
 * Hash targets (`/#s2`) point at the sections that remain on the home page.
 * They resolve from any page because they are absolute paths, and the browser
 * scrolls them smoothly on its own via `html{scroll-behavior:smooth}` — which
 * is why the old `data-scroll` JS is gone rather than ported.
 */

export type NavLink = {
  label: string;
  desc: string;
  href: string;
  /** Inline colour for the title, matching the original palette cues. */
  color?: string;
  external?: boolean;
};

export type NavGroup = {
  /** Section heading inside a dropdown, e.g. "Oral Therapeutics". */
  tag?: string;
  items: NavLink[];
};

export type NavMenu = {
  id: string;
  label: string;
  /** Narrower panels for the short menus, as before. */
  minWidth?: string;
  groups: NavGroup[];
};

/** Long-form documents that live off-site. Referenced from several menus. */
export const DEEP_DIVE =
  'https://claude.ai/public/artifacts/fddec7f6-4bf5-4888-b8a3-89bd80287d18';
export const ENGINE_UI =
  'https://claude.ai/public/artifacts/4bb92b11-5a4b-4fb9-bd72-46cab7f1b752';

export const NAV: NavMenu[] = [
  {
    id: 'problem',
    label: 'Problem',
    groups: [
      {
        items: [
          {
            label: 'The Inflammation Case',
            desc: '3 in 5 deaths trace to chronic inflammation',
            href: '/#s1',
          },
          {
            label: 'Inside the Black Box',
            desc: 'How SciAgent AI works, learns, and verifies',
            href: '/science/',
            color: 'var(--t)',
          },
          {
            label: 'Systemic Health Framework',
            desc: 'The full 5-node framework with clinical depth',
            href: '/#framework',
          },
        ],
      },
      {
        items: [
          {
            label: 'Origin Node: The Mouth',
            desc: 'Periodontal pocket as systemic portal of entry',
            href: '/#s2',
          },
          {
            label: 'Origin Node: The Gut',
            desc: 'Barrier failure, LPS translocation, neurodegeneration',
            href: '/#s3',
          },
        ],
      },
    ],
  },
  {
    id: 'solutions',
    label: 'Solutions',
    groups: [
      {
        tag: 'Oral Therapeutics',
        items: [
          {
            label: 'Lytica™',
            desc: 'Enzyme + phage biofilm intervention',
            href: '/lytica/',
            color: 'var(--lytica)',
          },
          {
            label: 'Loria™',
            desc: 'Dual-weight HA mucosal barrier system',
            href: '/loria/',
            color: 'var(--loria)',
          },
        ],
      },
      {
        tag: 'Gut Restoration',
        items: [
          {
            label: 'Magisnat · Biolumen · Monch Monch',
            desc: 'Anti-inflammatory nutraceuticals, prebiotics, metabolic snacks',
            href: '/gut-stack/',
            color: 'var(--g)',
          },
        ],
      },
      {
        tag: 'Platform',
        items: [
          {
            label: 'Fasolati Engine',
            desc: 'Three-vector scoring + SciAgent AI protocols',
            href: '/engine/',
          },
        ],
      },
    ],
  },
  {
    id: 'science',
    label: 'Science',
    groups: [
      {
        items: [
          {
            label: 'The Therapeutic Platform',
            desc: 'Three product lines, three mechanisms, one architecture',
            href: '/platform/',
          },
          {
            label: 'Biofilm Science',
            desc: 'Enzymatic disruption, phage targeting, EPS matrix',
            href: '/lytica/',
          },
          {
            label: 'Fasolati Deep Dive',
            desc: 'Comprehensive technical overview of the platform',
            href: DEEP_DIVE,
            external: true,
          },
        ],
      },
      {
        items: [
          {
            label: 'Inflammation Thesis',
            desc: 'hs-CRP, the 3-in-5 statistic, origin node theory',
            href: '/#s1',
          },
        ],
      },
    ],
  },
  {
    id: 'clinicians',
    label: 'For Clinicians',
    groups: [
      {
        items: [
          {
            label: 'Maxoral™ Professional Line',
            desc: 'Rx-grade formulations for in-office application',
            href: '/lytica/',
            color: 'var(--maxoral)',
          },
          {
            label: 'Launch Engine UI',
            desc: 'Biomarker dashboard and protocol management',
            href: ENGINE_UI,
            external: true,
          },
        ],
      },
      {
        items: [
          {
            label: 'Pilot Program',
            desc: 'Wire oral exams + gut protocols into one engine',
            href: '/partner/',
          },
          {
            label: 'Distribution & Channels',
            desc: 'DSO integration, Henry Schein, Patterson, Benco',
            href: '/platform/#p-fasolati-tier',
          },
        ],
      },
    ],
  },
  {
    id: 'resources',
    label: 'Resources',
    groups: [
      {
        items: [
          {
            label: 'Deep Dive Document',
            desc: 'Full technical and business overview',
            href: DEEP_DIVE,
            external: true,
          },
          {
            label: 'Fasolati Engine UI',
            desc: 'Interactive health dashboard prototype',
            href: ENGINE_UI,
            external: true,
          },
        ],
      },
      {
        items: [
          {
            label: 'Node Network Map',
            desc: 'The full product and data architecture',
            href: '/#s5',
          },
          {
            label: 'Framework Explorer',
            desc: 'Interactive collapsible mind map',
            href: '/#framework',
          },
        ],
      },
    ],
  },
  {
    id: 'affiliate',
    label: 'Affiliate',
    groups: [
      {
        items: [
          {
            label: 'Partner Program',
            desc: 'Earn commissions on Fasolati ecosystem referrals',
            href: '/partner/',
          },
          {
            label: 'For Investors',
            desc: 'Scale the node network across chronic disease prevention',
            href: '/partner/',
          },
        ],
      },
      {
        items: [
          {
            label: 'DSO Partnerships',
            desc: 'Integrate the therapeutic cascade into your practice network',
            href: '/partner/',
          },
        ],
      },
    ],
  },
  {
    id: 'shop',
    label: 'Shop',
    minWidth: '220px',
    groups: [
      {
        items: [
          {
            label: 'Loria™ Daily Rinse',
            desc: '● Available now — order or subscribe',
            href: '/loria/',
            color: 'var(--loria)',
          },
        ],
      },
      {
        items: [
          {
            label: 'Lytica™ · Gut Stack',
            desc: 'Coming soon — join the waitlist',
            href: '/shop/',
          },
          {
            label: 'Fasolati Engine',
            desc: 'Beta access — request invite',
            href: '/engine/',
          },
        ],
      },
    ],
  },
  {
    id: 'about',
    label: 'About',
    minWidth: '220px',
    groups: [
      {
        items: [
          {
            label: 'Our Story',
            desc: 'From the OR to the operating system',
            href: '/about/#origin',
          },
          {
            label: 'Mission & Vision',
            desc: 'Make inflammation visible and preventable',
            href: '/about/#mission',
          },
          {
            label: 'Timeline',
            desc: '2006 → 2026 and beyond',
            href: '/about/#milestones',
          },
        ],
      },
      {
        items: [
          {
            label: 'Contact',
            desc: 'Clinicians, researchers, partners, investors',
            href: '/partner/',
          },
        ],
      },
    ],
  },
];

/** The full-screen hamburger menu — two columns, as before. */
export const MENU_COLUMNS: { label: string; className: string; items: NavLink[] }[] = [
  {
    label: 'Products & Platform',
    className: 'tn',
    items: [
      {
        label: 'Professional Products',
        desc: 'Lytica, Loria — clinician-grade oral therapeutics',
        href: '/platform/',
      },
      {
        label: 'Everyday Home Products',
        desc: 'OTC-grade daily maintenance for mouth and gut health',
        href: '/shop/',
      },
      {
        label: 'Health Dashboard',
        desc: 'Biomarker tracking, three-vector scoring, and SciAgent',
        href: '/engine/',
      },
      {
        label: 'Launch Engine UI',
        desc: 'Open the interactive Fasolati Engine interface',
        href: ENGINE_UI,
        external: true,
      },
    ],
  },
  {
    label: 'Learn & Connect',
    className: 'gn',
    items: [
      {
        label: 'Inside the Black Box',
        desc: 'How SciAgent AI works, learns, and verifies — transparency for patients',
        href: '/science/',
      },
      {
        label: 'Node Network',
        desc: 'Full map of the Fasolati product and data architecture',
        href: '/#s5',
      },
      {
        label: 'Deep Dive',
        desc: 'Comprehensive Fasolati technical overview',
        href: DEEP_DIVE,
        external: true,
      },
      {
        label: 'Partner With Us',
        desc: 'For clinicians, researchers, strategic partners, and investors',
        href: '/partner/',
      },
    ],
  },
];
