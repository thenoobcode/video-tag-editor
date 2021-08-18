import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from './shared/components/loader/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'Video Editor';
  loaderSubscription: Subscription;
  isLoading: boolean;

  constructor(private loaderSvc: LoaderService) { }

  ngOnInit(): void {
    this.subscribeToLoader();
  }
  
  ngOnDestroy(): void {
    if (this.loaderSubscription && !this.loaderSubscription.closed)
      this.loaderSubscription.unsubscribe();
  }

  private subscribeToLoader() {
    this.loaderSubscription = this.loaderSvc.Loading.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
  }

}
