import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CognitoService } from '../services/cognito.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    private cognito: CognitoService,
    private router: Router,
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.cognito.isAuthenticated().then(
      success => {
        return Promise.resolve(true);
      },
      failed => {
        {
          this.router.navigateByUrl('login');
          return Promise.reject(false);
        }
      }
    );
  }
}
