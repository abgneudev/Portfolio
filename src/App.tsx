import React from 'react';
import Navigation from './components/Navigation/Navigation.tsx';
import HomePage from './pages/HomePage/HomePage.tsx';

import ProjectPage from './pages/ProjectPage/ProjectPage.tsx';
import AboutPage from './pages/AboutPage/AboutPage.tsx';
import Footer from './components/Footer/Footer.tsx';
import type { Project } from './types/index';
import './styles/globals.css';
import './App.css';

// Sample project data
const projects: Project[] = [
  {
    id: 'vinoteca',
    title: 'Vinoteca Wine Platform',
    category: 'E-commerce',
    year: '2024',
    description: 'Transforming wine discovery through personalized shopping experiences',
    thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    metrics: {
      primary: { value: '+68%', label: 'Conversion Rate' },
      secondary: { value: '$2.3M', label: 'Revenue Recovered' }
    },
    details: {
      hero: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&h=900&fit=crop',
      challenge: 'Wine enthusiasts struggled to discover new wines online, leading to 47% cart abandonment.',
      approach: 'Created an AI-powered recommendation engine with immersive storytelling.',
      outcome: 'Increased conversion rates by 68% and recovered $2.3M in lost revenue.',
      gallery: [],
      tools: ['Figma', 'React', 'TypeScript', 'Node.js'],
      duration: '3 months',
      role: 'Lead Product Designer',
      team: ['2 Engineers', '1 PM', '1 Data Scientist']
    },
    color: '#5B21B6'
  }
];

interface AppState {
  currentPage: 'home' | 'project' | 'about';
  selectedProject: string | null;
}

const App: React.FC = () => {
  const [state, setState] = React.useState<AppState>({
    currentPage: 'home',
    selectedProject: null
  });

  const navigateTo = (page: AppState['currentPage'], projectId?: string) => {
    setState({
      currentPage: page,
      selectedProject: projectId || null
    });
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (state.currentPage) {
      case 'project': {
        const project = projects.find(p => p.id === state.selectedProject);
        return project ? (
          <ProjectPage project={project} onBack={() => navigateTo('home')} />
        ) : (
          <HomePage onProjectClick={(id: string) => navigateTo('project', id)} />
        );
      }
      case 'about':
        return <AboutPage />;
      default:
        return <HomePage onProjectClick={(id: string) => navigateTo('project', id)} />;
    }
  };

  return (
    <div className="app">
      <a href="#main" className="skip-link">Skip to main content</a>
      
      <Navigation 
        currentPage={state.currentPage}
        onNavigate={navigateTo}
      />
      
      <main id="main" className="main-content" role="main">
        {renderPage()}
      </main>
      
      <Footer />
    </div>
  );
};

// ...existing code...

export default App;