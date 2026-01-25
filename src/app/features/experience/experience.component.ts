import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';
import { ContentService } from '../../core/services/content.service';
import { Experience } from '../../core/models';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { FadeInDirective } from '../../shared/directives/fade-in.directive';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, TranslateModule, LucideAngularModule, SectionHeaderComponent, FadeInDirective],
  templateUrl: './experience.component.html'
})
export class ExperienceComponent implements OnInit {
  private contentService = inject(ContentService);
  experiences = signal<Experience[]>([]);

  ngOnInit() {
    this.contentService.getExperience().subscribe(data => {
      this.experiences.set(data);
    });
  }

  formatDate(dateStr: string): string {
    if (dateStr === 'present') return dateStr;
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  }
}
