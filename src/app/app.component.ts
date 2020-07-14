import { Component, VERSION } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { LoginService } from './services/login.service';
import {UserService} from './services/user.service';
import {UserModel} from './interfaces/user.model';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  form: FormGroup;
  color = "primary";
  // form controls
  controlEmail = new FormControl(null, Validators.email);
  controlPassword = new FormControl(null, [
    Validators.minLength(3), Validators.maxLength(20)
  ]);

  constructor(
    formGroup: FormBuilder, private snackBar: MatSnackBar,
    private login: LoginService, private userService: UserService,
    ) {
    this.loadForm(formGroup);
  }

  onSubmit(post) {
    console.log(post);
    const email = post.email;
    const  password = post.password;

    if (email == null || password == null) {
      // throw error now,,
      this.openSnackBar('Invalid Values');
      return null;
    }
    // authenticate against value supplied
    this.loginAttempt(email, password);
  }

  private loadForm(form): void {
    this.form = form.group({
      email: this.controlEmail,
      password: this.controlPassword,
    });
  }

  private openSnackBar(message: string, duration = 2000) {
    this.snackBar.open(message, null, {
      duration: duration,
    });
  }

  private async loginAttempt(email: string, pass: string): Promise<object> {
    const response = await this.login.login(email, pass);
    if (response['status'] < 1) {
      // invalid credentials
      this.openSnackBar(response['message']);
      return null;
    }
    // login successfull redirect now...
   this.mapUser(response['data']);
    return null;
  }

  private mapUser(data: any) {
    const user: UserModel = {
      userId: data['user_id'],
      emailAddress: data['email'],
      firstName: data['firstName'],
      lastName: data['lastName'],
    };
    this.userService.setUser(user);
    console.log(this.userService.getUser());
  }
}
