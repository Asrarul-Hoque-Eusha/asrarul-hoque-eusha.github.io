import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';
import { ThemeService } from '../../core/services/theme.service';
import { ScrollService } from '../../core/services/scroll.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, TranslateModule, LucideAngularModule],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  private themeService = inject(ThemeService);
  private scrollService = inject(ScrollService);
  private translateService = inject(TranslateService);

  theme = this.themeService.theme;
  activeSection = this.scrollService.activeSection;
  mobileMenuOpen = signal(false);
  currentLang = signal(this.translateService.currentLang || 'en');

  navItems: Array<{ label: string; section?: string; route?: string; type: 'scroll' | 'route' }> = [
    { label: 'nav.skills', section: 'skills', type: 'scroll' },
    { label: 'nav.projects', section: 'projects', type: 'scroll' },
    { label: 'nav.experience', section: 'experience', type: 'scroll' },
    { label: 'nav.education', section: 'education', type: 'scroll' },
    { label: 'nav.contact', section: 'contact', type: 'scroll' },
    { label: 'nav.blog', route: '/blog', type: 'route' }
  ];

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  toggleMobileMenu() {
    this.mobileMenuOpen.update(v => !v);
  }

  toggleLanguage() {
    const newLang = this.currentLang() === 'en' ? 'bn' : 'en';
    this.translateService.use(newLang);
    this.currentLang.set(newLang);
  }

  scrollTo(sectionId: string) {
    this.scrollService.scrollToSection(sectionId);
  }
}
