import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Comment, CommentDtoList } from '../interfaces/comment';
import { BASEURL } from '../utils/baseUrl';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;

  }

  getCommentsByPost(postId: number): Observable<Comment[]> {

    return this.http.get<CommentDtoList>(`/posts/${postId}`).pipe(map(list => list.comments));

  }
}
