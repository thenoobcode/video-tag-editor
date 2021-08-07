import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { VideoService } from 'src/app/shared/services/video.service';

@Component({
  selector: 'app-video-edit',
  templateUrl: './video-edit.component.html',
  styleUrls: ['./video-edit.component.scss']
})
export class VideoEditComponent implements OnInit, OnDestroy {
  videoBase64Url: string | null;
  private videoSubscription: Subscription | null;
  
  constructor(private videoSvc: VideoService) { 
    this.videoBase64Url = null;
    this.videoSubscription = null;
  }

  ngOnInit(): void {
    this.subscribeToVideo();
  }

  private subscribeToVideo() {
    this.videoSubscription = this.videoSvc.Base64String.subscribe(base64Str => {
      this.videoBase64Url = base64Str;
    })
  }

  ngOnDestroy() {
    if (this.videoSubscription && !this.videoSubscription.closed) this.videoSubscription.unsubscribe();
  }
}
