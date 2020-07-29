import { Injectable } from '@angular/core';
import { User, UserDtoList } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { BASEURL } from '../utils/baseUrl';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;

  }

  getUsers(): Observable<User[]> {

    return this.http.get<UserDtoList>(`${BASEURL}/users`).pipe(map(list => list.users));

  }

  getUser(userId: number): Observable<User> {

    return this.http.get<User>(`${BASEURL}/users/${userId}`)
  }
}
