import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: string = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsInVzZXJfdXJsIjoiL3VzZXJzLzIiLCJleHAiOjE1OTkwNDk3NDAsImF1dGhvcml0aWVzIjoiUk9MRV9BRE1JTiJ9.PwgXtzxRRK-ugbpeWwDwMez6OxdS-GD2tsT9R2Avb0dz9-hlvIHhjDuNqUOJspyW1xOOkninTlYvnFKVsS8iMg';

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
