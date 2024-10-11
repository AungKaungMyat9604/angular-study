import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { ThemeNamesEnum } from '../../../../../resources/enums/theme-enums';

@Component({
  selector: 'app-chart-component',
  templateUrl: './chart-component.component.html',
  styleUrl: './chart-component.component.scss',
  host: {
    class: 'app-host',
  },
  standalone: true,
  imports: [
    MatChipsModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatMenuModule,
    ReactiveFormsModule,
  ],
})
export class ChartComponentComponent {
  chipsList: string[] = ['apple', 'orange', 'mango', 'grape'];
  chipsGridItemList: string[] = [];

  chipOptionListFormControl = new FormControl();
  // chipGridFormControl = new FormControl();

  themeNamesEnum = ThemeNamesEnum;
  loginFormGroup = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-z]{4,}$/),
    ]),
    password: new FormControl('', [
      Validators.required,
      this.customPasswordValidator,
    ]),
  });

  constructor() {
    this.chipOptionListFormControl.valueChanges.subscribe({
      next: (values) => {
        console.log(values);
      },
    });

    // this.chipGridFormControl.valueChanges.subscribe({
    //   next: (value) => {
    //     console.log(value);
    //     this.chipsGridItemList.push(value);
    //   },
    // });
  }

  ngAfterViewInit() {
    // setTimeout(() => {
    //   this.chipOptionListFormControl.disable();
    //   setTimeout(() => {
    //     this.chipOptionListFormControl.enable();
    //   }, 3000);
    // }, 3000);
    // setTimeout(() => {
    //   this.chipOptionListFormControl.setValue([
    //     this.chipsList[0],
    //     this.chipsList[1],
    //   ]);
    // }, 3000);
  }

  customPasswordValidator(control: AbstractControl) {
    const value = control.value;
    const regex = /^[a-z]{4,}$/;

    if (!regex.test(value)) {
      return { invalidPassword: true };
    } else {
      return null;
    }
  }

  removeChip(fruit: string) {
    this.chipsList = this.chipsList.filter((c) => c != fruit);
  }

  removeGridChip(fruit: string) {
    this.chipsGridItemList = this.chipsGridItemList.filter((c) => c != fruit);
  }

  addChipGridItem(event: MatChipInputEvent) {
    this.chipsGridItemList.push(event.value);
    event.chipInput.clear();
  }

  toggleMode() {
    const mode = document.body.getAttribute('mode');
    if (mode != 'dark') {
      document.body.setAttribute('mode', 'dark');
    } else {
      document.body.setAttribute('mode', 'light');
    }
  }

  changeTheme(theme: ThemeNamesEnum) {
    document.documentElement.setAttribute('theme', theme);
  }
}
