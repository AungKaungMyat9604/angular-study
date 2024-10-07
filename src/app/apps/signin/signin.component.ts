import { Component, OnDestroy, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
  standalone: true,
  imports: [
    //Modules
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,

    //Components
  ],
})
export class SigninComponent {
  // private route = inject(Router);

  constructor(private route: Router) {}
  goToPrivateApp() {
    this.route.navigate(['app/private'], { replaceUrl: false });
  }

  goToPublicApp() {
    this.route.navigate(['app/public'], { replaceUrl: false });
  }
}
