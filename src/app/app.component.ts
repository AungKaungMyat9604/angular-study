import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SigninComponent } from './apps/signin/signin.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [
    //Modules
    RouterOutlet,
    SigninComponent,
  ],
})
//#region
export class AppComponent {
  title = 'This is title';
  body = 'This is body';
}
//#endregion
