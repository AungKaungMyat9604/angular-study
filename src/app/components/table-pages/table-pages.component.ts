import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-table-pages',
  templateUrl: './table-pages.component.html',
  styleUrl: './table-pages.component.scss',
  standalone: true,
  imports: [MatButtonModule],
})
export class TablePagesComponent {
  //Input
  @Input() activePage: number = 4;
  @Input() pageList: number[] = new Array(7);

  //Output
  @Output() onPageChanged = new EventEmitter();

  constructor() {}

  selectPage(pageIndex: number) {
    this.onPageChanged.emit(pageIndex + 1);
  }
}
