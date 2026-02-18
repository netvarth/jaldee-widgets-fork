import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'preview',
    loadComponent: () => import('./preview-page.component').then((m) => m.PreviewPageComponent)
  },
  {
    path: 'token-preview',
    loadComponent: () => import('./token-preview-page.component').then((m) => m.TokenPreviewPageComponent)
  }
];
