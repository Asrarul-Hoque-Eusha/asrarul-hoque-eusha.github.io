import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ContentService } from '../../core/services/content.service';
import { SkillCategory } from '../../core/models';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { FadeInDirective } from '../../shared/directives/fade-in.directive';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, TranslateModule, SectionHeaderComponent, FadeInDirective],
  templateUrl: './skills.component.html'
})
export class SkillsComponent implements OnInit {
  private contentService = inject(ContentService);
  skills = signal<SkillCategory[]>([]);

  ngOnInit() {
    this.contentService.getSkills().subscribe(data => {
      this.skills.set(data);
    });
  }
}
