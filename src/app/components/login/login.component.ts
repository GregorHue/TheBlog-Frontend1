import { Component, OnInit, Input } from '@angular/core';
import { Login } from 'src/app/interfaces/login';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from 'src/app/services/login.service';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Input() newLogin: Login;

  isAlertFailureOpen: boolean = false;
  errorMessage: string = '';

  errorHandler(error: HttpErrorResponse) {
    return throwError(new Error(
      error.error ? error.error.message : 'Something went wrong. Please try again!'));
  }

  constructor(public activeModal: NgbActiveModal, private loginService: LoginService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.loginService.login(this.newLogin).pipe(catchError(this.errorHandler)).subscribe(
      () => {
        this.activeModal.close();
      }, (error: any) => {
        this.isAlertFailureOpen = true;
        this.errorMessage = error.message;
      }
    )
  }

}
