# Fasolati build maintenance

Prepared September 12, 2026 (PDT); checks run September 13 UTC on the local `quality-pass` branch. This is engineering maintenance, not approval to publish or a clinical, privacy-law, or comprehensive security assessment.

## Dependency decision

The starting npm audit contained **six vulnerable package entries**: Astro (critical), esbuild (low), js-yaml, nanoid, sharp, and svgo (high). Those entries aggregate **18 individual advisory records**, not merely six distinct advisories. Full direct npm audit responses are retained in the QA directory as `dependency-audit-before.json`, `dependency-audit-upgrade-intermediate.json`, and `dependency-audit-after.json`.

The earlier suggestion that Astro 7.3.2 was the only possible patched version was too imprecise. The critical AVIF optimization issue affects Astro **below 7.2.8**, and its published patched version is **7.2.8**, requiring Sharp 0.35.4. The attack condition is processing an attacker-controlled AVIF image through the affected image service; this is not a demonstrated exploit of Fasolati's published static HTML. Static hosting does not, by itself, remove risks in build-time image processing. [GitHub advisory GHSA-26w7-cxv4-gfx2](https://github.com/advisories/GHSA-26w7-cxv4-gfx2).

Direct registry queries confirmed:

- The newest published Astro 5 release was 5.18.2; there was no 5.18.3.
- Astro 6 ended at 6.4.8 in the queried versions. The current advisory ranges still include both the 5 and 6 lines; refreshing only their transitive dependencies cannot clear the Astro advisory itself.
- `astro@latest` was 7.3.2, the same explicit upgrade npm audit proposed. We selected and pinned that current patch release, **not because 7.2.8 was unpatched**, but to use the current 7.x maintenance release and compatible dependencies.
- Astro 7.3.2 declares Node `>=22.12.0` and npm `>=9.6.5`. Registry responses, package integrity metadata, and the last 5/6 versions are saved in `astro-upgrade-metadata.json`, `astro-minimum-fixed.json`, `astro-5-versions.json`, and `astro-6-versions.json` under QA. The official upgrade page also identifies 7.3.2 as the latest release. [Astro upgrade guidance](https://docs.astro.build/en/upgrade-astro/).

The upgrade is explicit: `astro` 5.18.2 → **7.3.2**; `@astrojs/sitemap` remains **3.7.3**. No force upgrade, dependency overrides, audit suppression, or server adapter was added. After normal lockfile resolution, SVGO remained on vulnerable 4.0.2; `npm update svgo --package-lock-only` moved it compatibly to 4.1.0. Final resolved versions:

| Package | Final locked version |
| --- | --- |
| astro | 7.3.2 |
| esbuild | 0.28.2 |
| js-yaml | 4.3.2 |
| nanoid | 3.3.19 |
| sharp | 0.35.4 |
| svgo | 4.1.0 |

The final audit reports **0 vulnerabilities at every severity**, including development dependencies. This is a point-in-time registry result, not a guarantee of vulnerability-free software.

### Advisory detail from the starting audit

| Package | Advisory and reported affected range |
| --- | --- |
| Astro | `define:vars` script sanitization; `<6.1.6`. https://github.com/advisories/GHSA-j687-52p2-xcff |
| Astro | Server-island parameter replay; `<6.1.10`. https://github.com/advisories/GHSA-xr5h-phrj-8vxv |
| Astro | Spread-prop attribute-name XSS; `<6.4.6`. https://github.com/advisories/GHSA-jrpj-wcv7-9fh9 |
| Astro | Incomplete spread-attribute XSS fix; `<7.0.6`. https://github.com/advisories/GHSA-f48w-9m4c-m7f5 |
| Astro | Transition directive XSS; `>=3.10.0 <7.0.4`. https://github.com/advisories/GHSA-7pw4-f3q4-r2p2 |
| Astro | View-transition animation XSS; `>=2.9.0 <=7.0.9`. https://github.com/advisories/GHSA-4g3v-8h47-v7g6 |
| Astro | Host-header SSRF; `<6.4.6`. https://github.com/advisories/GHSA-2pvr-wf23-7pc7 |
| Astro | Slot-name XSS; `<6.3.3`. https://github.com/advisories/GHSA-8hv8-536x-4wqp |
| Astro | Critical AVIF optimization code execution; `<7.2.8`. https://github.com/advisories/GHSA-26w7-cxv4-gfx2 |
| Astro | Base-path authorization boundary; `<=7.2.3`. https://github.com/advisories/GHSA-376h-93r7-7g6f |
| esbuild | Windows development-server file read; `>=0.27.3 <0.28.1`. https://github.com/advisories/GHSA-g7r4-m6w7-qqqr |
| js-yaml | Quadratic `!!omap` processing; `>=4.0.0 <4.3.1`. https://github.com/advisories/GHSA-5p4m-2wfm-xmqj |
| js-yaml | Empty merge-source CPU use; `>=4.0.0 <4.3.2`. https://github.com/advisories/GHSA-2883-xcg3-v3hh |
| nanoid | Custom-generator infinite loop with zero size; `<3.3.18`. https://github.com/advisories/GHSA-2v37-7h3g-55p8 |
| sharp | Inherited libvips vulnerabilities; `<0.35.0`. https://github.com/advisories/GHSA-f88m-g3jw-g9cj |
| sharp | Inherited libheif vulnerabilities; `<0.35.4`. https://github.com/advisories/GHSA-rgj7-g3m4-5g8c |
| svgo | Executable-link sanitizer bypasses; `>=4.0.0 <4.1.0`. https://github.com/advisories/GHSA-w27v-7q3p-w38r |
| svgo | `foreignObject` sanitizer bypasses; `>=4.0.0 <4.1.0`. https://github.com/advisories/GHSA-4vpr-x523-8j87 |

## Runtime and migration

The sandbox default was Node **20.20.1** / npm **10.8.2**. That Node version can run the old Astro build but is not supported by Astro 7. The maintained project now declares Node `>=22.12.0`, `.nvmrc` selects **22**, and CI reads `.nvmrc` instead of using Node 20. Local clean installs and builds were tested using Node **22.23.2** / npm **10.8.2**. No machine-global runtime was changed. Astro 6 already dropped Node 18/20 and requires Node 22.12 or higher. [Astro 6 migration guide](https://docs.astro.build/en/guides/upgrade-to/v6/).

The site uses `.astro` pages and sitemap, without a server adapter, Markdown processor, legacy content collections, or Vite overrides. The current source compiled on Astro 7 without source or Astro configuration edits by this maintenance pass. Both baseline and upgraded build logs explicitly report `output: "static"` and `mode: "static"`.

Astro 7 changes the compiler and default whitespace compression. A comparison of **361 otherwise whitespace-equivalent text blocks** in the baseline and upgraded artifacts found no whitespace changes. This is not a substitute for the main UI/browser review, especially because source changes were occurring concurrently. No `compressHTML` setting was changed. [Astro 7 migration and compiler guidance](https://docs.astro.build/en/guides/upgrade-to/v7/).

### Reproduce locally

With an existing Node version manager:

```sh
nvm use
npm ci
npm run audit
npm run test:build-validation
npm run build
npm run validate:build
```

In this sandbox, without changing its default Node:

```sh
npm exec --yes --package=node@22 --call 'node --version && npm ci && npm run audit && npm run test:build-validation && npm run build && npm run validate:build'
```

`npm run build` generates the artifact; `npm run validate:build` is a separate read-only gate. The validator can also inspect another artifact directory with `node scripts/validate-build.mjs --dist /absolute/path`.

## Production artifact validation

`scripts/validate-build.mjs` replaces the former grep-based workflow check. `parse5` **8.0.0** is a pinned development-only dependency: a standards-aware HTML parser is justified because attribute ordering, entities, inline scripts, and `noscript` content make regex-only HTML checks unreliable. It is used only by engineering validation and tests, not shipped as a site runtime dependency.

The validator checks:

- All 11 existing HTML routes, plus `/privacy/` when its source exists. Every generated HTML page is inspected, not just that required list. Search verification HTML is deliberately exempt from page structure checks and separately checked for exact content.
- Exact per-page HTTPS canonical, matching Open Graph URL, nonempty title/description, exactly one nonempty H1, unique IDs, duplicate attributes, and ARIA/label ID targets.
- Expected `noindex` on partner/404 and no accidental `noindex` elsewhere.
- Exact CNAME, Google verification and IndexNow key contents; required robots, favicon, and social image; canonical sitemap declaration and no whole-site robots block.
- Sitemap-index traversal, missing/cyclic references, duplicate entries, canonical URLs, inclusion of every public page including science, and exclusion of partner/404.
- Relative and absolute internal links, fragment targets, HTML asset references, social-image URLs, ordinary responsive-image candidates, CSS URLs/imports, SVG references, and literal JavaScript module references. External pages are not fetched.
- No retired `fasolati.com`, Claude artifact URLs, Formspree integration, placeholder form IDs, browser `localStorage`, old `fasolati_waitlist`/`fasolati_leads` backups, unconditional-success marker, or removed HubSpot tracking loader in shipped textual assets.
- No file-upload controls. Form fallback must remain POST `/partner/`, with controls disabled in the static markup until JavaScript safely initializes them; behavioral acceptance/failure is covered separately by browser tests.
- No server/client wrapper, source tree, dependency tree, Git directory, environment file, package manifest, or Astro config in the publication artifact.
- `/evidence-map.json` when its source endpoint exists: valid JSON, six unique mechanism IDs, HTTPS source URLs, valid science permalinks, published-study attribution, and preserved clinical/review boundaries. Exported names, routes, settings, findings, boundaries, uses, and source labels/URLs must match the rendered mechanism sections.

`scripts/validate-build.test.mjs` constructs isolated synthetic artifacts and tests both passing output and intentional failures across these categories. All **52 tests passed**. Fixtures are retained in a temporary directory and the real source/dist are never mutated by tests.

Limits: this is a deterministic site-specific gate, not a general-purpose HTML/XML conformance validator, JavaScript execution engine, full dependency/source security scanner, or clinical evidence appraisal. Computed runtime asset URLs and remotely hosted content need browser/network review. Unusual responsive-image syntax outside the supported width/density candidate form fails for manual review rather than silently passing.

## Workflow hardening

The workflow now runs clean installation, all-severity npm audit, validator regression tests, production build, and artifact validation before any artifact upload. Branch protection requirements were **not** changed; making a check mandatory for merge remains a repository policy decision.

Top-level permissions are only `contents: read`; checkout does not retain credentials. Pages write and OIDC are granted only to the deployment job. Both upload and deployment require:

```text
github.ref == 'refs/heads/main'
and event is push or workflow_dispatch
```

A pull request or a manually dispatched non-main branch can build/test but cannot upload the Pages artifact or deploy. No production environment or token grant is attached to the PR build job. Production concurrency avoids interrupting an active main deployment; obsolete non-main checks may be cancelled. No `configure-pages` setting-changing action was added.

## Pages setting correction — separate approval required

The prior release investigation reported Pages `build_type: legacy`, `source.branch: main`, and `source.path: /`, while the custom Astro deployment action succeeded and the default Jekyll build failed on Astro frontmatter. **The earlier assertion that this was a harmless duplicate safely fixed by deleting history was incorrect.** Deleting runs or workflow history does not correct the Pages build configuration.

This maintenance did not reread or change remote Pages settings, trigger Actions, commit, push, merge, deploy, or delete anything remotely. After explicit approval, an authorized maintainer should:

1. Read the current Pages configuration and retain the custom-domain/HTTPS values.
2. Change only `build_type` to `workflow`, either through Settings → Pages → Source → GitHub Actions or the Pages update API.
3. Recheck `build_type`, CNAME, and HTTPS enforcement; verify the approved main build/deployment and live verification/canonical/sitemap responses.
4. Keep deployment and failure history for diagnosis. Do not delete the Pages workflow, fabricate a Jekyll fix, or treat returning to legacy root HTML as an equivalent Astro rollback.

The later approved API action is:

```sh
# DOCUMENTATION ONLY — NOT EXECUTED IN THIS MAINTENANCE
gh api --method PUT repos/gengyveusa/fasolati/pages -f build_type=workflow
```

GitHub defines `workflow` as a custom Actions build and `legacy` as branch-driven Pages building; the update endpoint is `PUT /repos/{owner}/{repo}/pages` and requires appropriate administrative Pages privileges. Those privileges belong in an approved maintainer operation, not in PR CI. [GitHub Pages REST documentation](https://docs.github.com/en/rest/pages/pages).

## Evidence retained

QA files are under `/home/user/workspace/fasolati-qa/`, outside the website artifact. Important files include the before/intermediate/after audit JSON, registry metadata, `build-baseline-node22.log`, `upgrade-install-build.log`, `build-validation.log`, `validator-tests.log`, `build-maintenance-final.log`, `workflow-validation.json`, `upgrade-whitespace-comparison.json`, and the retained baseline output in `dist-before-upgrade/`.

The current build has **12 HTML pages**, a static evidence JSON export, **10 sitemap URLs**, and no remaining npm audit findings. The final validator checked **25 files and 724 references**; the latest production build completed at **06:25:45 UTC, September 13, 2026**. Local workflow YAML, ordered gates, least-privilege settings, and nine event/ref guard combinations were checked; no remote Actions run was triggered. `git diff --check` passed. Dynamic menu/form/browser QA and final visual approval are owned by the main UI pass; this engineering pass did not submit any real leads or validate live inbox delivery.
