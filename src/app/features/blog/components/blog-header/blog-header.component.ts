import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogMeta } from '../../models/blog.model';
import { Profile } from '../../../../core/models';

@Component({
  selector: 'app-blog-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Title -->
    <h1 class="text-3xl md:text-4xl font-bold text-text-primary-light dark:text-text-primary-dark leading-tight">
      {{ meta.title }}
    </h1>

    <!-- Summary/Subtitle -->
    <p class="mt-4 text-lg md:text-xl text-text-secondary-light dark:text-text-secondary-dark">
      {{ meta.summary }}
    </p>

    <!-- Author Row -->
    <div class="flex items-center mt-6 gap-4">
      <!-- Avatar -->
      @if (profile?.profileImage) {
        <img
          [src]="profile!.profileImage"
          [alt]="profile!.name"
          class="w-12 h-12 rounded-full object-cover"
        />
      }

      <div class="flex-1">
        <p class="font-medium text-text-primary-light dark:text-text-primary-dark">
          {{ profile?.name }}
        </p>
        <p class="text-sm text-text-secondary-light dark:text-text-secondary-dark">
          {{ meta.readTime }} · {{ meta.date | date:'MMM d, yyyy' }}
        </p>
      </div>
    </div>
  `
})
export class BlogHeaderComponent {
  @Input({ required: true }) meta!: BlogMeta;
  @Input() profile?: Profile;
}
