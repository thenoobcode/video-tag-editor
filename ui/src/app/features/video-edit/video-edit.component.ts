import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ITag } from 'src/app/shared/models/iTag.model';
import { Currency } from 'src/app/shared/models/iTagItem.model';
import { IVideo, VideoOrientation } from 'src/app/shared/models/iVideo.model';
import { VideoService } from 'src/app/shared/services/video.service';
import { LeftSideTags } from './tags.constant';

@Component({
  selector: 'app-video-edit',
  templateUrl: './video-edit.component.html',
  styleUrls: ['./video-edit.component.scss']
})
export class VideoEditComponent implements OnInit, OnDestroy {
  video: IVideo;
  videoOrientation: VideoOrientation;
  leftSideTags: ITag[];
  selectedLeftTag: ITag;
  selectedRightTag: ITag;
  currencyEnum = Currency;
  private videoSubscription: Subscription | null;
  
  constructor(private videoSvc: VideoService) { 
    this.video = null;
    this.videoSubscription = null;
    this.leftSideTags = LeftSideTags;
  }

  ngOnInit(): void {
    this.subscribeToVideo();
  }

  private subscribeToVideo() {
    this.videoSubscription = this.videoSvc.Base64String.subscribe(videoObj => {
      this.video = videoObj;
    });
  }

  selectLeftTag(tag: any) {
    this.selectedLeftTag = tag;
  }

  selectRightTag(tag: any) {
    this.selectedRightTag = tag;
  }

  ngOnDestroy() {
    if (this.videoSubscription && !this.videoSubscription.closed) this.videoSubscription.unsubscribe();
  }
}
