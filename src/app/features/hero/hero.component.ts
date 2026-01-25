import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';
import { ContentService } from '../../core/services/content.service';
import { Profile } from '../../core/models';
import { FadeInDirective } from '../../shared/directives/fade-in.directive';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, TranslateModule, LucideAngularModule, FadeInDirective],
  templateUrl: './hero.component.html'
})
export class HeroComponent implements OnInit {
  private contentService = inject(ContentService);
  profile = signal<Profile | null>(null);
  imageError = signal<boolean>(false);

  ngOnInit() {
    this.contentService.getProfile().subscribe(data => {
      this.profile.set(data);
    });
  }

  getInitials(name?: string): string {
    if (!name) return '';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  onImageError() {
    this.imageError.set(true);
  }
}
