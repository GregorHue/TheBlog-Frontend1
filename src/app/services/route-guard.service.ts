import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {

    if (route.data['name'] === 'profile') {
      if (this.authService.loggedInUserUrl && this.authService.loggedInUserUrl.length > 0) {
        const userId: string = this.authService.loggedInUserUrl.split('/')[2];
        if (route.params['userId'] === userId) {
          return true;
        }
      }
    }
    if (route.data['name'] === 'users') {
      if (this.authService.isAdmin) {
        return true;
      }
    }

    this.router.navigate(['home']);
    return false;
  }
}
