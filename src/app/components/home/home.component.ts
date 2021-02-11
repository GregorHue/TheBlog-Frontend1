import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../..//interfaces/post';
import { Category } from '../../interfaces/category';
import { CategoryService } from 'src/app/services/category.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditPostComponent } from '../edit-post/edit-post.component';
import { NewPostComponent } from '../new-post/new-post.component';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  posts: Post[] = [];
  categories: Category[] = [];
  categoryNames: string[] = [];
  comparator = "newest";
  filter = "All";
  currentPost: Post;
  showVoteToast = false;

  @ViewChild('confirmation') confirmation: ElementRef;

  constructor(
    private postService: PostService,
    private categoryService: CategoryService,
    public authService: AuthService,
    public modal: NgbModal) {
  }

  ngOnInit(): void {
    this.postService.getPosts().subscribe(posts => this.posts = posts, error => console.log(error));
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
      this.categoryNames = this.categories.map(category => category.name);
    }, error => console.log(error));

  }

  openEditPost(post: Post) {
    const modalRef = this.modal.open(EditPostComponent, { size: 'lg', centered: true });
    modalRef.componentInstance.post = Object.assign({}, post);
    modalRef.result.then((post$) => {
      post$.subscribe((post: Post) => {
        this.posts = this.posts.filter(p => p.post_url !== post.post_url).concat([post]);
        this.postService.updateCacheAfterUpdate(post);
      });
    })
      .catch(error => console.log(error));
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
      author_url: this.authService.loggedInUserUrl,
      post_url: null,
      comments_url: null,
      numberOfComments: null,
      image: null,
      avatar: null,
      option: null,
      authorname: null
    }
    modalRef.componentInstance.newPost = newPost;
    modalRef.result.then((post$) => {
      post$.subscribe((post: Post) => {
        this.posts = this.posts.concat([post]);
        this.postService.updateCacheAfterCreate(post);
      });
    })
      .catch(error => console.log(error));
  }

  upVote(post: Post) {
    this.postService.upVote(post).subscribe((p: Post) => {
      this.posts = this.posts.filter(p => p.post_url !== post.post_url).concat([p]);
      this.postService.updateCacheAfterUpdate(p);
    });
  }

  downVote(post: Post) {
    this.postService.downVote(post).subscribe((p: Post) => {
      this.posts = this.posts.filter(p => p.post_url !== post.post_url).concat([p]);
      this.postService.updateCacheAfterUpdate(p);
    });
  }

  delete(post: Post) {
    this.postService.delete(post).subscribe(() => {
      this.posts = this.posts.filter(p => p.post_url !== post.post_url);
      this.postService.updateCacheAfterDelete(post);
    })
  }
  open(post: Post) {
    this.modal.open(this.confirmation, { centered: true });
    this.currentPost = post;
  }
}
