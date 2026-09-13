export const MECHANISMS = [
  {
    id: 'endothelial-barrier',
    name: 'Endothelial barrier',
    route: 'P. gingivalis OMVs / gingipains → barrier effects',
    setting: 'Cells + zebrafish',
    finding: 'Wild-type and gingipain-deficient OMV comparisons supported a gingipain contribution to endothelial-barrier disruption, with PECAM-1 loss associated with the response. The zebrafish experiments used direct systemic injection, not oral exposure.',
    boundary: 'This does not calibrate an oral-rinse measurement to vascular leak, heart attack, or stroke risk in a person.',
    use: 'A candidate barrier-response benchmark, with preparation, cargo, and exposure controls.',
    source: 'Farrugia et al., 2020',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7684789/'
  },
  {
    id: 'hepatic-insulin-signaling',
    name: 'Hepatic insulin signaling',
    route: 'P. gingivalis OMVs → liver and glycogen signaling',
    setting: 'Mice + cells',
    finding: 'Seyama and colleagues reported liver translocation and reduced insulin-responsive hepatic glycogen synthesis in mice. In HepG2 cells, OMVs attenuated insulin-stimulated Akt/GSK-3β signaling in a gingipain-dependent manner.',
    boundary: 'This is not proof that a person’s glucose excursions are caused by oral vesicles, and it does not establish the same effect in muscle or adipose tissue.',
    use: 'A focused metabolic mechanism to test at exposure levels relevant to the intended human question.',
    source: 'Seyama et al., 2020',
    url: 'https://pubmed.ncbi.nlm.nih.gov/32088316/'
  },
  {
    id: 'neuroinflammatory-responses',
    name: 'Neuroinflammatory responses',
    route: 'P. gingivalis OMV exposure → brain-related phenotypes',
    setting: 'Mouse experiment',
    finding: 'Aged male mice given OMVs by oral gavage at 4 mg/kg every other day for eight weeks showed neuroinflammatory, tau-phosphorylation, and memory-task effects.',
    boundary: 'The experimental dose is not established as ordinary human exposure. This is not evidence for a personal Alzheimer’s risk meter or proof of human disease causation.',
    use: 'Retain the animal finding with its dose and route, rather than collapsing it into a mouth-to-brain prediction.',
    source: 'Gong et al., 2022',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9397999/'
  },
  {
    id: 'innate-immune-activation',
    name: 'Innate immune activation',
    route: 'Periodontal-bacterial OMVs → receptor responses',
    setting: 'Mechanistic assays',
    finding: 'Vesicles from different periodontal organisms produced different TLR2 and TLR4 response profiles under the tested conditions.',
    boundary: 'A receptor response does not identify every active ligand. Comparing species individually does not establish synergy when their vesicles are combined.',
    use: 'A panel of functional readouts with ligand-attribution and interference controls, not one universal inflammation score.',
    source: 'Cecil et al., 2016',
    url: 'https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0151967'
  },
  {
    id: 'vesicular-rna',
    name: 'Vesicular RNA',
    route: 'A. actinomycetemcomitans OMV RNA → host-cell responses',
    setting: 'Cells + mouse delivery',
    finding: 'RNA-associated inflammatory effects were studied in U937 macrophage-like cells. The mouse brain-delivery experiment used intracardiac administration, bypassing the oral barrier.',
    boundary: 'Delivery by injection does not establish natural oral escape, human brain transit, or Alzheimer’s causation.',
    use: 'Separate cargo biology from transport biology, and require the relevant route to be tested.',
    source: 'Han et al., 2019',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6894046/'
  },
  {
    id: 'fusobacterium-tissue-interactions',
    name: 'Fusobacterium and tissue interactions',
    route: 'F. nucleatum EVs / FomA → adhesion and colonization',
    setting: 'Human tissue + models',
    finding: 'In five paired colorectal-cancer and adjacent-normal tissue samples, Zheng and colleagues found greater FomA signal in tumor-derived EV-enriched fractions, interpreted as F. nucleatum EV enrichment. Separate cell and mouse experiments supported FomA-transfer effects on adhesion, colonization, and tumor progression.',
    boundary: 'FomA is not a vesicle-exclusive marker. Human tissue enrichment and model mechanisms are separate observations; they do not establish oral origin in an individual or validate an oral-rinse cancer predictor.',
    boundaryUrl: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC12003102/',
    use: 'A specific tissue-interaction hypothesis. Do not substitute whole-bacterium FadA studies for vesicle-specific FomA evidence.',
    source: 'Zheng et al., 2024',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11414721/'
  }
];
