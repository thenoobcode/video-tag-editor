import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private notificationSvc: NotificationService) { }

  public handleError(err: any, defaultMsg?: string) {
    if (err instanceof HttpErrorResponse) {
      this.notificationSvc.alert(err.message);
      console.error(err);
    }
    else if(err?.error?.message)
    {
      this.notificationSvc.alert(err.error.message);
    }
    else {
      this.notificationSvc
        .alert(defaultMsg ? defaultMsg : "Something didn't work quite right. Please try again.");
      console.error(err);
    }
  }
}
