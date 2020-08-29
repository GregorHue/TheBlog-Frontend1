import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from '../interfaces/login';
import { Observable } from 'rxjs';
import { BASEURL } from '../utils/baseUrl';
import { logging } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(login: Login): Observable<Login> {
    return this.http.post<Login>(`${BASEURL}/login`, JSON.stringify(login));
  }
}
