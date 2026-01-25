import { Component, inject, OnInit, OnDestroy, signal, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { MarkdownModule } from 'ngx-markdown';
import { switchMap, tap, forkJoin } from 'rxjs';
import { BlogService } from '../../services/blog.service';
import { BlogHeaderComponent } from '../../components/blog-header/blog-header.component';
import { BlogContentComponent } from '../../components/blog-content/blog-content.component';
import { AuthorCardComponent } from '../../components/author-card/author-card.component';
import { RelatedPostsComponent } from '../../components/related-posts/related-posts.component';
import { ShareButtonsComponent } from '../../components/share-buttons/share-buttons.component';
import { BlogMeta, BlogContent } from '../../models/blog.model';
import { Profile } from '../../../../core/models';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MarkdownModule,
    BlogHeaderComponent,
    BlogContentComponent,
    AuthorCardComponent,
    RelatedPostsComponent,
    ShareButtonsComponent
  ],
  templateUrl: './blog-post.component.html',
  styleUrl: './blog-post.component.scss'
})
export class BlogPostComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private blogService = inject(BlogService);
  private titleService = inject(Title);
  private metaService = inject(Meta);
  private platformId = inject(PLATFORM_ID);

  blogMeta = signal<BlogMeta | null>(null);
  blogContent = signal<BlogContent | null>(null);
  profile = signal<Profile | null>(null);
  relatedPosts = signal<BlogMeta[]>([]);
  loading = signal(true);

  private structuredDataScript?: HTMLScriptElement;

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap(params => {
        const slug = params.get('slug')!;
        return forkJoin({
          blogs: this.blogService.getBlogs(),
          profile: this.blogService.getAuthor()
        }).pipe(
          tap(({ blogs }) => {
            const meta = blogs.find(b => b.slug === slug);
            if (meta) {
              this.blogMeta.set(meta);
              this.updateMetaTags(meta);
            }
          }),
          switchMap(({ blogs, profile }) => {
            const meta = blogs.find(b => b.slug === slug)!;
            this.profile.set(profile);
            return forkJoin({
              content: this.blogService.getBlogContent(meta.contentFile),
              related: this.blogService.getRelatedPosts(slug, meta.tags)
            });
          })
        );
      })
    ).subscribe(({ content, related }) => {
      this.blogContent.set(content);
      this.relatedPosts.set(related);
      this.loading.set(false);

      // Add structured data after content is loaded
      const meta = this.blogMeta();
      const profile = this.profile();
      if (meta && content && profile) {
        this.addStructuredData(meta, content, profile);
      }
    });
  }

  ngOnDestroy() {
    // Clean up structured data script when leaving the page
    if (this.structuredDataScript && isPlatformBrowser(this.platformId)) {
      this.structuredDataScript.remove();
    }
  }

  private addStructuredData(meta: BlogMeta, content: BlogContent, profile: Profile) {
    if (!isPlatformBrowser(this.platformId)) return;

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      'headline': meta.title,
      'description': meta.summary,
      'image': meta.coverImage,
      'datePublished': content.publishedAt,
      'dateModified': content.updatedAt || content.publishedAt,
      'author': {
        '@type': 'Person',
        'name': profile.name,
        'url': profile.social.linkedin || profile.social.github
      }
    });
    document.head.appendChild(script);
    this.structuredDataScript = script;
  }

  private updateMetaTags(meta: BlogMeta) {
    this.titleService.setTitle(`${meta.title} | Asrarul Hoque Eusha`);

    this.metaService.updateTag({ name: 'description', content: meta.summary });
    this.metaService.updateTag({ property: 'og:title', content: meta.title });
    this.metaService.updateTag({ property: 'og:description', content: meta.summary });
    this.metaService.updateTag({ property: 'og:type', content: 'article' });
    this.metaService.updateTag({ property: 'og:image', content: meta.coverImage });
    this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.metaService.updateTag({ name: 'twitter:title', content: meta.title });
    this.metaService.updateTag({ name: 'twitter:description', content: meta.summary });
  }

  getCurrentUrl(): string {
    return typeof window !== 'undefined' ? window.location.href : '';
  }
}
