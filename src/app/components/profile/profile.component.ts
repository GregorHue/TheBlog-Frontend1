import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { Gender } from 'src/app/interfaces/gender';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  model: User;
  genders = Object.keys(Gender);
  isAlertOpen = false;

  constructor(private route: ActivatedRoute,
    private userService: UserService) { }

  ngOnInit(): void {
    this.route.params.pipe(switchMap((params: Params) => {
      return params['userId'] as Observable<number>;
    })).subscribe(userId => {
      this.userService.getUser(userId).subscribe(user => this.model = user, error => console.log(error))
    }, error => console.log(error));

  }

  closeAlert(): void {
    this.isAlertOpen = false;
  }

  onSubmit() {
    this.userService.update(this.model).subscribe(user => this.model = user);
  }

}
