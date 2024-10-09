import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list-filter',
  templateUrl: './user-list-filter.component.html',
  styleUrl: './user-list-filter.component.scss',
  host: {
    class: 'app-host',
  },
  standalone: true,
  imports: [
    //Pipes
    DatePipe,

    //Modules
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
  ],
  providers: [DatePipe],
})
export class UserListFilterComponent {
  selectOptionFormControl = new FormControl();
  selectOptionList: string[] = ['Apple', 'Orange', 'Mango'];

  //Select Multiple Options
  selectMultipleOptionFormControl = new FormControl();
  selectedOptions: string[] = [];

  //date Form Control
  dateFormControl = new FormControl();
  pickedDate: string = '';

  //Date Range Form Group
  dateRangeFormGroup = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  constructor(
    private router: Router,
    private datePipe: DatePipe,
  ) {
    this.selectOptionFormControl.valueChanges.subscribe({
      next: (value) => {
        console.log(value);
      },
    });

    this.selectMultipleOptionFormControl.valueChanges.subscribe({
      next: (values) => {
        console.log(values);
        this.selectedOptions = values;
      },
    });

    this.dateFormControl.valueChanges.subscribe({
      next: (date) => {
        // console.log(date);
        this.pickedDate = date;
        if (date) {
          const dateString = this.datePipe.transform(
            date,
            'MMM dd,yyyy hh:mm:ss a',
          );
          // console.log(dateString);
        }
      },
    });

    this.dateRangeFormGroup.valueChanges.subscribe({
      next: (date) => {
        console.log(date);
      },
    });

    // this.dateRangeFormGroup.get('start')?.valueChanges.subscribe({
    //   next: (startDate: any) => {
    //     console.log(startDate);
    //   },
    // });

    // this.dateRangeFormGroup.get('end')?.valueChanges.subscribe({
    //   next: (endDate: any) => {
    //     console.log(endDate);
    //   },
    // });
  }

  countOtherOptions() {
    const count = this.selectedOptions.length;
    if (count > 1) {
      if (count == 2) {
        return '(+1 other)';
      } else {
        return `(+${count - 1} others)`;
      }
    } else {
      return '';
    }
  }
}
