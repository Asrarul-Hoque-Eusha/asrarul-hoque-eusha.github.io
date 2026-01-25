import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';
import { ContentService } from '../../core/services/content.service';
import { Project } from '../../core/models';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { FadeInDirective } from '../../shared/directives/fade-in.directive';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, TranslateModule, LucideAngularModule, SectionHeaderComponent, FadeInDirective],
  templateUrl: './projects.component.html'
})
export class ProjectsComponent implements OnInit {
  private contentService = inject(ContentService);
  projects = signal<Project[]>([]);

  ngOnInit() {
    this.contentService.getProjects().subscribe(data => {
      this.projects.set(data);
    });
  }
}
