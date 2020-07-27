import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../..//interfaces/post';
import { Category } from '../../interfaces/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  posts: Post[] = [];
  categories: Category[] = [];
  categoryNames: string[] = [];
  loggedInUserUrl: string = '/users/2';
  modelSort = "new";
  modelCategory = "All";

  logSort(): void {
    console.log(this.modelSort);
  }

  logCategory(): void {
    console.log(this.modelCategory);
  }

  constructor(private postService: PostService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.postService.getPosts().subscribe(posts => this.posts = posts, error => console.log(error));
    this.categoryService.getCategories().subscribe(categories => { this.categories = categories; this.categoryNames = this.categories.map(category => category.name); }, error => console.log(error));

  }

}
