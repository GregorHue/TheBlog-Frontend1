import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Post } from 'src/app/interfaces/post';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/interfaces/category';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  categories: Category[];
  displayedCategories: string[];

  @Input() newPost: Post;

  constructor(public activeModal: NgbActiveModal, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(categories => this.categories = categories);
    this.displayedCategories = this.categories.filter(category => category.name !== 'All').map(category => category.name);
  }

  onSubmit(): void {
    this.activeModal.close();
  }
}
