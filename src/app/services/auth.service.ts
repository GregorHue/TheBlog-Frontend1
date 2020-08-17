import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: string = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsInVzZXJfdXJsIjoiL3VzZXJzLzIiLCJleHAiOjE1OTg0NzU4NjUsImF1dGhvcml0aWVzIjoiUk9MRV9BRE1JTiJ9.RxNC7Aed1XpEQYvb_PEEA9GGy_Dj3ZPP8DxVJJ9UXI7EYVPkUzT8oqwcE5_ks398VtGsJcrC_o2WX-MfgUeb_A';

  TOKEN = 'token';

  constructor() {
    this.saveToken(this.token);
  }

  saveToken(token: string): void {
    localStorage.setItem(this.TOKEN, this.token);
  }

  getToken(): string {
    return localStorage.getItem(this.TOKEN);
  }
}
