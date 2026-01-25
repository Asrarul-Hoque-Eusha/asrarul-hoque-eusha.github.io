import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';
import { ContentService } from '../../core/services/content.service';
import { Research } from '../../core/models';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { FadeInDirective } from '../../shared/directives/fade-in.directive';

@Component({
  selector: 'app-research',
  standalone: true,
  imports: [CommonModule, TranslateModule, LucideAngularModule, SectionHeaderComponent, FadeInDirective],
  templateUrl: './research.component.html'
})
export class ResearchComponent implements OnInit {
  private contentService = inject(ContentService);
  researches = signal<Research[]>([]);

  ngOnInit() {
    this.contentService.getResearch().subscribe(data => {
      this.researches.set(data);
    });
  }
}
