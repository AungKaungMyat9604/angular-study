import { Component } from '@angular/core';

@Component({
  selector: 'app-app-frame',
  templateUrl: './app-frame.component.html',
  styleUrl: './app-frame.component.scss',
  host: {
    class: 'app-host', // Added the required class
  },
})
export class AppFrameComponent {}
