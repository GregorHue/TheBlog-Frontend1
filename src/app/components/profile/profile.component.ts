import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Params, ParamMap } from '@angular/router';
import { switchMap, mergeMap, flatMap, map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { Gender } from 'src/app/interfaces/gender';
import { ImageService } from 'src/app/services/image.service';
import { PostService } from 'src/app/services/post.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  model: User;
  genders = Object.keys(Gender);
  isAlertSuccessOpen = false;
  isAlertFailureOpen = false;
  successMessage = '';
  errorMessage = '';
  source: string;

  constructor(private route: ActivatedRoute, private imageService: ImageService,
    private userService: UserService, private postService: PostService) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(map((parameterMap: ParamMap) => +parameterMap.get('userId'))).pipe(flatMap(userId => this.userService.getUser(userId))).subscribe(user => this.model = user);
  }

  processFile(event: Event): void {
    this.imageService.scale((<HTMLInputElement>(event.target)).files[0]).then(source => {
      if (source !== undefined && source != null) {
        this.source = source;
        const base64 = this.source.split(',')[1];
        this.model.avatar = base64;
      }
    });
  }

  closeSuccessAlert(): void {
    this.isAlertSuccessOpen = false;
  }

  closeFailureAlert(): void {
    this.isAlertFailureOpen = false;
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(new Error(error.error.message || "server error"));
  }

  onSubmit() {
    this.userService.update(this.model).pipe(catchError(this.errorHandler)).subscribe(user => {
      this.model = user;
      this.isAlertSuccessOpen = true;
      this.successMessage = 'The changes were successfully saved';
      this.postService.getPosts().subscribe(posts => posts.forEach(post => {
        if (post.authorname === this.model.username) {
          post.avatar = this.model.avatar;
          this.postService.updateCacheAfterUpdate(post);
        }
      }))
    }, (error: any) => {
      this.isAlertFailureOpen = true;
      this.errorMessage = error.message;
    });
  }

}
