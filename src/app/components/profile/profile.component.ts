import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Params, ParamMap } from '@angular/router';
import { switchMap, mergeMap, flatMap, map } from 'rxjs/operators';
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
    this.route.paramMap.pipe(map((parameterMap: ParamMap) => +parameterMap.get('userId'))).pipe(flatMap(userId => this.userService.getUser(userId))).subscribe(user => this.model = user);
  }


  closeAlert(): void {
    this.isAlertOpen = false;
  }

  onSubmit() {
    this.userService.update(this.model).subscribe(user => this.model = user);
  }

}
