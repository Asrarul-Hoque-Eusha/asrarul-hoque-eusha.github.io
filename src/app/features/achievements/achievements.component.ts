import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';
import { ContentService } from '../../core/services/content.service';
import { Achievement } from '../../core/models';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { FadeInDirective } from '../../shared/directives/fade-in.directive';

@Component({
  selector: 'app-achievements',
  standalone: true,
  imports: [CommonModule, TranslateModule, LucideAngularModule, SectionHeaderComponent, FadeInDirective],
  templateUrl: './achievements.component.html'
})
export class AchievementsComponent implements OnInit {
  private contentService = inject(ContentService);
  achievements = signal<Achievement[]>([]);

  ngOnInit() {
    this.contentService.getAchievements().subscribe(data => {
      this.achievements.set(data);
    });
  }
}
