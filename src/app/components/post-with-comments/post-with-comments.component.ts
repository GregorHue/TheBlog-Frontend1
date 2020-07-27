import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../..//interfaces/post';
import { Comment } from '../../interfaces/comment';
import { CommentService } from 'src/app/services/comment.service';
import { Params, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-post-with-comments',
  templateUrl: './post-with-comments.component.html',
  styleUrls: ['./post-with-comments.component.css']
})
export class PostWithCommentsComponent implements OnInit {

  post: Post;
  comments: Comment[] = [];
  loggedInUserUrl: string = '/users/2';
  model = "new";

  log = (): void => console.log(this.model);

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private commentService: CommentService) { }

  ngOnInit(): void {

    this.route.params.pipe(switchMap((params: Params) => {
      return params['postId'] as Observable<number>;
    })).subscribe(postId => {
      this.postService.getPost(postId).subscribe(post => this.post = post, error => console.log(error));
      this.commentService.getCommentsByPost(postId).subscribe(comments => this.comments = comments, error => console.log(error));
    }), error => console.log(error);

  }

}
