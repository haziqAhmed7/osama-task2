import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
 constructor(
   private router: Router,
   private consumerService: UserService
 ) {}

  canActivate() {
   const temp = this.consumerService.getUser();
   if ( typeof temp === 'undefined') {
     this.router.navigateByUrl('/login');
     return false;
   }
   return true;
  }
}
