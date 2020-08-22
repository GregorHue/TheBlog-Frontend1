import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Comment } from 'src/app/interfaces/comment';
import { CommentService } from 'src/app/services/comment.service';


@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.css']
})
export class EditCommentComponent implements OnInit {

  @Input() comment: Comment;

  constructor(public activeModal: NgbActiveModal, private commentService: CommentService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.activeModal.close(this.commentService.update(this.comment));
  }

}
