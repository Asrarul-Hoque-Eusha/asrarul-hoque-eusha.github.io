import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ContentService } from '../../core/services/content.service';
import { Profile } from '../../core/models';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { FadeInDirective } from '../../shared/directives/fade-in.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, TranslateModule, SectionHeaderComponent, FadeInDirective],
  templateUrl: './about.component.html'
})
export class AboutComponent implements OnInit {
  private contentService = inject(ContentService);
  profile = signal<Profile | null>(null);

  ngOnInit() {
    this.contentService.getProfile().subscribe(data => {
      this.profile.set(data);
    });
  }
}
