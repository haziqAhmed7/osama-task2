import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {UserService} from '../user.service';

@Injectable()
export class AuthGuardService implements CanActivate {
 constructor(
   private router: Router,
   private consumerService: UserService
 ) {}

  canActivate() {
   const temp = this.consumerService.getConsumer();
   if ( typeof temp === 'undefined') {
     this.router.navigateByUrl('/');
     return false;
   }
   return true;
  }
}
