import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppFrameRoutingModule } from './app-frame-routing.module';
import { AppFrameComponent } from './app-frame.component';
import { RouterOutlet } from '@angular/router';
import { UserListComponent } from '../public/components/user-list/user-list.component';

@NgModule({
  declarations: [AppFrameComponent],
  imports: [
    CommonModule,
    RouterOutlet,
    AppFrameRoutingModule,
    UserListComponent,
  ],
})
export class AppFrameModule {}
