import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Comment } from 'src/app/interfaces/comment';
import { CommentService } from 'src/app/services/comment.service';


@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.css']
})
export class EditCommentComponent implements OnInit {

  submitted = false;

  @Input() comment: Comment;
  @ViewChild('editComment') form: NgForm;

  constructor(public activeModal: NgbActiveModal, private commentService: CommentService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.form.valid) {
      this.activeModal.close(this.commentService.update(this.comment));
    }
  }

}
