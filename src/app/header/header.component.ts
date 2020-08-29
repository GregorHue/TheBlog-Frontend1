import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SignupComponent } from '../components/signup/signup.component';
import { Signup } from '../interfaces/signup';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isCollapsed: boolean = true;
  loggedInUserUrl = '/users/2';
  log(): void {
    console.log('clicked');
  }

  constructor(public modal: NgbModal) { }

  ngOnInit(): void {
  }

  openSignup() {
    const modalRef = this.modal.open(SignupComponent);
    let newSignup: Signup = {
      username: null,
      password: null,
      confirmPassword: null,
      user_url: null,
    }
    modalRef.componentInstance.newSignup = newSignup;
  }
}
