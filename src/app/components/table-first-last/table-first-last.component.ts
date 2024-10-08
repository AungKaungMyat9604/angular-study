import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DialogService } from '../dialog/dialog.service';

@Component({
  selector: 'app-table-first-last',
  templateUrl: './table-first-last.component.html',
  styleUrl: './table-first-last.component.scss',
  standalone: true,
  imports: [
    //Modules
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ],
})
export class TableFirstLastComponent {
  //Output
  @Output() onFirstPage = new EventEmitter();
  @Output() onLastPage = new EventEmitter();

  constructor(private dialogService: DialogService) {}

  setFirstPage(first: boolean) {
    this.onFirstPage.emit(first);
    this.dialogService.openDialog();
  }

  setLastPage(last: boolean) {
    this.onLastPage.emit(last);
  }
}
