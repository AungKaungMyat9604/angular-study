import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
  standalone: true,
  imports: [MatDialogModule],
})
export class DialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) private dialogData: any) {
    setTimeout(() => {
      console.log(this.dialogData);
    });
  }
}
