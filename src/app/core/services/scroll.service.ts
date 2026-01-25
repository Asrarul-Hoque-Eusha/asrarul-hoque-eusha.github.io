import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ScrollService {
  private _activeSection = signal<string>('hero');
  activeSection = this._activeSection.asReadonly();

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  setActiveSection(sectionId: string) {
    this._activeSection.set(sectionId);
  }
}
