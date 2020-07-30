import { Injectable } from '@angular/core';
import { User, UserDtoList } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { BASEURL } from '../utils/baseUrl';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http: HttpClient;
  token = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsInVzZXJfdXJsIjoiL3VzZXJzLzIiLCJleHAiOjE1OTY4ODk2OTQsImF1dGhvcml0aWVzIjoiUk9MRV9BRE1JTiJ9.uprOL6LU1Y0EueXvuAGuMpZvQVzC7NUknGW9wno5iD5t46TzzF9lDPOdx40KHwKI6ERpXlTmBzIyV4UDpLrZBA'

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.token
    })
  };

  constructor(http: HttpClient) {
    this.http = http;

  }

  getUsers(): Observable<User[]> {

    return this.http.get<UserDtoList>(`${BASEURL}/users`, this.httpOptions).pipe(map(list => list.users));

  }

  getUser(userId: number): Observable<User> {

    return this.http.get<User>(`${BASEURL}/users/${userId}`, this.httpOptions)
  }
}
