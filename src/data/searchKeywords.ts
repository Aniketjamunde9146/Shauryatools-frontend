/**
 * SEO and search keywords for every tool, keyed by slug. This is the single source of truth:
 * - `buildMetadata` (src/lib/seo.ts) uses it for each page's <meta name="keywords">.
 * - `searchTools` (src/lib/search.ts) indexes it for the home page search.
 * Edit it by hand. tests/data-integrity.test.ts checks that every slug here is a real tool and every tool has keywords.
 */
export const SEARCH_KEYWORDS: Record<string, string[]> = {
  "age-calculator": [
    "age calculator",
    "birthday calculator",
    "exact age calculator",
    "how old am I",
    "age in days",
    "zodiac sign calculator",
    "days until birthday"
  ],
  "ai-email-reply-generator": [
    "email reply generator",
    "ai email",
    "professional email reply",
    "email writer",
    "email assistant",
    "reply to email",
    "email tone generator"
  ],
  "ai-journal-prompt-generator": [
    "journal prompt generator",
    "daily journal prompts",
    "ai journaling",
    "gratitude prompts",
    "self-reflection prompts",
    "mindfulness journal",
    "morning journal prompts",
    "evening journal prompts",
    "writing prompts",
    "ai journal tool"
  ],
  "apna-startup": [
    "startup analyzer",
    "startup advisor",
    "business plan generator",
    "AI startup",
    "market analysis",
    "startup idea validation",
    "tech stack recommendation",
    "MVP planning"
  ],
  "base64": [
    "base64 encoder",
    "base64 decoder",
    "base64 converter",
    "encode to base64",
    "decode base64",
    "base64 online",
    "base64 file encoder"
  ],
  "blog-post-generator": [
    "AI blog post generator",
    "blog writer",
    "SEO blog generator",
    "free blog post generator",
    "AI article writer"
  ],
  "bmi-calculator": [
    "BMI calculator",
    "body mass index calculator",
    "free BMI calculator",
    "online BMI",
    "healthy weight calculator",
    "BMI metric imperial"
  ],
  "budget-planner": [
    "budget planner",
    "ai budget",
    "personal finance",
    "expense tracker",
    "savings planner",
    "monthly budget",
    "financial planning tool"
  ],
  "business-name-generator": [
    "ai business name generator",
    "brand name generator",
    "startup name ideas",
    "company name generator",
    "free business naming tool"
  ],
  "code-explainer": [
    "code explainer",
    "code explanation",
    "understand code",
    "JavaScript explainer",
    "Python explainer",
    "code reader",
    "developer tools",
    "learn to code"
  ],
  "code-minifier": [
    "code minifier",
    "HTML minifier",
    "CSS minifier",
    "JavaScript minifier",
    "JS minifier",
    "code prettifier",
    "minify code online",
    "code formatter"
  ],
  "code-prettifier": [
    "code prettifier",
    "code formatter",
    "JavaScript formatter",
    "code beautifier",
    "online code formatter",
    "JS prettier",
    "CSS formatter",
    "HTML formatter",
    "code linter"
  ],
  "code-to-document": [
    "code documentation generator",
    "JSDoc generator",
    "markdown docs",
    "auto documentation",
    "JavaScript docs",
    "TypeScript docs",
    "developer tools"
  ],
  "cold-email-generator": [
    "cold email generator",
    "freelancer outreach",
    "cold email for freelancers",
    "ai cold email",
    "client outreach email",
    "freelance email template"
  ],
  "collage-maker": [
    "collage maker",
    "photo collage",
    "image collage",
    "free collage maker",
    "online collage",
    "photo grid"
  ],
  "color-palette-extractor": [
    "color palette extractor",
    "extract colors from image",
    "dominant colors",
    "hex codes",
    "rgb values",
    "color picker",
    "free color tool"
  ],
  "color-picker": [
    "color picker",
    "hex color picker",
    "RGB to HEX",
    "color converter",
    "color palette generator",
    "WCAG contrast checker",
    "HSL color picker",
    "CMYK converter"
  ],
  "cover-letter-generator": [
    "cover letter generator",
    "ai cover letter",
    "free cover letter maker",
    "job application letter",
    "cover letter builder",
    "professional cover letter"
  ],
  "credit-card-emi-calculator": [
    "credit card emi calculator",
    "emi calculator",
    "credit card interest calculator",
    "loan emi",
    "monthly installment calculator",
    "amortization schedule"
  ],
  "daily-affirmation-generator": [
    "daily affirmation generator",
    "ai affirmations",
    "positive affirmations",
    "morning affirmations",
    "mindfulness tool",
    "free affirmation generator"
  ],
  "daily-planner-generator": [
    "daily planner generator",
    "ai planner",
    "daily schedule maker",
    "productivity planner",
    "ai daily schedule",
    "time block planner",
    "day planner tool"
  ],
  "diet-plan-generator": [
    "diet plan generator",
    "ai meal planner",
    "free diet plan",
    "weight loss meal plan",
    "keto meal plan",
    "vegan diet plan",
    "ai nutrition planner"
  ],
  "electricity-bill-estimator": [
    "electricity bill calculator",
    "electricity bill estimator india",
    "slab rate calculator",
    "bijli bill calculator",
    "electricity unit calculator"
  ],
  "email-generator": [
    "email generator",
    "ai email writer",
    "professional email",
    "business email generator",
    "email composer",
    "ai email tool",
    "write email"
  ],
  "emoji-combiner": [
    "emoji combiner",
    "emoji meaning",
    "emoji generator",
    "emoji vibe checker",
    "emoji story generator",
    "AI emoji tool",
    "emoji caption generator"
  ],
  "error-debugger": [
    "error debugger",
    "bug fixer",
    "AI debugger",
    "code error fix",
    "stack trace analyzer",
    "developer tools"
  ],
  "exam-countdown": [
    "exam countdown timer",
    "exam date tracker",
    "student countdown",
    "exam reminder",
    "study planner",
    "exam scheduler",
    "countdown to exam",
    "test timer"
  ],
  "excuse-generator": [
    "excuse generator",
    "ai excuse maker",
    "excuse writer",
    "funny excuses",
    "work excuse",
    "late excuse",
    "ai excuse tool",
    "believable excuses"
  ],
  "expense-split-calculator": [
    "expense split calculator",
    "bill splitter",
    "split bill with tip",
    "split expenses with friends",
    "shared expense calculator",
    "who owes whom"
  ],
  "flashcard-generator": [
    "flashcard generator",
    "ai flashcards",
    "study cards generator",
    "flashcard maker",
    "spaced repetition",
    "active recall",
    "study tool",
    "notes to flashcards"
  ],
  "flip-clock": [
    "flip clock",
    "countdown timer",
    "stopwatch",
    "world clock",
    "online clock",
    "animated flip clock",
    "retro clock",
    "dark mode clock"
  ],
  "fuel-expense-calculator": [
    "fuel cost calculator",
    "petrol expense calculator",
    "fuel expense calculator",
    "trip fuel cost",
    "mileage calculator India",
    "daily fuel cost"
  ],
  "gitignore-generator": [
    "gitignore generator",
    ".gitignore generator",
    "create gitignore",
    "gitignore file",
    "gitignore for react",
    "gitignore for python",
    "gitignore for node"
  ],
  "grocery-list-generator": [
    "grocery list generator",
    "ai grocery planner",
    "smart shopping list",
    "meal planning",
    "diet grocery list",
    "weekly grocery list"
  ],
  "gst-calculator": [
    "GST calculator",
    "add GST",
    "remove GST",
    "GST inclusive exclusive",
    "CGST SGST IGST",
    "GST percentage calculator",
    "India GST"
  ],
  "habit-tracker-generator": [
    "habit tracker generator",
    "printable habit tracker",
    "habit tracker pdf",
    "monthly habit tracker",
    "habit tracker template",
    "free habit tracker"
  ],
  "hashtag-generator": [
    "hashtag generator",
    "Instagram hashtags",
    "TikTok hashtags",
    "Twitter hashtags",
    "free hashtag generator",
    "trending hashtags",
    "hashtags for Instagram"
  ],
  "homework-helper-ai": [
    "homework helper",
    "ai homework",
    "homework help",
    "homework solver",
    "math helper",
    "science homework",
    "study assistant",
    "homework tutor"
  ],
  "image-compressor": [
    "image compressor",
    "compress image online",
    "reduce image size",
    "jpg compressor",
    "png compressor",
    "image optimizer",
    "resize image",
    "free image tool"
  ],
  "image-converter": [
    "image converter",
    "jpg to png",
    "png to webp",
    "webp to jpg",
    "gif to png",
    "convert image online",
    "free image converter"
  ],
  "image-metadata-viewer": [
    "image metadata viewer",
    "EXIF data",
    "exif reader",
    "image info",
    "camera data",
    "GPS from photo",
    "photo metadata"
  ],
  "image-quality-enhancer": [
    "image quality enhancer",
    "upscale image",
    "image upscaler",
    "4K image upscale",
    "enhance photo quality online",
    "increase image resolution"
  ],
  "image-resizer": [
    "image resizer",
    "resize image online",
    "image dimensions",
    "instagram size",
    "youtube thumbnail size",
    "png resizer",
    "jpg resizer"
  ],
  "image-shape-converter": [
    "image shape converter",
    "crop image circle",
    "crop image square",
    "image to circle",
    "image crop tool",
    "custom image crop",
    "profile picture crop",
    "image shape tool free"
  ],
  "image-to-pdf": [
    "image to pdf",
    "jpg to pdf",
    "png to pdf",
    "webp to pdf",
    "convert image pdf",
    "multiple images to pdf",
    "free pdf converter"
  ],
  "income-tax-calculator-india": [
    "income tax calculator India",
    "new regime tax calculator",
    "old regime tax calculator",
    "FY 2024-25 tax",
    "80C deduction",
    "salary tax calculator India",
    "tax slab India"
  ],
  "instagram-bio-generator": [
    "instagram bio generator",
    "free instagram bio",
    "ig bio creator",
    "instagram profile bio",
    "bio generator tool"
  ],
  "interview-generator": [
    "interview question generator",
    "ai interview prep",
    "behavioral interview questions",
    "technical interview questions",
    "job interview practice",
    "interview coach",
    "mock interview tool"
  ],
  "json-formatter": [
    "json formatter",
    "json validator",
    "json beautifier",
    "json minifier",
    "online json tool",
    "format json",
    "json tree view"
  ],
  "json-to-yaml": [
    "json to yaml converter",
    "yaml to json",
    "json yaml converter online",
    "convert json yaml",
    "free yaml tool"
  ],
  "jwt-decoder": [
    "jwt decoder",
    "decode jwt",
    "json web token decoder",
    "jwt parser",
    "jwt debugger",
    "jwt exp claim",
    "jwt online",
    "decode bearer token"
  ],
  "keyword-density-checker": [
    "keyword density checker",
    "keyword frequency",
    "seo keyword analyzer",
    "text analysis",
    "keyword distribution",
    "bigram analysis"
  ],
  "landing-page-generator": [
    "landing page generator",
    "AI website builder",
    "html generator",
    "free landing page maker"
  ],
  "license-generator": [
    "license generator",
    "open source license",
    "mit license generator",
    "gpl license",
    "apache license",
    "free license tool",
    "github license"
  ],
  "linkedin-post-generator": [
    "linkedin post generator",
    "ai linkedin post",
    "linkedin content generator",
    "linkedin post ideas",
    "free linkedin tool",
    "linkedin copywriter"
  ],
  "loan-emi-calculator": [
    "loan emi calculator",
    "emi calculator",
    "monthly installment calculator",
    "loan calculator online",
    "amortization schedule",
    "home loan emi"
  ],
  "markdown-previewer": [
    "markdown editor online",
    "markdown previewer",
    "live markdown preview",
    "markdown to html",
    "free markdown tool",
    "markdown renderer"
  ],
  "marks-percentage-calculator": [
    "marks percentage calculator",
    "grade calculator",
    "GPA calculator",
    "exam marks calculator",
    "percentage to grade",
    "marks to percentage"
  ],
  "meme-generator": [
    "meme generator",
    "meme maker",
    "add text to image",
    "meme creator",
    "impact font meme",
    "free meme tool"
  ],
  "metatag-generator": [
    "meta tag generator",
    "seo meta tags",
    "open graph generator",
    "twitter card generator",
    "meta description generator",
    "html meta tags"
  ],
  "notes-simplifier": [
    "notes simplifier",
    "ai notes",
    "study notes",
    "summarize notes",
    "flashcard generator",
    "cornell notes",
    "note taking tool",
    "ai study assistant"
  ],
  "page-speed-analyzer": [
    "page speed analyzer",
    "website speed test",
    "core web vitals",
    "lighthouse score",
    "performance audit",
    "lcp fcp cls",
    "seo performance"
  ],
  "passport-photo-maker": [
    "passport photo maker",
    "passport size photo online",
    "visa photo maker",
    "passport photo background remover",
    "passport photo print sheet"
  ],
  "password-generator": [
    "password generator",
    "secure password generator",
    "random password generator",
    "strong password",
    "password strength checker",
    "bulk password generator"
  ],
  "pomodoro-timer": [
    "pomodoro timer",
    "focus timer",
    "productivity timer",
    "pomodoro technique",
    "online timer",
    "deep work timer",
    "study timer",
    "time management tool"
  ],
  "product-comparison": [
    "product comparison generator",
    "ai product comparison",
    "compare products",
    "vs comparison",
    "best product recommendation",
    "buying guide",
    "product review ai",
    "which product to buy"
  ],
  "product-description-generator": [
    "product description generator",
    "ai product description",
    "ecommerce copywriter",
    "amazon listing generator",
    "shopify product copy"
  ],
  "productivity-booster-plan": [
    "productivity plan generator",
    "ai productivity",
    "productivity booster",
    "time management plan",
    "deep work plan",
    "productivity for students",
    "productivity for freelancers",
    "goal setting tool",
    "habit tracker",
    "productivity framework",
    "ai productivity coach"
  ],
  "profile-readme-generator": [
    "github profile readme generator",
    "github readme",
    "github stats badge",
    "github profile generator",
    "readme md generator",
    "github bio"
  ],
  "prompt-generator": [
    "ai prompt generator",
    "chatgpt prompt",
    "claude prompt",
    "midjourney prompt",
    "prompt builder",
    "ai prompt tool",
    "prompt engineering"
  ],
  "qr-code-generator": [
    "qr code generator",
    "free qr code",
    "qr code maker",
    "url qr code",
    "wifi qr code",
    "vcard qr code",
    "custom qr code"
  ],
  "readme-generator": [
    "readme generator",
    "github readme",
    "readme.md generator",
    "markdown readme",
    "github project readme",
    "open source readme"
  ],
  "regex-tester": [
    "regex tester",
    "regular expression tester",
    "online regex",
    "regex debugger",
    "regex match",
    "regex validator",
    "javascript regex"
  ],
  "relationship-compatibility-checker": [
    "relationship compatibility",
    "zodiac compatibility",
    "love compatibility checker",
    "personality match",
    "ai compatibility tool"
  ],
  "remove-background": [
    "remove background online free",
    "ai background remover",
    "transparent background tool",
    "remove bg",
    "image background eraser",
    "photo background remover",
    "cutout image tool"
  ],
  "resume-builder": [
    "resume builder",
    "ai resume generator",
    "ats resume",
    "free resume maker",
    "resume creator",
    "cv builder",
    "professional resume"
  ],
  "savings-goal-calculator": [
    "savings goal calculator",
    "savings calculator",
    "how long to save",
    "savings timeline",
    "compound interest calculator",
    "personal finance tool"
  ],
  "schema-markup-generator": [
    "schema markup generator",
    "json-ld generator",
    "structured data",
    "schema.org",
    "seo schema",
    "rich snippets",
    "faq schema",
    "product schema"
  ],
  "screen-time-planner": [
    "screen time tracker",
    "screen time planner",
    "reduce screen time",
    "digital wellness",
    "phone addiction",
    "screen time calculator",
    "daily screen time plan",
    "ai productivity tool"
  ],
  "screenshot-editor": [
    "screenshot editor",
    "crop screenshot",
    "blur screenshot",
    "annotate image",
    "add arrow to screenshot",
    "highlight screenshot",
    "free online image editor"
  ],
  "self-intro-generator": [
    "self introduction generator",
    "ai intro generator",
    "tell me about yourself",
    "linkedin bio generator",
    "professional introduction",
    "job interview intro",
    "personal branding",
    "elevator pitch generator"
  ],
  "sip-calculator": [
    "SIP calculator",
    "SIP return calculator",
    "mutual fund calculator",
    "SIP maturity calculator",
    "monthly investment calculator",
    "compound interest calculator India"
  ],
  "sitemap-generator": [
    "sitemap generator",
    "xml sitemap",
    "sitemap.xml",
    "seo sitemap",
    "sitemap builder",
    "free sitemap generator"
  ],
  "social-media-caption-generator": [
    "AI caption generator",
    "Instagram caption generator",
    "social media caption generator",
    "caption generator free",
    "caption for Instagram",
    "AI captions"
  ],
  "speech-script-generator": [
    "speech script generator",
    "ai speech writer",
    "public speaking practice",
    "speech coach",
    "persuasive speech generator",
    "free speech script tool"
  ],
  "startup-validator": [
    "startup idea validator",
    "startup validation",
    "ai startup analyzer",
    "startup idea checker",
    "startup feedback",
    "idea validation tool"
  ],
  "story-generator": [
    "story generator",
    "ai story writer",
    "story creator",
    "ai fiction generator",
    "short story generator",
    "creative writing ai"
  ],
  "study-notes-mcq-generator": [
    "mcq generator",
    "ai question maker",
    "study notes to quiz",
    "multiple choice question generator",
    "exam question generator",
    "ai quiz maker",
    "true false generator",
    "fill in the blank",
    "exam prep tool"
  ],
  "study-streak-tracker": [
    "study streak tracker",
    "study habit tracker",
    "daily study log",
    "study heatmap",
    "study goals",
    "study sessions",
    "habit tracker"
  ],
  "study-time-calculator": [
    "study time calculator",
    "ai study planner",
    "study schedule generator",
    "pomodoro study plan",
    "exam prep planner",
    "free study calculator"
  ],
  "text-tools": [
    "word counter",
    "character counter",
    "case converter",
    "text tools",
    "uppercase converter",
    "camelcase converter",
    "snake case tool",
    "online word count"
  ],
  "unit-converter": [
    "unit converter",
    "length converter",
    "weight converter",
    "temperature converter",
    "metric converter",
    "online unit conversion",
    "free converter tool"
  ],
  "url-encoder": [
    "url encoder",
    "url decoder",
    "url encode decode",
    "percent encoding",
    "url parser",
    "query string parser",
    "online url tool"
  ],
  "uuid-generator": [
    "uuid generator",
    "uuid v4 generator",
    "online uuid",
    "random uuid",
    "unique id generator",
    "guid generator",
    "bulk uuid"
  ],
  "water-intake-calculator": [
    "water intake calculator",
    "daily water intake",
    "hydration calculator",
    "how much water should I drink",
    "water intake by weight",
    "hydration planner",
    "ai health tool"
  ],
  "watermark-adder": [
    "watermark adder",
    "add watermark to image",
    "text watermark",
    "logo watermark",
    "image watermark online",
    "free watermark tool"
  ],
  "whatsapp-generator": [
    "whatsapp cold message",
    "freelancer whatsapp outreach",
    "whatsapp message generator",
    "cold message for freelancers",
    "ai whatsapp tool"
  ],
  "whatsapp-rewriter": [
    "whatsapp message rewriter",
    "ai text rewriter",
    "rewrite message",
    "whatsapp ai",
    "message tone changer",
    "chat message rewriter",
    "text rewriter"
  ],
  "whatsapp-screenshot-generator": [
    "whatsapp screenshot generator",
    "fake whatsapp chat",
    "whatsapp chat maker",
    "whatsapp mock",
    "chat screenshot"
  ],
  "youtube-description-generator": [
    "youtube description generator",
    "youtube seo",
    "ai youtube description",
    "youtube video description",
    "youtube description tool",
    "yt description"
  ],
  "youtube-title-optimizer": [
    "youtube title optimizer",
    "youtube title generator",
    "clickbait title generator",
    "youtube seo title",
    "ctr title",
    "youtube title ideas"
  ],
  "word-counter": ["word counter", "character counter", "count words online", "word count tool", "reading time calculator", "sentence counter", "paragraph counter"],
  "case-converter": ["case converter", "text case converter", "title case converter", "uppercase to lowercase", "camel case converter", "snake case converter", "kebab case converter"],
  "lorem-ipsum-generator": ["lorem ipsum generator", "lorem ipsum", "placeholder text", "dummy text generator", "filler text", "lorem ipsum paragraphs"],
  "color-contrast-checker": ["color contrast checker", "wcag contrast checker", "contrast ratio calculator", "accessibility color checker", "text contrast checker", "aa aaa contrast"],
  "timezone-converter": ["timezone converter", "time zone converter", "world clock converter", "convert time zones", "ist to est converter", "time difference calculator"],
  "date-difference-calculator": ["date difference calculator", "days between dates", "date calculator", "days between two dates", "how many days between", "weeks between dates"],
  "tip-calculator": ["tip calculator", "bill split calculator", "restaurant tip calculator", "tip percentage calculator", "split bill calculator"],
  "unix-timestamp-converter": ["unix timestamp converter", "epoch converter", "timestamp to date", "date to unix timestamp", "epoch time converter", "unix time"],
  "sha256-hash-generator": ["sha256 generator", "sha-256 hash online", "sha256 hash of text", "hash generator", "sha256 calculator", "online hash tool"],
  "px-rem-converter": ["px to rem converter", "rem to px", "pixels to rem", "css unit converter", "px to rem calculator"],
  "roman-numeral-converter": ["roman numeral converter", "number to roman numerals", "roman numerals to number", "roman numeral calculator", "roman numerals 1 to 1000"],
  "random-name-picker": ["random name picker", "random picker", "name generator random", "pick a name", "random choice generator", "giveaway picker"],
};


