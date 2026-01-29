import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'preview',
    loadComponent: () => import('./preview-page.component').then((m) => m.PreviewPageComponent)
  }
];
