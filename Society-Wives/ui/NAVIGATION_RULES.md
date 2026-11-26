# Society Wives UI — Episode navigation contract

This contract is part of the repository. Do not introduce new story UI work that breaks it.

1. **One persistent navigator.** The same `StoryNavigation` component appears above both Story Reader and Story Plot. The Reader must not add a competing episode bar.
2. **No disappearing episodes.** The Reader offers Episodes 01–05 (04A and 04B separately); Episode 06 is labeled *Plot only*. Plot navigation always exposes 04A, 04B, 05 and 06.
3. **Preserve context.** Selecting another episode retains the active wife wherever that route exists. Selecting another wife retains the current episode and Reader/Plot mode. Browser back/forward and hash deep links remain valid.
4. **No silent substitute.** A wife with no Episode 06 planning route gets an explicit placeholder and previous-episode links, never an unrelated Episode 04A document. No missing 04B/05 data may be relabeled as approved prose.
5. **Editorial status stays visible.** Historical Reader prose, source-vault manuscripts, plots, and author-approved scene plans must remain distinct. New content never rewrites frozen 01–03 or stored original-source snapshots.
6. **Shivani 04B must be reachable.** The path `#/planning?lead=shivani&part=04B` opens her working office plot with a link to `#/source-vault?item=ep04b-shivani-office`. `part=04B` and legacy `part=B` must not resolve to 04A.
7. **Episode 05 stays wife-wise.** Every wife remains selectable in both the Episode 05 Reader and Plot, with archived sources labeled as archive material rather than newly approved prose.
8. **Episode 06 images stay in Plot.** Ankita's office visuals are linked from the Episode 06 office home-visit section, with clear references and without changing the content of previous scenes.
9. **Regression gate.** Every Pages build must run `npm run build` and `npm run test:nav`. Do not claim live deployment before the actual workflow reaches success. Whenever browser tests are available, also smoke-test the deep links in a real browser.

## Manual deep-link matrix

- Shivani Episode 04B plot: `#/planning?lead=shivani&part=04B`
- Shivani 04B original: `#/source-vault?item=ep04b-shivani-office`
- Ankita Episode 05 plot: `#/planning?lead=ankita&part=05`
- Wife-wise Episode 05 Reader: `#/reading?episode=05&character=shivani`
- Ankita Episode 06 plot and illustrations: `#/planning?lead=ankita&part=06`
- Shivani Episode 06 plot: `#/planning?lead=shivani&part=06`
