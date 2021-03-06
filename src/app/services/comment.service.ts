import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Comment, CommentDtoList } from '../interfaces/comment';
import { BASEURL } from '../utils/baseUrl';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {


  constructor(private http: HttpClient, private authService: AuthService) {
    this.http = http;

  }

  getCommentsByPost(postId: number): Observable<Comment[]> {
    return this.http.get<CommentDtoList>(`${BASEURL}/posts/${postId}/comments`).pipe(map(list => list.comments));
  }

  create(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(`${BASEURL}/comments`, JSON.stringify(comment));
  }

  update(comment: Comment): Observable<Comment> {
    return this.http.put<Comment>(`${BASEURL}${comment.comment_url}`, JSON.stringify(comment));
  }

  upVote(comment: Comment): Observable<Comment> {
    return this.http.patch<Comment>(`${BASEURL}${comment.comment_url}`, JSON.stringify({ option: "upVote" }));
  }

  downVote(comment: Comment): Observable<Comment> {
    return this.http.patch<Comment>(`${BASEURL}${comment.comment_url}`, JSON.stringify({ option: "downVote" }));
  }

  delete(comment: Comment): Observable<Comment> {
    return this.http.delete<Comment>(`${BASEURL}${comment.comment_url}`);
  }
}
