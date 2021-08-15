import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';
import { map, mergeMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private loginSvc: LoginService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.loginSvc.LogggedInUser.pipe(
      mergeMap(user => {
        request = this.addHeaders(request, user);
        return next.handle(request);
      })
    );
  }

  /**Adds required http headers and authentication token too. */
  addHeaders(req:HttpRequest<any>, authToken:string): HttpRequest<any>{
    let headers: any={};

    if(!req.headers.has("content-type"))
    headers["content-type"]="application/json; charset=utf-8";
    else
    headers["content-type"]=req.headers.get("content-type");

    if(!req.headers.has("accept"))
    headers["accept"]="application/json";
    else
    headers["accept"]=req.headers.get("accept");
      
    if(authToken!=null && authToken.length>0){
      headers["Authorization"]=`Bearer ${authToken}`;
    }
      req = req.clone({
        setHeaders: headers
      });
    return req;
  }
}
