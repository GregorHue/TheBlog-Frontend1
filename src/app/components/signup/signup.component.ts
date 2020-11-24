import { Component, OnInit, Input } from '@angular/core';
import { Signup } from 'src/app/interfaces/signup';
import { SignupService } from 'src/app/services/signup.service';
import { LoginService } from 'src/app/services/login.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, } from 'rxjs/operators';
import { Login } from 'src/app/interfaces/login';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  @Input() newSignup: Signup;

  isAlertSuccessOpen: boolean = false;
  isAlertFailureOpen: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  errorHandler(error: HttpErrorResponse) {
    return throwError(new Error(error.error.message || "server error"));
  }

  constructor(public activeModal: NgbActiveModal, private signupService: SignupService,
    private loginService: LoginService, private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.signupService.signup(this.newSignup).pipe(catchError(this.errorHandler))
      .subscribe((signup: Signup) => {
        let newLogin: Login = {
          username: this.newSignup.username,
          password: this.newSignup.password
        };
        this.loginService.login(newLogin).pipe(catchError(this.errorHandler)).subscribe(
          (response: HttpResponse<Object>) => {
            this.authService.handleLogin(response);
            this.isAlertSuccessOpen = true;
            this.successMessage = `Account created and successfully logged in!`;
            setTimeout(() => this.activeModal.close(), 4000);
          });
      }, (error: any) => {
        this.isAlertFailureOpen = true;
        this.errorMessage = error.message;
      })
  }
}
