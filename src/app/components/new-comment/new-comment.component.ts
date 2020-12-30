import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Comment } from 'src/app/interfaces/comment';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommentService } from 'src/app/services/comment.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.css']
})
export class NewCommentComponent implements OnInit {

  submitted = false;

  @Input() newComment: Comment;
  @ViewChild('createComment') form: NgForm;

  constructor(public activeModal: NgbActiveModal, private commentService: CommentService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.form.valid) {
      this.activeModal.close(this.commentService.create(this.newComment));
    }
  }
}
