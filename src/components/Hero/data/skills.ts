/**
 * Skills Data
 *
 * Shared data structure for skills displayed in both
 * SkillsPanel (desktop) and MobileSkillsDropdown (mobile).
 */

export interface ImageInfo {
  publicId: string;
  alt: string;
  title: string;
  caption: string;
}

export interface SkillInfo {
  name: string;
  title: string;
  description: string;
  skills: string[];
  images: ImageInfo[];
}

export const SKILLS: SkillInfo[] = [
  {
    name: 'Frontend Engineering',
    title: 'Production-ready execution',
    description: 'I eliminate the design-to-code gap by engineering pixel-perfect interfaces directly in React and Flutter. I focus on component reusability and performance, shipping high-fidelity UI that functions as well as it looks.',
    skills: ['TypeScript', 'React', 'Next.js', 'Flutter', 'Tailwind CSS'],
    images: [
      { publicId: 'v1755074582/hack_dtm0q6.png', alt: 'Hackathon coding session with developers working in a room with large screens displaying code while a team member presents', title: 'Engineering', caption: 'Collaborting with Product Managers, Developers, Founders at Harvard Innovation Labs' }
    ]
  },
  {
    name: 'Product Design',
    title: 'Systems that scale',
    description: 'I create scalable design systems using tokens and atomic components that translate cleanly into code. My work prioritizes logical structure and maintainability, ensuring the final product matches the design intent without friction.',
    skills: ['Figma', 'Design Systems', 'Information Architecture', 'Interaction Design'],
    images: [
      { publicId: 'v1766960197/bpl_sovi44.png', alt: 'Team collaboration session with three people discussing design work around a table with laptops in a modern office space', title: 'Product Design', caption: 'Designing website for Bentley University x IxDF Designathon focused on Sustainability' }
    ]
  },
  {
    name: 'Accessibility',
    title: 'Inclusive by default',
    description: 'I engineer for inclusivity by treating WCAG guidelines as a core architectural requirement. My approach uses semantic HTML and rigorous testing to ensure seamless navigation and usability for assistive technology users.',
    skills: ['WCAG 2.2 AA', 'Semantic HTML', 'axe DevTools', 'Assistive Tech'],
    images: [
      { publicId: 'v1766964645/accessibility_pj5yw0.png', alt: 'Accessibility audit dashboard showing WCAG compliance scores and testing results', title: 'Auditing', caption: '' }
    ]
  },
  {
    name: 'Side Hacks',
    title: 'Full-stack intelligence',
    description: 'I extend my capabilities to the backend by architecting RAG-powered tools and integrating LLMs. Using Python and modern data stacks, I rapidly turn complex concepts into functional, intelligent applications.',
    skills: ['Python', 'FastAPI', 'RAG Architecture', 'Vector DBs', 'LLM Integration'],
    images: [
      { publicId: 'v1755074594/hackwin_q1xfde.png', alt: 'Hackathon winning team of four people on stage receiving an award at a Women in AI hackathon event', title: 'AI Integration', caption: 'Impact Award Winner at Women in AI Hackathon, AWS. Developed an AI-powered Influencer Management System.' }
    ]
  }
];
