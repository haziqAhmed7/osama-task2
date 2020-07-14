import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
    constructor(private http: HttpClient) { }

    public async login(email: string, password: string): Promise<object> {
      let response = {status: 1, message: null, data: null};
      const url = 'https://localhost:44310/api/Authenticaion/signin';
      const payload = {

      };
      await this.http.post(url, payload)
      .toPromise()
      .then(data => {
        response.status = 1;
        response.message = 'Success';
        response.data = {
          user_id: data['userGuid'],
          firstName: data['userFirstName'],
          lastName: data['userLastName'],
          email: data['emailAddress'],
        }
      })
      .catch(error => {
        console.log('here');
        response.status = 0;
        response.message = 'some error occurred';
        response.data = null;
      });
      console.log(response);

      // set fake data for testing purpose
      const fakeResponse = {
        status: 1, message: 'success',
        data: {
          user_id: 'ef16a181-2ff2-469a-b58c-04569a76f96e',
          email: 'osamashafqat@msn.com',
          firstName: 'Osama',
          lastName: 'Shafqat',
        }
      }
      return fakeResponse; // response;
    }
}