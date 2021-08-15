import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { APIRoutes } from '../constants/api-route.constants';
import { ILogin } from '../models/iLogin.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginUser$: BehaviorSubject<any>;

  constructor(private http: HttpClient) {
    this.loginUser$ = new BehaviorSubject(null);
  }

  public get LogggedInUser() {
    return this.loginUser$.asObservable();
  }

  signInUser(loginCredentials: ILogin) {
    return this.http.post<any>(APIRoutes.SignIn, loginCredentials)
      .pipe(tap(user => {
        this.loginUser$.next(user);
      }));
  }

  signOut() {
    this.loginUser$.next(null);
  }
}
