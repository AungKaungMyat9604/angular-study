import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: any = null;

  constructor(private http: HttpClient) {}

  checkUserInServer() {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res(this.user);
      }, 2000);
    });
  }
}
