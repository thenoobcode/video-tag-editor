import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { ILogin } from 'src/app/shared/models/iLogin.model';
import { CommonService } from 'src/app/shared/services/common.service';
import { LoginService } from 'src/app/shared/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginObj: ILogin;
  loginSubscription: Subscription;

  constructor(
    private loginSvc: LoginService,
    private commonSvc: CommonService,
    private router: Router
  ) {
    this.loginObj = {
      password: null,
      username: null
    };
  }
  
  ngOnDestroy(): void {
    if (this.loginSubscription && !this.loginSubscription.closed)
      this.loginSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.listenToLogin();
  }

  login() {
    this.loginSvc.signInUser(this.loginObj)
    .pipe(take(1))
    .subscribe((m)=>{console.warn(m)},
    (err) => this.commonSvc.handleError(err));
  }

  private listenToLogin() {
    this.loginSubscription = this.loginSvc.LogggedInUser.subscribe(user => {
      if (user)
        this.router.navigate([""]);
    })
  }

}
