import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';
import { ContentService } from '../../core/services/content.service';
import { Profile } from '../../core/models';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { FadeInDirective } from '../../shared/directives/fade-in.directive';
import { ScrollService } from '../../core/services/scroll.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, TranslateModule, LucideAngularModule, SectionHeaderComponent, FadeInDirective],
  templateUrl: './contact.component.html'
})
export class ContactComponent implements OnInit {
  private contentService = inject(ContentService);
  private scrollService = inject(ScrollService);
  profile = signal<Profile | null>(null);
  currentYear = new Date().getFullYear();

  // Form state
  formData = {
    name: '',
    email: '',
    message: ''
  };
  formSubmitted = signal(false);

  sectionLinks = [
    { label: 'Skills', section: 'skills' },
    { label: 'Projects', section: 'projects' },
    { label: 'Experience', section: 'experience' },
    { label: 'Achievements', section: 'achievements' },
    { label: 'Certifications', section: 'certifications' },
    { label: 'Education', section: 'education' },
    { label: 'Research', section: 'research' },
    { label: 'About', section: 'about' }
  ];

  ngOnInit() {
    this.contentService.getProfile().subscribe(data => {
      this.profile.set(data);
    });
  }

  scrollTo(sectionId: string) {
    this.scrollService.scrollToSection(sectionId);
  }
}
