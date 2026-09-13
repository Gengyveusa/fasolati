/** Shared destinations for the desktop dropdowns and mobile menu. */
export type NavLink = {
  label: string;
  desc: string;
  href: string;
  color?: string;
  external?: boolean;
};

export type NavGroup = { tag?: string; items: NavLink[] };
export type NavMenu = {
  id: string;
  label: string;
  minWidth?: string;
  groups: NavGroup[];
};

const explore: NavLink[] = [
  { label: 'The Fasolati Framework', desc: 'Oral, gut and systemic research directions', href: '/#framework' },
  { label: 'The Question', desc: 'What could better measurement help us decide?', href: '/#s1' },
  { label: 'Oral Health', desc: 'The oral research starting point', href: '/#s2', color: 'var(--t)' },
  { label: 'Gut Health', desc: 'A complementary research channel', href: '/#s3', color: 'var(--g)' },
];

const science: NavLink[] = [
  { label: 'Science Spine', desc: 'Evidence, limitations and the research plan', href: '/science/', color: 'var(--t)' },
  { label: 'Pathway Explorer', desc: 'Inspect each connection and its missing bridge', href: '/pathway/' },
  { label: 'Evidence Ledger', desc: 'Claims, sources, limits and revision history', href: '/evidence/' },
  { label: 'Biological Mapping', desc: 'Mechanisms and their interpretation boundaries', href: '/science/#mapping' },
  { label: 'Human Evidence', desc: 'What human studies do and do not establish', href: '/science/#human-evidence' },
  { label: 'Measurement & Experiments', desc: 'The validation work proposed next', href: '/science/#measurement' },
];

const products: NavLink[] = [
  { label: 'Loria™', desc: 'Product information and inquiries', href: '/loria/', color: 'var(--loria)' },
  { label: 'Loria Dossier', desc: 'Product identity, evidence and open questions', href: '/loria-dossier/' },
  { label: 'Lytica™', desc: 'Oral biofilm development concept', href: '/lytica/', color: 'var(--lytica)' },
  { label: 'Gut Stack', desc: 'Gut-health research and development', href: '/gut-stack/', color: 'var(--g)' },
  { label: 'All Products & Concepts', desc: 'Explore the portfolio and ask a question', href: '/shop/' },
];

const engine: NavLink[] = [
  { label: 'Fasolati Engine', desc: 'Life Board development, not a live clinical service', href: '/engine/', color: 'var(--t)' },
  { label: 'The Life Board Approach', desc: 'Change, confidence and the next justified step', href: '/science/#life-board' },
  { label: 'Platform Overview', desc: 'Products, concepts and evidence gates', href: '/platform/' },
  { label: 'Guided Life Board', desc: 'Walk through a fictional case over time', href: '/life-board/' },
];

const connect: NavLink[] = [
  { label: 'About Fasolati', desc: 'The founder and the purpose', href: '/about/' },
  { label: 'Clinician Design Partners', desc: 'Review the concept using fictional cases', href: '/design-partners/' },
  { label: 'Partner With Us', desc: 'Clinical, research and business inquiries', href: '/partner/' },
  { label: 'Product Questions', desc: 'Ask about Loria or a development concept', href: '/partner/#partner-form' },
];

export const NAV: NavMenu[] = [
  { id: 'explore', label: 'Explore', groups: [{ items: explore }] },
  { id: 'science', label: 'Science', groups: [{ items: science }] },
  { id: 'products', label: 'Products', groups: [{ items: products }] },
  { id: 'engine', label: 'Life Board', groups: [{ items: engine }] },
  { id: 'connect', label: 'Connect', minWidth: '240px', groups: [{ items: connect }] },
];

export const MENU_COLUMNS: { label: string; className: string; items: NavLink[] }[] = [
  { label: 'Products & Platform', className: 'tn', items: [...products, engine[3], engine[0], engine[2]] },
  { label: 'Learn & Connect', className: 'gn', items: [explore[0], science[0], science[1], science[2], ...connect] },
];
