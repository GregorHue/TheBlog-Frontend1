import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../..//interfaces/post';
import { Comment } from '../../interfaces/comment';
import { CommentService } from 'src/app/services/comment.service';
import { Params, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewCommentComponent } from '../new-comment/new-comment.component';
import { EditCommentComponent } from '../edit-comment/edit-comment.component';

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
    private commentService: CommentService,
    public modal: NgbModal) { }

  ngOnInit(): void {

    this.route.params.pipe(switchMap((params: Params) => {
      return params['postId'] as Observable<number>;
    })).subscribe(postId => {
      this.postService.getPost(postId).subscribe(post => this.post = post, error => console.log(error));
      this.commentService.getCommentsByPost(postId).subscribe(comments => this.comments = comments, error => console.log(error));
    }, (error: any) => console.log(error));

  }

  openEditComment(comment: Comment) {
    const modalRef = this.modal.open(EditCommentComponent, { size: 'lg', centered: true });
    modalRef.componentInstance.comment = comment;
  }

  openNewComment() {
    const modalRef = this.modal.open(NewCommentComponent, { size: 'lg', centered: true });
    let newComment: Comment = {
      createdAt: null,
      lastUpdatedAt: null,
      content: null,
      likes: null,
      author_url: null,
      post_url: null,
      comment_url: null,
      option: null,
      authorname: null
    }
    modalRef.componentInstance.newComment = newComment;
  }

}
