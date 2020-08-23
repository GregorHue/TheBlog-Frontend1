import { Injectable, Predicate } from '@angular/core';
import { User, UserDtoList } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { BASEURL } from '../utils/baseUrl';
import { Observable } from 'rxjs';
import { map, shareReplay, filter } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})

export class UserService {

  cache$: Observable<User[]>;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.getToken()
    })
  };

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  getUsers(): Observable<User[]> {

    if (!this.cache$) {
      this.cache$ = this.http.get<UserDtoList>(`${BASEURL}/users`, this.httpOptions).pipe(map<UserDtoList, User[]>(list => list.users.filter(user => user.deletedTs == null)), shareReplay(1));
    }
    this.cache$ = this.cache$.pipe()
    return this.cache$;

  }

  getUser(userId: number): Observable<User> {

    let result: Observable<User> = null;
    if (this.cache$) {
      const user$: Observable<User> = this.cache$.pipe(map(cache => (cache.filter(user => user.user_url === `/users/${userId}`))[0]));
      if (user$) {
        result = user$;
      }
    }
    if (!result) {
      result = this.http.get<User>(`${BASEURL}/users/${userId}`, this.httpOptions);
    }
    return result;
  }

  update(user: User): Observable<User> {
    return this.http.put<User>(`${BASEURL}${user.user_url}`, JSON.stringify(user), this.httpOptions);
  }

  delete(user: User): Observable<User> {
    return this.http.delete<User>(`${BASEURL}${user.user_url}`, this.httpOptions);
  }

  updateCacheAfterDelete(user: User) {
    this.cache$ = this.cache$.pipe(map(cache => cache.filter(u => u.user_url !== user.user_url)));
  }
}
