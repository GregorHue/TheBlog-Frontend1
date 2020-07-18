import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post, PostDtoList } from '../interfaces/post';
import { BASEURL } from '../utils/baseUrl';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class PostService {

  cache: Post[] = [];

  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;

  }

  getPosts(): Observable<Post[]> {

    return this.http.get<PostDtoList>(`${BASEURL}/posts`).pipe(map(list => list.posts));

  }
}
