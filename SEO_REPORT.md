# SEO Indexing Report

Scope: 113 tool routes in the registry. Word counts use whitespace-separated words and include FAQ questions and answers.

All tools are currently indexable. Every intro is 80-150 words, and no identical intros or confirmed duplicate pages were found. No tool was set to `indexable: false`. Intros expand each existing catalogue description with shared usage and review guidance; consider editorial review to add more tool-specific examples over time.

## Potential merge candidates

- `text-tools` overlaps with the focused `word-counter` and `case-converter` pages because it combines both tasks. These pages are not confirmed duplicates, so no redirects or noindex settings were added.

## Global checks

- Tool metadata uses a unique title, a unique 140-160 character description, a self-referencing canonical, and the registry's `indexable` value.
- The sitemap includes the home page, tools directory, about page, and only indexable tool entries. `src/app/robots.ts` already allows crawling and points to the sitemap.
- `src/app/layout.tsx` has a site-wide title template and a default description.
- The only `noindex` strings found are selectable output values in `src/styles/tools/MetaTagGenerator.tsx`; they are not directives applied to any page.
- No confirmed duplicate pair warranted a permanent redirect.

## Per-tool content word counts

| Slug | Intro words | Intro + steps + FAQs | Indexable |
|---|---:|---:|:---:|
| hashtag-generator | 88 | 273 | Yes |
| prompt-generator | 89 | 278 | Yes |
| readme-generator | 86 | 289 | Yes |
| json-formatter | 88 | 285 | Yes |
| json-to-yaml | 88 | 294 | Yes |
| base64 | 88 | 285 | Yes |
| url-encoder | 88 | 285 | Yes |
| code-minifier | 88 | 285 | Yes |
| markdown-previewer | 87 | 283 | Yes |
| regex-tester | 87 | 283 | Yes |
| uuid-generator | 86 | 281 | Yes |
| gitignore-generator | 87 | 283 | Yes |
| license-generator | 86 | 281 | Yes |
| metatag-generator | 90 | 306 | Yes |
| profile-readme-generator | 88 | 293 | Yes |
| instagram-bio-generator | 88 | 265 | Yes |
| youtube-description-generator | 88 | 273 | Yes |
| linkedin-post-generator | 87 | 271 | Yes |
| social-media-caption-generator | 88 | 273 | Yes |
| emoji-combiner | 87 | 275 | Yes |
| youtube-title-optimizer | 89 | 284 | Yes |
| password-generator | 86 | 281 | Yes |
| qr-code-generator | 88 | 249 | Yes |
| unit-converter | 85 | 234 | Yes |
| bmi-calculator | 87 | 269 | Yes |
| loan-emi-calculator | 87 | 276 | Yes |
| age-calculator | 89 | 242 | Yes |
| text-tools | 92 | 320 | Yes |
| color-picker | 96 | 285 | Yes |
| code-prettifier | 91 | 291 | Yes |
| apna-startup | 93 | 287 | Yes |
| blog-post-generator | 94 | 297 | Yes |
| product-description-generator | 92 | 292 | Yes |
| resume-builder | 92 | 285 | Yes |
| cover-letter-generator | 98 | 306 | Yes |
| code-explainer | 94 | 297 | Yes |
| code-to-document | 93 | 304 | Yes |
| error-debugger | 97 | 311 | Yes |
| sitemap-generator | 97 | 284 | Yes |
| keyword-density-checker | 98 | 295 | Yes |
| schema-markup-generator | 97 | 293 | Yes |
| page-speed-analyzer | 99 | 306 | Yes |
| landing-page-generator | 96 | 300 | Yes |
| homework-helper-ai | 94 | 293 | Yes |
| notes-simplifier | 95 | 286 | Yes |
| ai-email-reply-generator | 98 | 310 | Yes |
| email-generator | 100 | 310 | Yes |
| whatsapp-rewriter | 97 | 292 | Yes |
| whatsapp-screenshot-generator | 99 | 297 | Yes |
| excuse-generator | 96 | 297 | Yes |
| daily-planner-generator | 98 | 301 | Yes |
| diet-plan-generator | 95 | 302 | Yes |
| expense-split-calculator | 96 | 303 | Yes |
| study-time-calculator | 102 | 309 | Yes |
| habit-tracker-generator | 101 | 307 | Yes |
| daily-affirmation-generator | 99 | 310 | Yes |
| relationship-compatibility-checker | 99 | 303 | Yes |
| business-name-generator | 99 | 308 | Yes |
| speech-script-generator | 102 | 314 | Yes |
| story-generator | 100 | 310 | Yes |
| cold-email-generator | 95 | 300 | Yes |
| whatsapp-generator | 103 | 322 | Yes |
| startup-validator | 106 | 322 | Yes |
| grocery-list-generator | 104 | 311 | Yes |
| water-intake-calculator | 96 | 304 | Yes |
| screen-time-planner | 101 | 307 | Yes |
| interview-generator | 98 | 306 | Yes |
| self-intro-generator | 98 | 297 | Yes |
| product-comparison | 96 | 302 | Yes |
| study-notes-mcq-generator | 98 | 319 | Yes |
| ai-journal-prompt-generator | 102 | 334 | Yes |
| productivity-booster-plan | 105 | 324 | Yes |
| pomodoro-timer | 102 | 301 | Yes |
| exam-countdown | 102 | 301 | Yes |
| flip-clock | 100 | 273 | Yes |
| flashcard-generator | 101 | 307 | Yes |
| study-streak-tracker | 102 | 301 | Yes |
| marks-percentage-calculator | 98 | 293 | Yes |
| gst-calculator | 100 | 302 | Yes |
| sip-calculator | 98 | 298 | Yes |
| income-tax-calculator-india | 102 | 324 | Yes |
| fuel-expense-calculator | 104 | 281 | Yes |
| budget-planner | 104 | 327 | Yes |
| savings-goal-calculator | 106 | 323 | Yes |
| credit-card-emi-calculator | 101 | 322 | Yes |
| electricity-bill-estimator | 102 | 277 | Yes |
| image-compressor | 100 | 273 | Yes |
| image-shape-converter | 101 | 303 | Yes |
| remove-background | 100 | 283 | Yes |
| passport-photo-maker | 100 | 292 | Yes |
| image-quality-enhancer | 102 | 296 | Yes |
| image-to-pdf | 102 | 286 | Yes |
| image-resizer | 100 | 264 | Yes |
| image-converter | 99 | 262 | Yes |
| watermark-adder | 99 | 272 | Yes |
| meme-generator | 100 | 274 | Yes |
| color-palette-extractor | 102 | 296 | Yes |
| collage-maker | 102 | 287 | Yes |
| image-metadata-viewer | 99 | 271 | Yes |
| screenshot-editor | 97 | 258 | Yes |
| jwt-decoder | 95 | 305 | Yes |
| word-counter | 94 | 297 | Yes |
| case-converter | 91 | 291 | Yes |
| lorem-ipsum-generator | 91 | 265 | Yes |
| color-contrast-checker | 93 | 269 | Yes |
| timezone-converter | 93 | 250 | Yes |
| date-difference-calculator | 93 | 259 | Yes |
| tip-calculator | 92 | 286 | Yes |
| unix-timestamp-converter | 94 | 306 | Yes |
| sha256-hash-generator | 93 | 304 | Yes |
| px-rem-converter | 93 | 313 | Yes |
| roman-numeral-converter | 90 | 298 | Yes |
| random-name-picker | 95 | 263 | Yes |
