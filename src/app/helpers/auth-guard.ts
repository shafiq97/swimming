import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';
import { LoginComponent } from '../login/login.component';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private loginComponent: LoginComponent
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser) {
      // logged in so return true
      console.log(currentUser);
      if(Object.keys(currentUser).length === 0){
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
      };
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
