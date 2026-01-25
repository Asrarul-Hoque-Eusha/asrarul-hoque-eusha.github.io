import { Routes } from '@angular/router';

export const blogRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/blog-list/blog-list.component')
      .then(m => m.BlogListComponent),
    title: 'Blog | Asrarul Hoque Eusha'
  },
  {
    path: ':slug',
    loadComponent: () => import('./pages/blog-post/blog-post.component')
      .then(m => m.BlogPostComponent),
    // Title will be set dynamically in component
  }
];
