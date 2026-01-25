import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tag-filter',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-wrap gap-2 overflow-x-auto pb-2 scrollbar-hide">
      @for (tag of tags; track tag) {
        <button
          (click)="tagSelected.emit(tag)"
          [class]="getTagClasses(tag)"
        >
          {{ tag }}
        </button>
      }
    </div>
  `,
  styles: [`
    .scrollbar-hide::-webkit-scrollbar { display: none; }
    .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
  `]
})
export class TagFilterComponent {
  @Input() tags: string[] = [];
  @Input() activeTag = 'All';
  @Output() tagSelected = new EventEmitter<string>();

  getTagClasses(tag: string): string {
    const base = 'px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap';
    if (tag === this.activeTag) {
      return `${base} bg-accent text-white`;
    }
    return `${base} bg-surface-light dark:bg-surface-dark text-text-primary-light dark:text-text-primary-dark hover:bg-accent/10 border border-border-light dark:border-border-dark`;
  }
}
