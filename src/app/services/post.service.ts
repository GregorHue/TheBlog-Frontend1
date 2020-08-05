import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post, PostDtoList } from '../interfaces/post';
import { BASEURL } from '../utils/baseUrl';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class PostService {

  private http: HttpClient;

  cache$: Observable<Post[]>;

  constructor(http: HttpClient) {
    this.http = http;

  }

  getPosts(): Observable<Post[]> {

    if (!this.cache$) {
      this.cache$ = this.http.get<PostDtoList>(`${BASEURL}/posts`).pipe(map(list => list.posts), shareReplay(1));
    }
    return this.cache$;
  }

  getPost(postId: number): Observable<Post> {

    let result: Observable<Post> = null;
    if (this.cache$) {
      const post$: Observable<Post> = this.cache$.pipe(map(cache => (cache.filter(post => post.post_url === `/posts/${postId}`))[0]));
      if (post$) {
        result = post$;
      }
    }
    if (!result) {
      result = this.http.get<Post>(`${BASEURL}/posts/${postId}`)
    }
    return result;
  }
}
