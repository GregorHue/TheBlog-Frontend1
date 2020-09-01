import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Signup } from '../interfaces/signup';
import { Observable } from 'rxjs';
import { BASEURL } from '../utils/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient) { }

  signup(signup: Signup): Observable<Signup> {
    return this.http.post<Signup>(`${BASEURL}/signup`, JSON.stringify(signup));
  }
}
