import { Component, OnInit, Input } from '@angular/core';
import { Comment } from 'src/app/interfaces/comment';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.css']
})
export class NewCommentComponent implements OnInit {

  @Input() newComment: Comment;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.activeModal.close();
  }
}
