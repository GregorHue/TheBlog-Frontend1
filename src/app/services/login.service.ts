import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Login } from '../interfaces/login';
import { Observable } from 'rxjs';
import { BASEURL } from '../utils/baseUrl';
import { logging } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }


  login(login: Login): Observable<HttpResponse<Object>> {
    return this.http.post<Object>(`${BASEURL}/login`, JSON.stringify(login), {
      observe: "response"
    });
  }
}
