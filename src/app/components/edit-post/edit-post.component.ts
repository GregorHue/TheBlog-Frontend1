import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Post } from 'src/app/interfaces/post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  @Input() post: Post;

  constructor(public activeModal: NgbActiveModal, private postService: PostService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.activeModal.close(this.postService.update(this.post));
  }

}
