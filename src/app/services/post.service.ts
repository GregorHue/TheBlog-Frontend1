import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post, PostDtoList } from '../interfaces/post';
import { BASEURL } from '../utils/baseUrl';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class PostService {

  cache$: Observable<Post[]>;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.getToken()
    })
  };

  constructor(private http: HttpClient, private authService: AuthService) {
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

  savePost(post: Post): Observable<Post> {
    return this.http.post<Post>(`${BASEURL}/posts`, JSON.stringify(post), this.httpOptions);
  }

  updateCache(post: Post) {
    let posts: Post[];
    this.cache$.subscribe(p => posts = p)
    posts = posts.concat([post]);
    console.log(posts.length);
    this.cache$ = Observable.create((observer) => {
      observer.next(posts);
    });
  }
}
