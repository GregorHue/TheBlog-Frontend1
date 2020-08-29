import { Component, OnInit, Input } from '@angular/core';
import { Signup } from 'src/app/interfaces/signup';
import { SignupService } from 'src/app/services/signup.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, } from 'rxjs/operators';

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

  constructor(public activeModal: NgbActiveModal, private signupService: SignupService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.signupService.createSignup(this.newSignup).pipe(catchError(this.errorHandler)).subscribe((signup: Signup) => {
      this.isAlertSuccessOpen = true;
      this.successMessage = `Account with username ${signup.username} successfully created!`
    }, (error: any) => {
      this.isAlertFailureOpen = true;
      this.errorMessage = error.message;
    });
  }

}
