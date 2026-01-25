import { Injectable } from '@angular/core';

declare const gtag: Function;

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  trackSectionView(sectionName: string) {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'section_view', { section_name: sectionName });
    }
  }

  trackClick(action: string, label: string) {
    if (typeof gtag !== 'undefined') {
      gtag('event', action, { event_label: label });
    }
  }
}
