import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { BlogCardComponent } from '../../components/blog-card/blog-card.component';
import { TagFilterComponent } from '../../components/tag-filter/tag-filter.component';
import { BlogMeta } from '../../models/blog.model';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    BlogCardComponent,
    TagFilterComponent
  ],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.scss'
})
export class BlogListComponent implements OnInit {
  private blogService = inject(BlogService);

  blogs = signal<BlogMeta[]>([]);
  tags = signal<string[]>([]);
  activeTag = this.blogService.activeTag;

  ngOnInit() {
    this.loadBlogs();
    this.loadTags();
  }

  private loadBlogs() {
    this.blogService.getFilteredBlogs().subscribe(blogs => {
      this.blogs.set(blogs);
    });
  }

  private loadTags() {
    this.blogService.getAllTags().subscribe(tags => {
      this.tags.set(tags);
    });
  }

  onTagSelect(tag: string) {
    this.blogService.setActiveTag(tag);
    this.loadBlogs();
  }
}
