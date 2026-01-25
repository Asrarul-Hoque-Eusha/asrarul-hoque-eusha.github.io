import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layouts/main-layout/main-layout.component')
      .then(m => m.MainLayoutComponent),
    title: 'Asrarul Hoque Eusha - Software Engineer'
  },
  {
    path: 'blog',
    loadChildren: () => import('./features/blog/blog.routes')
      .then(m => m.blogRoutes)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
