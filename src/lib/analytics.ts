/**
 * Google Analytics Event Tracking Utility
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type EventCategory = 'cta' | 'social' | 'navigation' | 'skills' | 'video';

interface TrackEventParams {
  category: EventCategory;
  action: string;
  label?: string;
}

/**
 * Track a custom event in Google Analytics
 */
export function trackEvent({ category, action, label }: TrackEventParams): void {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
    });
  }
}

// Pre-defined tracking functions for common events
export const analytics = {
  // CTA clicks
  trackViewWork: () => trackEvent({ category: 'cta', action: 'click_view_work', label: 'View Work Button' }),
  trackResume: () => trackEvent({ category: 'cta', action: 'click_resume', label: 'Resume Button' }),

  // Social links
  trackLinkedIn: () => trackEvent({ category: 'social', action: 'click_linkedin', label: 'LinkedIn' }),
  trackGitHub: () => trackEvent({ category: 'social', action: 'click_github', label: 'GitHub' }),
  trackInstagram: () => trackEvent({ category: 'social', action: 'click_instagram', label: 'Instagram' }),
  trackEmail: () => trackEvent({ category: 'social', action: 'click_email', label: 'Email' }),

  // Navigation
  trackAboutMe: () => trackEvent({ category: 'navigation', action: 'click_about_me', label: 'About Me Link' }),
  trackHowCanIHelp: () => trackEvent({ category: 'navigation', action: 'click_how_can_i_help', label: 'How Can I Help Button' }),

  // Skills panel
  trackSkillTab: (skillName: string) => trackEvent({ category: 'skills', action: 'click_skill_tab', label: skillName }),
  trackMobileSkillSelect: (skillName: string) => trackEvent({ category: 'skills', action: 'select_mobile_skill', label: skillName }),

  // Video player
  trackVideoPlay: (videoName: string) => trackEvent({ category: 'video', action: 'video_play', label: videoName }),
  trackVideoPause: (videoName: string) => trackEvent({ category: 'video', action: 'video_pause', label: videoName }),
  trackVideoEnded: (videoName: string) => trackEvent({ category: 'video', action: 'video_ended', label: videoName }),
};
