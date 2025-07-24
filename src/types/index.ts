// Make sure to export the interface
export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  description: string;
  thumbnail: string;
  metrics: {
    primary: { value: string; label: string };
    secondary?: { value: string; label: string };
  };
  details: {
    hero: string;
    challenge: string;
    approach: string;
    outcome: string;
    gallery: string[];
    tools: string[];
    duration: string;
    role: string;
    team?: string[];
  };
  color: string;
}