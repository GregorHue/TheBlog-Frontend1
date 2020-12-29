import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Post } from 'src/app/interfaces/post';
import { ImageService } from 'src/app/services/image.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css'],
  providers: [NgbModal]
})
export class EditPostComponent implements OnInit {

  oldSource: string;
  source: string;

  @Input() post: Post;

  constructor(public activeModal: NgbActiveModal, private postService: PostService, private imageService: ImageService) { }

  ngOnInit(): void {
    this.oldSource = this.post.image;
  }

  onSubmit(): void {
    this.activeModal.close(this.postService.update(this.post));
  }

  processFile(event: Event): void {
    this.imageService.scale((<HTMLInputElement>(event.target)).files[0]).then(source => {
      if (source !== undefined && source != null) {
        this.source = source;
        const base64 = this.source.split(',')[1];
        this.post.image = base64;
      }
    });
  }
}
