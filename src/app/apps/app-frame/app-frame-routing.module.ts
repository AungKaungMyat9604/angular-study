import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppFrameComponent } from './app-frame.component';

const routes: Routes = [
  {
    path: '',
    component: AppFrameComponent,
    children: [
      {
        path: '',
        redirectTo: 'user-list',
        pathMatch: 'full',
      },
      {
        path: 'user-list',
        pathMatch: 'full',
        loadComponent: () =>
          import('../public/components/user-list/user-list.component').then(
            (c) => c.UserListComponent,
          ),
      },
      {
        path: 'private',
        // canActivate: [appFrameGuard],
        loadChildren: () =>
          import('../private/private.module').then((m) => m.PrivateModule),
      },
      {
        path: 'public',
        loadChildren: () =>
          import('../public/public.module').then((m) => m.PublicModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppFrameRoutingModule {}
