/**
 * Google Analytics event tracking utility
 * Only tracks in production (excludes localhost)
 */

const isProduction = () => {
  if (typeof window === 'undefined') return false;
  const hostname = window.location.hostname;
  return hostname !== 'localhost' && hostname !== '127.0.0.1';
};

/**
 * Track a custom event in Google Analytics
 */
export const trackEvent = (
  eventName: string,
  params?: Record<string, string | number | boolean>
) => {
  if (!isProduction()) return;

  if (typeof window !== 'undefined' && 'gtag' in window) {
    (window as typeof window & { gtag: (...args: unknown[]) => void }).gtag(
      'event',
      eventName,
      params
    );
  }
};

/**
 * Pre-defined tracking functions for common interactions
 */
export const analytics = {
  // Navigation
  trackAboutMe: () => trackEvent('click', { category: 'navigation', label: 'about_me' }),
  trackViewWork: () => trackEvent('click', { category: 'navigation', label: 'view_work' }),
  trackProcess: () => trackEvent('click', { category: 'navigation', label: 'learn_process' }),

  // Social Links
  trackLinkedIn: () => trackEvent('click', { category: 'social', label: 'linkedin' }),
  trackGitHub: () => trackEvent('click', { category: 'social', label: 'github' }),
  trackInstagram: () => trackEvent('click', { category: 'social', label: 'instagram' }),
  trackTwitter: () => trackEvent('click', { category: 'social', label: 'twitter' }),
  trackEmail: () => trackEvent('click', { category: 'social', label: 'email' }),

  // CTA
  trackResume: () => trackEvent('click', { category: 'cta', label: 'resume_download' }),
  trackHowCanIHelp: () => trackEvent('click', { category: 'cta', label: 'how_can_i_help' }),

  // Skills Panel
  trackSkillTab: (skillName: string) => trackEvent('skill_select', { category: 'skills', label: skillName }),
  trackSkillsClose: () => trackEvent('click', { category: 'skills', label: 'close_panel' }),

  // Mobile Skills
  trackMobileSkillSelect: (skillName: string) => trackEvent('mobile_skill_select', { category: 'skills', label: skillName }),
  trackMobileSkillClear: () => trackEvent('click', { category: 'skills', label: 'mobile_clear_selection' }),

  // About Showcase
  trackBookClick: (bookTitle: string) => trackEvent('click', { category: 'books', label: bookTitle }),
  trackVideoPlay: () => trackEvent('video_play', { category: 'video', label: 'adventure_video' }),
  trackVideoPause: () => trackEvent('video_pause', { category: 'video', label: 'adventure_video' }),
  trackVideoEnded: () => trackEvent('video_ended', { category: 'video', label: 'adventure_video' }),

  // Process Page
  trackProcessStage: (stageName: string) => trackEvent('process_stage', { category: 'process', label: stageName }),
};
