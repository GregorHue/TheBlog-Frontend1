import { Component, OnInit, Input } from '@angular/core';
import { Comment } from 'src/app/interfaces/comment';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.css']
})
export class NewCommentComponent implements OnInit {

  @Input() newComment: Comment;

  constructor(public activeModal: NgbActiveModal, private commentService: CommentService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.activeModal.close(this.commentService.create(this.newComment));
  }
}
