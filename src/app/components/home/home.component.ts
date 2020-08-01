import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../..//interfaces/post';
import { Category } from '../../interfaces/category';
import { CategoryService } from 'src/app/services/category.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditPostComponent } from '../edit-post/edit-post.component';
import { NewPostComponent } from '../new-post/new-post.component';


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

  constructor(
    private postService: PostService,
    private categoryService: CategoryService,
    public modal: NgbModal) { }

  ngOnInit(): void {
    this.postService.getPosts().subscribe(posts => this.posts = posts, error => console.log(error));
    this.categoryService.getCategories().subscribe(categories => { this.categories = categories; this.categoryNames = this.categories.map(category => category.name); }, error => console.log(error));

  }

  openEditPost(post: Post) {
    const modalRef = this.modal.open(EditPostComponent, { size: 'lg', centered: true });
    modalRef.componentInstance.post = post;
  }

  openNewPost() {
    const modalRef = this.modal.open(NewPostComponent, { size: 'lg', centered: true });
    let newPost: Post = {
      createdAt: null,
      lastUpdatedAt: null,
      title: null,
      content: null,
      likes: null,
      category: null,
      author_url: null,
      post_url: null,
      comments_url: null,
      numberOfComments: null,
      option: null,
      authorname: null
    }
    modalRef.componentInstance.newPost = newPost;
  }

}
