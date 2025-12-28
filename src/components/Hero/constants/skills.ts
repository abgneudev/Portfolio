/**
 * Skills Data
 *
 * Defines the skill cards displayed in the hero section.
 * Each skill has theme colors, images, and precomputed yOffset for animation.
 */

export interface SkillTheme {
  bg: string;
  accent: string;
}

export interface Skill {
  name: string;
  desc: string;
  score: number;
  theme: SkillTheme;
  images: string[];
  yOffset: number;
}

export const SKILLS: Skill[] = [
  {
    name: 'UI/UX Design',
    desc: 'User-centered product experiences',
    score: 95,
    theme: { bg: '#1a1a2e', accent: '#e94560' },
    images: [
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400',
      'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400',
      'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=400'
    ],
    yOffset: Math.sin(0)
  },
  {
    name: 'React',
    desc: 'Component architecture & hooks',
    score: 90,
    theme: { bg: '#20232a', accent: '#61dafb' },
    images: [
      'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400',
      'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=400',
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400'
    ],
    yOffset: Math.sin(1.5)
  },
  {
    name: 'TypeScript',
    desc: 'Type-safe applications',
    score: 85,
    theme: { bg: '#1e1e1e', accent: '#3178c6' },
    images: [
      'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400',
      'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=400',
      'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=400'
    ],
    yOffset: Math.sin(3.0)
  },
  {
    name: 'Design Systems',
    desc: 'Scalable component libraries',
    score: 92,
    theme: { bg: '#2d1b69', accent: '#f72585' },
    images: [
      'https://images.unsplash.com/photo-1618788372246-79faff0c3742?w=400',
      'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400',
      'https://images.unsplash.com/photo-1545235617-9465d2a55698?w=400'
    ],
    yOffset: Math.sin(4.5)
  },
  {
    name: 'Flutter',
    desc: 'Cross-platform mobile apps',
    score: 80,
    theme: { bg: '#042b59', accent: '#54c5f8' },
    images: [
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400',
      'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400',
      'https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=400'
    ],
    yOffset: Math.sin(6.0)
  },
  {
    name: 'Figma',
    desc: 'Prototypes & design specs',
    score: 94,
    theme: { bg: '#1e1e1e', accent: '#a259ff' },
    images: [
      'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=400',
      'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=400',
      'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400'
    ],
    yOffset: Math.sin(7.5)
  },
  {
    name: 'Accessibility',
    desc: 'WCAG compliant interfaces',
    score: 88,
    theme: { bg: '#0a1628', accent: '#0077b6' },
    images: [
      'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400',
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400',
      'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400'
    ],
    yOffset: Math.sin(9.0)
  },
  {
    name: 'Python',
    desc: 'Backend & data processing',
    score: 82,
    theme: { bg: '#1a1a1a', accent: '#ffd43b' },
    images: [
      'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400',
      'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400',
      'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400'
    ],
    yOffset: Math.sin(10.5)
  },
];
