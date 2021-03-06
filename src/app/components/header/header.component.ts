import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SignupComponent } from '../signup/signup.component';
import { Signup } from '../../interfaces/signup';
import { LoginComponent } from '../login/login.component';
import { Login } from '../../interfaces/login';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isCollapsed: boolean = true;

  constructor(public modal: NgbModal, public authService: AuthService, private userService: UserService, private router: Router) { }

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

  openLogin() {
    const modalRef = this.modal.open(LoginComponent);
    let newLogin: Login = {
      username: null,
      password: null
    }
    modalRef.componentInstance.newLogin = newLogin;
  }

  logout() {
    this.authService.logout(this.router);
    this.userService.clearCache();
  }
}
