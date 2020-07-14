import {Injectable} from '@angular/core';
import { UserModel } from '../interfaces/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: UserModel;

  public setUser(userRecord: UserModel) {
    this.user = userRecord;
  }

  public getUser(): UserModel {
    return this.user;
  }
}