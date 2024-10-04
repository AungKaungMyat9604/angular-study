import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-table-first-last',
  templateUrl: './table-first-last.component.html',
  styleUrl: './table-first-last.component.scss',
  standalone: true,
  imports: [
    //Modules
    MatButtonModule,
    MatIconModule,
  ],
})
export class TableFirstLastComponent {
  //Output
  @Output() onFirstPage = new EventEmitter();
  @Output() onLastPage = new EventEmitter();

  constructor() {}

  setFirstPage(first: boolean) {
    this.onFirstPage.emit(first);
  }

  setLastPage(last: boolean) {
    this.onLastPage.emit(last);
  }
}
