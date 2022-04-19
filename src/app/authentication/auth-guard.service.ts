import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private dataService: AuthenticationService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let url: string = state.url;
    return this.checkLogin(url);
    // else navigate to login
  }
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let url: string = state.url;
    return this.checkLogin(url);
    // else navigate to login
  }
  checkLogin(url: string): boolean {
    if (this.dataService.checkAuth()) {
      return true;
    } else {
      this.dataService.setAuthenticate(false);
      this.dataService.fromRouter = true;
      this.dataService.redirectURL = url;
      this.router.navigate(['/login']);
      return false;
    }

  }
}