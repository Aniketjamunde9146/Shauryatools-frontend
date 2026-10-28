/**
 * Config for every AI text tool. Each tool lists only the inputs it really uses (`fields`),
 * and only shows Tone when tone changes the result (`showTone`).
 * `key` is the backend tool name (unchanged), `task` tells the AI what to write.
 * Plain data only, so it can be shared by server pages and the client form.
 */

export type AIFieldType = "text" | "textarea" | "number" | "date" | "select";

export interface AIField {
  /** Name used in the prompt. Unique within a tool. */
  id: string;
  /** Shown above the input, and used as the line label in the prompt. */
  label: string;
  placeholder?: string;
  type: AIFieldType;
  required?: boolean;
  /** Only for type "select". */
  options?: string[];
}

export interface AIToolConfig {
  key: string;
  task: string;
  fields: AIField[];
  /** Show the Tone dropdown only where tone changes the writing. */
  showTone: boolean;
  /** Every tool produces text, so every tool offers a language. */
  showLanguage: boolean;
}

const text = (id: string, label: string, placeholder?: string, required = false): AIField =>
  ({ id, label, placeholder, type: "text", required });
const area = (id: string, label: string, placeholder?: string, required = false): AIField =>
  ({ id, label, placeholder, type: "textarea", required });
const num = (id: string, label: string, placeholder?: string, required = false): AIField =>
  ({ id, label, placeholder, type: "number", required });
const date = (id: string, label: string, required = false): AIField =>
  ({ id, label, type: "date", required });
const pick = (id: string, label: string, options: string[], required = false): AIField =>
  ({ id, label, type: "select", options, required });

/** Builds one tool config. Tone is shown only when `tone` is true. */
const tool = (key: string, task: string, fields: AIField[], tone = false): AIToolConfig =>
  ({ key, task, fields, showTone: tone, showLanguage: true });

export const AI_TOOLS: Record<string, AIToolConfig> = {
  "linkedin-post-generator": tool("linkedin_post",
    "Write a high-performing LinkedIn post. Start with a strong one-or-two-line hook (never start with the word \"I\"), then short paragraphs with white space, a clear takeaway, a genuine closing question, and 5 relevant hashtags at the end.",
    [area("topic", "What is the post about?", "e.g. 5 lessons I learned in my first year as a freelance developer", true),
     pick("goal", "What should the post achieve?", ["Comments", "Reposts", "Clients", "Brand awareness"])], true),

  "hashtag-generator": tool("hashtag-gen",
    "Generate 25 relevant, mixed-reach hashtags (broad, niche and trending) for this topic. Output them on one line separated by spaces, each starting with #.",
    [text("niche", "Post or niche", "e.g. home workout for beginners", true),
     pick("platform", "Platform", ["Instagram", "LinkedIn", "YouTube", "X (Twitter)"])]),

  "prompt-generator": tool("prompt",
    "Write one detailed, ready-to-paste AI prompt (role, context, task, format, constraints) for this goal.",
    [area("goal", "What do you want the AI to do?", "e.g. plan a 7-day study schedule for NEET", true),
     pick("ai_tool", "Which AI will use it?", ["ChatGPT", "Claude", "Gemini", "Any"])]),

  "readme-generator": tool("readme-gen",
    "Write a complete professional GitHub README.md in Markdown (title, description, features, tech stack, install, usage, contributing, license) for this project.",
    [text("project_name", "Project name", "e.g. Expense Tracker", true),
     area("description", "What does the project do?", "e.g. A Next.js expense tracker using Supabase", true),
     text("tech_stack", "Tech stack", "e.g. Next.js, Supabase, Tailwind"),
     area("features", "Main features", "e.g. login, monthly charts, CSV export"),
     pick("license", "License", ["MIT", "Apache-2.0", "GPL-3.0", "None"])]),

  "profile-readme-generator": tool("profile_readme",
    "Write an eye-catching GitHub profile README.md in Markdown (intro, skills, projects, contact) for this person.",
    [text("name", "Your name", "e.g. Aniket", true),
     text("role", "Your role", "e.g. Full-stack developer, open to freelance", true),
     text("skills", "Skills", "e.g. Next.js, Flutter, Node.js"),
     area("projects", "Projects to show", "e.g. aniketwebdev.in, GMB Scrapper")]),

  "blog-post-generator": tool("blog-gen",
    "Write a complete SEO-friendly blog post with a title, intro, headed sections and a conclusion.",
    [text("topic", "Blog topic", "e.g. Benefits of a progressive web app for small businesses", true),
     text("audience", "Who is it for?", "e.g. small shop owners in India"),
     pick("length", "Length", ["500 words", "800 words", "1200+ words"])], true),

  "social-media-caption-generator": tool("caption",
    "Write 5 different scroll-stopping social media captions with fitting emojis and hashtags.",
    [area("about", "What is the post about?", "e.g. photo of our new cafe opening in Delhi", true),
     pick("platform", "Platform", ["Instagram", "Facebook", "LinkedIn", "X (Twitter)"])], true),

  "cold-email-generator": tool("cold-email-gen",
    "Write a short cold email with a subject line, a personal opening, one clear value point and a simple call to action.",
    [text("recipient", "Who are you writing to?", "e.g. owner of a local dental clinic", true),
     area("offer", "What are you offering?", "e.g. website redesign that brings more patients", true),
     text("your_name", "Your name", "e.g. Aniket")], true),

  "email-generator": tool("email-gen",
    "Write a clear, ready-to-send email with a subject line.",
    [area("purpose", "What is the email about?", "e.g. ask my manager for two days of leave next week", true),
     text("recipient", "Who is it to?", "e.g. my manager, Mr. Sharma")], true),

  "ai-email-reply-generator": tool("email",
    "Write a suitable reply to the email below. Keep it concise and ready to send.",
    [area("received_email", "Paste the email you received", "Paste the email here", true),
     area("reply_points", "What do you want to say?", "e.g. accept the meeting, ask for Friday")], true),

  "daily-affirmation-generator": tool("affirmation-gen",
    "Write 7 short, believable daily affirmations.",
    [text("focus", "What do you need support with?", "e.g. confidence before exams", true)]),

  "daily-planner-generator": tool("planner-gen",
    "Create a realistic hour-by-hour plan for one day, with breaks.",
    [area("tasks", "Your tasks and goals for the day", "e.g. gym, 3 hours coding, client call at 4 pm, groceries", true),
     text("wake_time", "Wake-up time", "e.g. 6:30 am"),
     text("sleep_time", "Bed time", "e.g. 11 pm")]),

  "diet-plan-generator": tool("diet-gen",
    "Create a one-day sample diet plan with meals, portions and approximate calories. Add a short note that it is general guidance, not medical advice.",
    [num("age", "Age", "e.g. 24", true),
     num("weight_kg", "Weight (kg)", "e.g. 70", true),
     num("height_cm", "Height (cm)", "e.g. 170", true),
     pick("diet_type", "Diet type", ["Vegetarian", "Non-vegetarian", "Vegan", "Eggetarian"], true),
     pick("goal", "Goal", ["Lose weight", "Gain muscle", "Maintain weight"], true),
     pick("activity", "Activity level", ["Low", "Medium", "High"])]),

  "budget-planner": tool("budget",
    "Create a simple monthly budget with category amounts and saving tips.",
    [num("income", "Monthly income (Rs)", "e.g. 50000", true),
     num("rent", "Monthly rent (Rs)", "e.g. 15000"),
     area("other_expenses", "Other monthly expenses", "e.g. food 6000, travel 2000, phone 500"),
     num("savings_goal", "Monthly savings goal (Rs)", "e.g. 10000")]),

  "instagram-bio-generator": tool("caption",
    "Write 5 different Instagram bios, each under 150 characters, with line breaks, fitting emojis and a call to action.",
    [area("about", "What is your page about?", "e.g. fitness coach helping busy women stay strong", true),
     text("call_to_action", "Call to action", "e.g. Book a free call")], true),

  "business-name-generator": tool("biz-name-gen",
    "Suggest 15 short, memorable, brandable business names with a one-line reason each.",
    [area("business", "What is the business?", "e.g. organic skincare brand for men", true),
     text("keywords", "Keywords to include", "e.g. natural, fresh")]),

  "emoji-combiner": tool("emoji-combiner",
    "Combine the emojis or ideas below into 5 creative emoji combinations, each with a short meaning.",
    [text("ideas", "Emojis or idea", "e.g. fire + cat", true)]),

  "error-debugger": tool("debug",
    "Explain what this error means, the most likely cause, and give the exact fix with a short code example.",
    [area("error_or_code", "Paste the error or code", "Paste the error message and the related code", true),
     text("programming_language", "Language or framework", "e.g. JavaScript, React, Python")]),

  "excuse-generator": tool("excuse-gen",
    "Write 5 believable excuses, each one or two sentences.",
    [text("situation", "What do you need an excuse for?", "e.g. late to the team meeting", true)], true),

  "flashcard-generator": tool("flashcard",
    "Create 10 study flashcards from the material. Format each as Q: question, then A: answer.",
    [area("material", "Topic or notes", "Paste notes or name a topic, e.g. photosynthesis", true),
     pick("count", "How many cards?", ["5", "10", "20"])]),

  "grocery-list-generator": tool("grocery-gen",
    "Create a grouped grocery list (produce, dairy, grains, etc.) with quantities.",
    [area("meals_or_people", "Meals or people", "e.g. a week of vegetarian dinners for 2", true),
     num("people", "Number of people", "e.g. 2")]),

  "habit-tracker-generator": tool("habit-tracker",
    "Create a 30-day habit plan with weekly steps and a simple tracking table in text.",
    [text("habit", "Habit you want to build", "e.g. wake up at 6 am and walk daily", true),
     pick("duration", "How long?", ["14 days", "30 days", "60 days"])]),

  "homework-helper-ai": tool("homework",
    "Explain the answer step by step so a student can understand and learn from it.",
    [area("question", "Your question", "Type or paste the homework question", true),
     text("class_level", "Class or level", "e.g. Class 10, first-year B.Sc.")]),

  "interview-generator": tool("interview",
    "Write 10 likely interview questions with a short strong sample answer for each.",
    [text("role", "Role or company", "e.g. React developer fresher interview", true),
     pick("experience", "Experience level", ["Fresher", "1-3 years", "3+ years"])]),

  "ai-journal-prompt-generator": tool("journal",
    "Write 10 thoughtful journaling prompts.",
    [text("theme", "Theme", "e.g. gratitude and personal growth", true)]),

  "study-notes-mcq-generator": tool("mcq",
    "Create 10 multiple-choice questions with four options each. Mark the correct option and give a one-line explanation.",
    [area("material", "Topic or notes", "Paste notes or name a topic", true),
     pick("count", "How many questions?", ["5", "10", "20"])]),

  "notes-simplifier": tool("notes",
    "Rewrite the notes into a simple, well-organised summary with short bullet points.",
    [area("notes", "Paste your notes", "Paste the text you want simplified", true)]),

  "product-comparison": tool("compare",
    "Compare the products or options below: key differences, pros and cons of each, and a clear recommendation. Use a plain-text table where it helps.",
    [area("options", "What to compare?", "e.g. iPhone 15 vs Pixel 8", true),
     text("priorities", "What matters most to you?", "e.g. camera, battery, price")]),

  "product-description-generator": tool("product_description",
    "Write a persuasive product description with a headline, 5 benefit bullets and a closing line.",
    [text("product_name", "Product", "e.g. stainless steel water bottle", true),
     area("features", "Key features", "e.g. keeps drinks cold 24 hours, leak-proof", true)], true),

  "productivity-booster-plan": tool("productivity",
    "Create a practical productivity plan with a daily routine, focus techniques and weekly review steps.",
    [area("challenge", "Your challenge", "e.g. I get distracted while working from home", true),
     text("available_hours", "Hours you can work per day", "e.g. 6")]),

  "relationship-compatibility-checker": tool("compatibility-checker",
    "Write a fun, light-hearted compatibility reading. Make clear it is for entertainment.",
    [text("person_one", "First name or sign", "e.g. Aarav", true),
     text("person_two", "Second name or sign", "e.g. Meera", true)]),

  "screen-time-planner": tool("screentime",
    "Create a healthy daily screen-time plan with limits, offline activities and tips.",
    [area("situation", "Your situation", "e.g. student, about 7 hours on phone daily", true),
     num("daily_hours", "Current screen time per day (hours)", "e.g. 7")]),

  "self-intro-generator": tool("intro",
    "Write a confident self-introduction that can be spoken in about 45 seconds.",
    [area("about", "About you", "e.g. final-year B.Tech student, interested in web development", true)], true),

  "speech-script-generator": tool("speech-gen",
    "Write a complete speech script with an opening, main points and a closing.",
    [text("topic", "Speech topic", "e.g. farewell for a colleague", true),
     text("occasion", "Occasion", "e.g. office farewell party"),
     pick("duration", "Length", ["1 minute", "3 minutes", "5 minutes"])], true),

  "startup-validator": tool("startup-validator",
    "Evaluate this startup idea: problem, target market, competitors, risks, a score out of 10, and the next 3 steps.",
    [area("idea", "Your startup idea", "e.g. an app that finds home tutors in small towns", true),
     text("target_market", "Target customers", "e.g. parents in Tier-2 cities")]),

  "apna-startup": tool("startup",
    "Create a startup plan: name ideas, value proposition, target customers, revenue model and a 90-day launch roadmap.",
    [area("idea", "Your startup idea", "e.g. cloud kitchen for healthy tiffin", true),
     text("budget", "Starting budget", "e.g. Rs 2 lakh")]),

  "story-generator": tool("story-gen",
    "Write an engaging short story with a beginning, a turning point and an ending.",
    [area("idea", "Story idea", "e.g. a lighthouse keeper who finds a message in a bottle", true),
     pick("genre", "Genre", ["Fantasy", "Romance", "Thriller", "Comedy", "Kids"])], true),

  "study-time-calculator": tool("study-calc",
    "Create a weekly study timetable with hours per subject and revision slots.",
    [text("subjects", "Subjects", "e.g. Physics, Chemistry, Maths", true),
     date("exam_date", "Exam date", true),
     num("hours_per_day", "Study hours per day", "e.g. 5", true)]),

  "water-intake-calculator": tool("water",
    "Estimate daily water intake in litres with a simple schedule and tips. Add a short note that it is general guidance.",
    [num("weight_kg", "Weight (kg)", "e.g. 65", true),
     pick("activity", "Activity level", ["Low", "Moderate", "High"]),
     pick("climate", "Climate", ["Hot", "Moderate", "Cold"])]),

  "whatsapp-generator": tool("wa-gen",
    "Write 3 different WhatsApp messages ready to send, with fitting emojis.",
    [area("message_about", "What do you want to say?", "e.g. wish my friend a happy birthday", true),
     text("recipient", "Who is it to?", "e.g. my best friend")], true),

  "whatsapp-rewriter": tool("whatsapp",
    "Rewrite the message below so it reads better. Keep the meaning and give 3 versions.",
    [area("message", "Paste your message", "Paste the message you want rewritten", true)], true),

  "youtube-description-generator": tool("youtube_description",
    "Write an SEO-friendly YouTube description with a strong first two lines, a summary, timestamps placeholder and hashtags.",
    [text("video_topic", "Video topic", "e.g. beginner's guide to Next.js routing", true),
     text("keywords", "Keywords to include", "e.g. nextjs, react, tutorial")], true),

  "youtube-title-optimizer": tool("youtube-title",
    "Write 10 click-worthy but honest YouTube titles under 70 characters.",
    [text("video_topic", "Video topic", "e.g. how I built a website in 24 hours", true),
     text("keywords", "Keywords to include", "e.g. nextjs, website")]),
};

export const TONES = ["Professional", "Friendly", "Casual", "Persuasive", "Funny", "Formal", "Inspirational", "Simple"];

export const LANGUAGES = [
  "English", "Hindi", "Hinglish", "Marathi", "Bengali", "Tamil", "Telugu", "Gujarati",
  "Spanish", "French", "German", "Portuguese", "Arabic", "Indonesian",
];

/**
 * Builds the prompt from the values the user entered. Each value is written with its field label,
 * so the AI knows what it means. Empty optional fields are left out.
 */
export function buildAIPrompt(
  cfg: AIToolConfig,
  values: Record<string, string>,
  tone: string,
  language: string,
): string {
  const details = cfg.fields
    .map((field) => ({ label: field.label, value: (values[field.id] ?? "").trim() }))
    .filter((item) => item.value)
    .map((item) => `- ${item.label}: ${item.value}`);

  return [
    `Task: ${cfg.task}`,
    details.length ? "Details:" : "",
    ...details,
    cfg.showTone ? `Tone: ${tone}` : "",
    `Language: write the whole answer in ${language}.`,
    "Rules: return only the final result. No preface, no explanation of your process, no code fences around the whole answer.",
  ].filter(Boolean).join("\n");
}
