import { Component, Input, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-blog-content',
  standalone: true,
  imports: [CommonModule, MarkdownModule],
  template: `
    <article class="blog-content">
      <markdown [data]="content" class="prose" (ready)="onMarkdownReady()"></markdown>
    </article>
  `,
  styleUrl: './blog-content.component.scss'
})
export class BlogContentComponent {
  @Input({ required: true }) content!: string;

  constructor(private el: ElementRef) {}

  onMarkdownReady(): void {
    this.wrapTables();
  }

  private wrapTables(): void {
    const tables = this.el.nativeElement.querySelectorAll('table');
    tables.forEach((table: HTMLTableElement) => {
      // Skip if already wrapped
      if (table.parentElement?.classList.contains('table-container')) {
        return;
      }

      // Create wrapper div
      const wrapper = document.createElement('div');
      wrapper.className = 'table-container';

      // Wrap the table
      table.parentNode?.insertBefore(wrapper, table);
      wrapper.appendChild(table);
    });
  }
}
