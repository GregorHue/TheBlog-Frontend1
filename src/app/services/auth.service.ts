import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAdmin = false;
  loggedInUser = '';
  loggedInUserUrl = '';

  constructor(private helper: JwtHelperService) { }

  getToken(): string {
    return localStorage.getItem('token');
  }

  handleLogin(response: HttpResponse<Object>) {
    const bearerJwt = this.extractJwt(response);
    const rawJwt = bearerJwt.split(' ')[1];
    localStorage.setItem('token', rawJwt);
    const decodedToken = this.helper.decodeToken(rawJwt);
    this.isAdmin = this.extractAdmin(decodedToken);
    this.loggedInUser = decodedToken.sub;
    this.loggedInUserUrl = decodedToken.user_url;
  }

  loginAfterRefresh() {
    const rawJwt = localStorage.getItem('token');
    const decodedToken = this.helper.decodeToken(rawJwt);
    this.isAdmin = this.extractAdmin(decodedToken);
    this.loggedInUser = decodedToken.sub;
    this.loggedInUserUrl = decodedToken.user_url;
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedInUser = '';
    this.loggedInUserUrl = '';
    this.isAdmin = false;
  }

  private extractJwt(response: HttpResponse<Object>) {
    var token = null;
    if (response.headers.has('Authorization')) {
      token = response.headers.get('Authorization');
    }
    return token;
  };

  private extractAdmin(decodedJwt: any) {
    const roles = decodedJwt.authorities.split(',');
    if (roles.includes('ROLE_ADMIN')) {
      return true;
    }
    else {
      return false;
    }
  }
}
