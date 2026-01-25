import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, shareReplay, switchMap } from 'rxjs';
import { BlogMeta, BlogContent } from '../models/blog.model';
import { ContentService } from '../../../core/services/content.service';
import { Profile } from '../../../core/models';

@Injectable({ providedIn: 'root' })
export class BlogService {
  private http = inject(HttpClient);
  private contentService = inject(ContentService);

  private blogsCache$?: Observable<BlogMeta[]>;

  // Signal for active tag filter
  private _activeTag = signal<string>('All');
  activeTag = this._activeTag.asReadonly();

  getBlogs(): Observable<BlogMeta[]> {
    if (!this.blogsCache$) {
      this.blogsCache$ = this.http
        .get<BlogMeta[]>('./assets/data/blogs.json')
        .pipe(shareReplay(1));
    }
    return this.blogsCache$;
  }

  getBlogBySlug(slug: string): Observable<BlogContent> {
    return this.getBlogs().pipe(
      map(blogs => blogs.find(b => b.slug === slug)),
      switchMap(meta => {
        if (!meta) throw new Error(`Blog not found: ${slug}`);
        return this.http.get<BlogContent>(meta.contentFile);
      }),
      shareReplay(1)
    );
  }

  getBlogContent(contentFile: string): Observable<BlogContent> {
    return this.http.get<BlogContent>(contentFile);
  }

  /**
   * Get author info from profile.json via ContentService
   * Author is always the portfolio owner
   */
  getAuthor(): Observable<Profile> {
    return this.contentService.getProfile();
  }

  getAllTags(): Observable<string[]> {
    return this.getBlogs().pipe(
      map(blogs => {
        const tags = new Set<string>();
        blogs.forEach(blog => blog.tags.forEach(tag => tags.add(tag)));
        return ['All', ...Array.from(tags).sort()];
      })
    );
  }

  setActiveTag(tag: string) {
    this._activeTag.set(tag);
  }

  getFilteredBlogs(): Observable<BlogMeta[]> {
    return this.getBlogs().pipe(
      map(blogs => {
        const tag = this._activeTag();
        if (tag === 'All') return blogs;
        return blogs.filter(blog => blog.tags.includes(tag));
      })
    );
  }

  getRelatedPosts(currentSlug: string, tags: string[], limit = 2): Observable<BlogMeta[]> {
    return this.getBlogs().pipe(
      map(blogs => blogs
        .filter(blog => blog.slug !== currentSlug)
        .filter(blog => blog.tags.some(tag => tags.includes(tag)))
        .slice(0, limit)
      )
    );
  }
}
