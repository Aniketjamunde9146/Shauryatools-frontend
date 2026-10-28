import type { Tool } from "@/data/toolsData";
import { getGroup, isAiTool } from "@/lib/toolMeta";

export interface Faq {
  question: string;
  answer: string;
}

export interface ToolContent {
  /** Short, self-contained answer to "what is this?". Written so it can be quoted on its own by search and AI answers. */
  summary: string;
  steps: string[];
  faqs: Faq[];
}

const STEPS: Record<string, (name: string) => string[]> = {
  developer: (n) => [
    `Paste or type your code or data into the ${n} input.`,
    `Choose any options the tool offers, then run it.`,
    `Copy the result or download it and use it in your project.`,
  ],
  calculators: (n) => [
    `Enter your numbers in the ${n} fields.`,
    `Review the result, which updates from the values you entered.`,
    `Change an input to compare scenarios side by side.`,
  ],
  "ai-writing": (n) => [
    `Fill in the details the ${n} asks for, such as topic, tone or audience.`,
    `Generate the draft.`,
    `Edit the result so it sounds like you, then copy it.`,
  ],
  social: (n) => [
    `Describe your post, niche or topic in the ${n}.`,
    `Generate options and pick the ones that fit your voice.`,
    `Copy your favourite and paste it into the app.`,
  ],
  design: (n) => [
    `Upload your image or choose a file for the ${n}.`,
    `Adjust the settings and check the preview.`,
    `Download the finished file.`,
  ],
  seo: (n) => [
    `Enter your page details or URL in the ${n}.`,
    `Generate or analyse the output.`,
    `Copy the markup or recommendations into your site, then re-test.`,
  ],
  students: (n) => [
    `Enter your subject, notes or schedule in the ${n}.`,
    `Generate or update your plan.`,
    `Save, copy or print the result and use it today.`,
  ],
  health: (n) => [
    `Enter the measurements or details the ${n} asks for.`,
    `Read the result and the explanation next to it.`,
    `Use it as a general guide and speak to a professional for personal advice.`,
  ],
  utilities: (n) => [
    `Open the ${n} and enter your input.`,
    `Adjust the options if you need to.`,
    `Copy or download the result.`,
  ],
};

const GROUP_QUESTION: Record<string, (n: string) => Faq> = {
  developer: (n) => ({
    question: `Can I use the ${n} for production code and data?`,
    answer: `Yes for most everyday work, but always review the output and run your own tests before shipping it. Avoid pasting secrets, passwords or private keys into any online tool.`,
  }),
  calculators: (n) => ({
    question: `How accurate is the ${n}?`,
    answer: `It applies standard formulas to the numbers you enter, so the result is only as accurate as your inputs. Treat it as an estimate for planning, and confirm important figures with your bank, tax advisor or the official source.`,
  }),
  "ai-writing": (n) => ({
    question: `Should I edit what the ${n} writes?`,
    answer: `Yes. Treat the output as a strong first draft. Check names, facts and tone, and add personal details before you send or publish it.`,
  }),
  social: (n) => ({
    question: `Does the ${n} guarantee more reach?`,
    answer: `No tool can guarantee reach. It gives you ideas and structure quickly, and results still depend on your content, audience and timing.`,
  }),
  design: (n) => ({
    question: `Will the ${n} change my original file?`,
    answer: `No. It produces a new file for you to download, so your original image stays untouched on your device.`,
  }),
  seo: (n) => ({
    question: `Will the ${n} improve my rankings by itself?`,
    answer: `It helps you get technical details right, but rankings depend on many factors, including content quality, links and site speed. Use it as one step in a broader SEO routine.`,
  }),
  students: (n) => ({
    question: `Is the ${n} suitable for exam preparation?`,
    answer: `It is a study aid, not a replacement for your syllabus or teacher. Use it to organise your time and revise, and check facts against your textbook.`,
  }),
  health: (n) => ({
    question: `Is the ${n} medical advice?`,
    answer: `No. It provides general information only. For decisions about your health, diet or medication, talk to a qualified healthcare professional.`,
  }),
  utilities: (n) => ({
    question: `Does the ${n} work on mobile?`,
    answer: `Yes. The page is responsive and works in any modern mobile or desktop browser.`,
  }),
};

/** Browser-only tools that still contact an outside service. Keep in sync with the tool code. */
const THIRD_PARTY: Record<string, string> = {
  "page-speed-analyzer": "the URL you enter is sent to Google's PageSpeed Insights service to be analysed",
  "passport-photo-maker": "the optional background-removal step sends your photo to remove.bg using your own API key",
};

/** Questions specific to one tool, shown after the standard five. */
const EXTRA_FAQS: Record<string, Faq[]> = {
  "jwt-decoder": [
    {
      question: "Does decoding a JWT verify it?",
      answer:
        "No. Decoding only reads the header and payload, which are Base64URL-encoded, not encrypted. Verifying the signature needs the secret or public key and must be done by your server. Never trust the contents of a token you have not verified.",
    },
    {
      question: "Is it safe to paste a JWT into an online decoder?",
      answer:
        "This decoder runs in your browser and does not send the token anywhere. Even so, treat live tokens like passwords: prefer expired or test tokens, and never share an active access token.",
    },
    {
      question: "What do exp, nbf and iat mean in a JWT?",
      answer:
        "exp is when the token expires, nbf is the time before which it must not be accepted, and iat is when it was issued. All three are Unix timestamps in seconds, and this tool shows them as readable dates.",
    },
  ],
};

export function getToolContent(tool: Tool): ToolContent {
  const group = getGroup(tool).id;
  const name = tool.name;
  const ai = isAiTool(tool.slug);

  const thirdParty = THIRD_PARTY[tool.slug];
  const privacy: Faq = {
    question: `Is my data safe when I use the ${name}?`,
    answer: ai
      ? `The ${name} sends what you type to an AI service to generate the result, so avoid entering passwords, financial details or other sensitive information. No account is needed.`
      : thirdParty
        ? `The ${name} runs in your browser, with one exception: ${thirdParty}. No account is needed on ShauryaTools.`
        : `The ${name} runs in your browser, so what you enter is not sent to our servers. No account is needed.`,
  };

  return {
    summary: `${name} is a free online tool on ShauryaTools. ${tool.description}`,
    steps: (STEPS[group] ?? STEPS.utilities)(name),
    faqs: [
      {
        question: `What is the ${name}?`,
        answer: `${name} is a free online tool on ShauryaTools. ${tool.description}`,
      },
      {
        question: `How do I use the ${name}?`,
        answer: (STEPS[group] ?? STEPS.utilities)(name)
          .map((step, i) => `${i + 1}. ${step}`)
          .join(" "),
      },
      {
        question: `Is the ${name} free? Do I need to sign up?`,
        answer: `Yes, the ${name} is free to use and does not require an account or sign-up.`,
      },
      privacy,
      (GROUP_QUESTION[group] ?? GROUP_QUESTION.utilities)(name),
      ...(EXTRA_FAQS[tool.slug] ?? []),
    ],
  };
}
