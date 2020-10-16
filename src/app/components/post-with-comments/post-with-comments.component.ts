import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../..//interfaces/post';
import { Comment } from '../../interfaces/comment';
import { CommentService } from 'src/app/services/comment.service';
import { Params, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewCommentComponent } from '../new-comment/new-comment.component';
import { EditCommentComponent } from '../edit-comment/edit-comment.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-post-with-comments',
  templateUrl: './post-with-comments.component.html',
  styleUrls: ['./post-with-comments.component.css']
})
export class PostWithCommentsComponent implements OnInit {

  post: Post;
  comments: Comment[] = [];
  comparator = "newest";
  currentComment: Comment;
  showVoteToast = false;

  @ViewChild('confirmation') confirmation: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private commentService: CommentService,
    public authService: AuthService,
    public modal: NgbModal) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(map((parameterMap: ParamMap) => +parameterMap.get('postId')))
      .subscribe(postId => {
        this.postService.getPost(postId).subscribe(post => this.post = post);
        this.commentService.getCommentsByPost(postId).subscribe(comments => this.comments = comments);
      });
  }

  openEditComment(comment: Comment) {
    const modalRef = this.modal.open(EditCommentComponent, { size: 'lg', centered: true });
    modalRef.componentInstance.comment = Object.assign({}, comment);
    modalRef.result.then((comment$) => {
      comment$.subscribe((comment: Comment) => {
        this.comments = this.comments.filter(c => c.comment_url !== comment.comment_url).concat([comment]);
      });
    })
      .catch(error => console.log(error));
  }

  openNewComment() {
    const modalRef = this.modal.open(NewCommentComponent, { size: 'lg', centered: true });
    let newComment: Comment = {
      createdAt: null,
      lastUpdatedAt: null,
      content: null,
      likes: null,
      author_url: this.authService.loggedInUserUrl,
      post_url: this.post.post_url,
      comment_url: null,
      option: null,
      authorname: null
    }
    modalRef.componentInstance.newComment = newComment;
    modalRef.result.then((comment$) => {
      comment$.subscribe((comment: Comment) => {
        this.comments = this.comments.concat([comment]);
        this.post.numberOfComments += 1;
      });
    })
      .catch(error => console.log(error));
  }

  upvote(post: Post) {
    this.postService.upVote(post).subscribe((p: Post) => {
      this.post = p;
    });
  }

  downvote(post: Post) {
    this.postService.downVote(post).subscribe((p: Post) => {
      this.post = p;
    });
  }

  upVote(comment: Comment) {
    this.commentService.upVote(comment).subscribe((c: Comment) => {
      this.comments = this.comments.filter(c => c.comment_url !== comment.comment_url).concat([c]);
    });
  }

  downVote(comment: Comment) {
    this.commentService.downVote(comment).subscribe((c: Comment) => {
      this.comments = this.comments.filter(c => c.comment_url !== comment.comment_url).concat([c]);
    });
  }

  delete(comment: Comment) {
    this.commentService.delete(comment).subscribe(() => {
      this.comments = this.comments.filter(c => c.comment_url !== comment.comment_url);
      this.post.numberOfComments -= 1;
    })
  }
  open(comment: Comment) {
    this.modal.open(this.confirmation, { centered: true });
    this.currentComment = comment;
  }
}
