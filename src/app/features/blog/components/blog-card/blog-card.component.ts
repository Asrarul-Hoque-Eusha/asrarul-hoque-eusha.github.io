import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BlogMeta } from '../../models/blog.model';

@Component({
  selector: 'app-blog-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <article class="card group cursor-pointer hover:border-accent transition-colors duration-200">
      <a [routerLink]="['/blog', blog.slug]" class="block">
        <!-- Cover Image -->
        @if (blog.coverImage) {
          <div class="aspect-video mb-4 overflow-hidden rounded-lg bg-surface-light dark:bg-background-dark">
            <img
              [src]="blog.coverImage"
              [alt]="blog.title"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </div>
        }

        <!-- Tags -->
        <div class="flex flex-wrap gap-2 mb-3">
          @for (tag of blog.tags.slice(0, 3); track tag) {
            <span class="px-2 py-1 text-xs font-medium rounded-full bg-accent/10 text-accent">
              {{ tag }}
            </span>
          }
        </div>

        <!-- Title -->
        <h2 class="text-lg font-bold text-text-primary-light dark:text-text-primary-dark mb-2 line-clamp-2 group-hover:text-accent transition-colors">
          {{ blog.title }}
        </h2>

        <!-- Summary -->
        <p class="text-text-secondary-light dark:text-text-secondary-dark text-sm line-clamp-2 mb-4">
          {{ blog.summary }}
        </p>

        <!-- Meta -->
        <div class="flex items-center text-xs text-text-secondary-light dark:text-text-secondary-dark">
          <span>{{ blog.date | date:'MMM d, yyyy' }}</span>
          <span class="mx-2">·</span>
          <span>{{ blog.readTime }}</span>
        </div>
      </a>
    </article>
  `
})
export class BlogCardComponent {
  @Input({ required: true }) blog!: BlogMeta;
}
