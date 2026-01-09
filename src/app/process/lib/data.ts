/**
 * Human-System Coupling: A Design Process Framework
 * Maps the user journey from research to referral
 */

export interface Stage {
  id: number;
  name: string;
  subtitle: string;
  designFor: string;
  tasks: string[];
  outcomes: string[];
  question: string;
}

export interface TimelineStage {
  num: number;
  label: string;
}

export const timelineStages: TimelineStage[] = [
  { num: 0, label: "Discovery" },
  { num: 1, label: "Onboarding" },
  { num: 2, label: "Learning" },
  { num: 3, label: "Retention" },
  { num: 4, label: "Mastery" },
  { num: 5, label: "Growth" },
];

export const stages: Stage[] = [
  {
    id: 0,
    name: "Discovery",
    subtitle: "Research users before building. Understand the problem space.",
    designFor: "User understanding",
    tasks: [
      "Conduct user interviews and contextual inquiry",
      "Audit competitor UX patterns",
      "Map user journeys and pain points",
      "Define personas and jobs-to-be-done",
    ],
    outcomes: [
      "User personas",
      "Competitive analysis",
      "Journey maps",
      "Research synthesis",
    ],
    question: "What problem are we actually solving?",
  },
  {
    id: 1,
    name: "Onboarding",
    subtitle: "First impression. Value must land before doubt sets in.",
    designFor: "Time to first value",
    tasks: [
      "Design the 30-second aha moment",
      "Minimize steps to first task completion",
      "Create progressive onboarding flows",
      "Design empty states that guide action",
    ],
    outcomes: [
      "Time to value",
      "Activation rate",
      "Onboarding completion",
      "First-session drop-off",
    ],
    question: "How fast can they feel successful?",
  },
  {
    id: 2,
    name: "Learning",
    subtitle: "Users explore boundaries. Build trust through feedback.",
    designFor: "Learnability & error recovery",
    tasks: [
      "Design error states that educate",
      "Build progressive disclosure patterns",
      "Create contextual help and tooltips",
      "Make system status visible",
    ],
    outcomes: [
      "Task success rate",
      "Error recovery rate",
      "Feature discovery %",
      "Support ticket volume",
    ],
    question: "When they fail, do they learn or leave?",
  },
  {
    id: 3,
    name: "Retention",
    subtitle: "Habits form. The core loop becomes automatic.",
    designFor: "Engagement & habit formation",
    tasks: [
      "Optimize high-frequency user flows",
      "Design notification and re-engagement triggers",
      "Reduce friction on repeat actions",
    ],
    outcomes: [
      "D1 / D7 / D30 retention",
      "DAU / MAU ratio",
      "Session frequency",
      "Core action repeat rate",
    ],
    question: "Why would they come back tomorrow?",
  },
  {
    id: 4,
    name: "Mastery",
    subtitle: "The interface disappears. Tool becomes cognitive extension.",
    designFor: "Flow state & power users",
    tasks: [
      "Design keyboard shortcuts and power features",
      "Build customization and personalization",
      "Create templates and saved workflows",
      "Anticipate needs through smart defaults",
    ],
    outcomes: [
      "Task completion time",
      "Power feature adoption",
      "Workflow integration",
      "NPS / CSAT scores",
    ],
    question: "Does the tool disappear into the task?",
  },
  {
    id: 5,
    name: "Growth",
    subtitle: "Value becomes shareable. Users become advocates.",
    designFor: "Virality & network effects",
    tasks: [
      "Design shareable outputs and artifacts",
      "Build collaboration and invite flows",
      "Create referral incentives",
      "Make sharing feel valuable, not spammy",
    ],
    outcomes: [
      "Viral coefficient (k)",
      "Invite conversion rate",
      "Organic referral %",
      "User-generated content volume",
    ],
    question: "Would they recommend this unprompted?",
  },
];