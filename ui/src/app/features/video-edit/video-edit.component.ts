import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IVideo, VideoOrientation } from 'src/app/shared/models/iVideo.model';
import { VideoService } from 'src/app/shared/services/video.service';

@Component({
  selector: 'app-video-edit',
  templateUrl: './video-edit.component.html',
  styleUrls: ['./video-edit.component.scss']
})
export class VideoEditComponent implements OnInit, OnDestroy {
  video: IVideo;
  videoOrientation: VideoOrientation;
  private videoSubscription: Subscription | null;
  
  constructor(private videoSvc: VideoService) { 
    this.video = null;
    this.videoSubscription = null;
  }

  ngOnInit(): void {
    this.subscribeToVideo();
  }

  private subscribeToVideo() {
    this.videoSubscription = this.videoSvc.Base64String.subscribe(videoObj => {
      this.video = videoObj;
    });
  }

  ngOnDestroy() {
    if (this.videoSubscription && !this.videoSubscription.closed) this.videoSubscription.unsubscribe();
  }
}
