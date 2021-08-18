import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { ILogin } from 'src/app/shared/models/iLogin.model';
import { CommonService } from 'src/app/shared/services/common.service';
import { LoginService } from 'src/app/shared/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginObj: ILogin;

  constructor(
    private loginSvc: LoginService,
    private commonSvc: CommonService
  ) {
    this.loginObj = {
      password: null,
      username: null
    };
  }

  ngOnInit(): void {
  }

  login() {
    this.loginSvc.signInUser(this.loginObj)
    .pipe(take(1))
    .subscribe(()=>{}, (err) => this.commonSvc.handleError(err));
  }

}
