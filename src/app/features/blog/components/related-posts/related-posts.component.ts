import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BlogMeta } from '../../models/blog.model';

@Component({
  selector: 'app-related-posts',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div>
      <h3 class="text-xl font-bold text-text-primary-light dark:text-text-primary-dark mb-6">
        Related Posts
      </h3>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        @for (post of posts; track post.id) {
          <a [routerLink]="['/blog', post.slug]" class="card group hover:border-accent transition-colors">
            <h4 class="font-semibold text-text-primary-light dark:text-text-primary-dark group-hover:text-accent transition-colors line-clamp-2">
              {{ post.title }}
            </h4>
            <p class="text-sm text-text-secondary-light dark:text-text-secondary-dark mt-2 line-clamp-2">
              {{ post.summary }}
            </p>
            <p class="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-3">
              {{ post.readTime }} · {{ post.date | date:'MMM d, yyyy' }}
            </p>
          </a>
        }
      </div>
    </div>
  `
})
export class RelatedPostsComponent {
  @Input({ required: true }) posts!: BlogMeta[];
}
