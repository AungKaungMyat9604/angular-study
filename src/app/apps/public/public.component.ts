import { Component } from '@angular/core';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrl: './public.component.scss',
  host: {
    class: 'app-host',
  },
})
export class PublicComponent {}
