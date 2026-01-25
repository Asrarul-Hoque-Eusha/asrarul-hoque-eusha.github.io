import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Profile } from '../../../../core/models';

@Component({
  selector: 'app-author-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card flex flex-col sm:flex-row gap-6">
      <!-- Avatar -->
      @if (profile.profileImage) {
        <img
          [src]="profile.profileImage"
          [alt]="profile.name"
          class="w-20 h-20 rounded-full object-cover flex-shrink-0"
        />
      }

      <div>
        <h3 class="font-bold text-lg text-text-primary-light dark:text-text-primary-dark">
          {{ profile.name }}
        </h3>
        <p class="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-3">
          {{ profile.title }}
        </p>
        <p class="text-text-secondary-light dark:text-text-secondary-dark mb-4">
          {{ profile.summary }}
        </p>

        <!-- Social Links -->
        <div class="flex gap-4">
          @if (profile.social.github) {
            <a [href]="profile.social.github" target="_blank" rel="noopener noreferrer" class="text-text-secondary-light dark:text-text-secondary-dark hover:text-accent">
              GitHub
            </a>
          }
          @if (profile.social.linkedin) {
            <a [href]="profile.social.linkedin" target="_blank" rel="noopener noreferrer" class="text-text-secondary-light dark:text-text-secondary-dark hover:text-accent">
              LinkedIn
            </a>
          }
          @if (profile.social.googleScholar) {
            <a [href]="profile.social.googleScholar" target="_blank" rel="noopener noreferrer" class="text-text-secondary-light dark:text-text-secondary-dark hover:text-accent">
              Google Scholar
            </a>
          }
        </div>
      </div>
    </div>
  `
})
export class AuthorCardComponent {
  @Input({ required: true }) profile!: Profile;
}
