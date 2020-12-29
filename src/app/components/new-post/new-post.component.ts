import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Post } from 'src/app/interfaces/post';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/interfaces/category';
import { PostService } from 'src/app/services/post.service';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  categories: Category[];
  displayedCategories: string[];
  source: string;

  @Input() newPost: Post;

  constructor(public activeModal: NgbActiveModal, private categoryService: CategoryService, private postService: PostService, private imageService: ImageService) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
      this.displayedCategories = this.categories.filter(category => category.name !== 'All').map(category => category.name)
    });
  }

  onSubmit(): void {
    this.activeModal.close(this.postService.create(this.newPost));
  }

  processFile(event: Event): void {
    this.imageService.scale((<HTMLInputElement>(event.target)).files[0]).then(source => {
      this.source = source;
      const base64 = this.source.split(',')[1];
      this.newPost.image = base64;
    });
  }
}
