import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { TagComponent } from 'src/app/shared/components/tag/tag.component';
import { ITag } from 'src/app/shared/models/iTag.model';
import { Currency } from 'src/app/shared/models/iTagItem.model';
import { IVideo, VideoOrientation } from 'src/app/shared/models/iVideo.model';
import { CommonService } from 'src/app/shared/services/common.service';
import { ImageService } from 'src/app/shared/services/image.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { IUploadTag, VideoApiService } from 'src/app/shared/services/video-api.service';
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

  @ViewChild("leftTagRef") leftTagRef: TagComponent;
  @ViewChild("rightTagRef") rightTagRef: TagComponent;

  constructor(
    private videoSvc: VideoService,
    private imageSvc: ImageService,
    private router: Router,
    private videoAPISvc: VideoApiService,
    private notificationSvc: NotificationService,
    private commonSvc: CommonService
  ) {
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

    // this.videoAPISvc.downloadVideo().pipe(take(1))
    // .subscribe(video=> this.video=video,
    // (err) => {
    //   this.commonSvc.handleError(err, "The video was not downloaded. Something didn't work fine.");
    // });
  }

  selectLeftTag(tag: any) {
    this.selectedLeftTag = tag;
  }

  selectRightTag(tag: any) {
    this.selectedRightTag = tag;
  }

  uploadNewVideo() {
    this.router.navigate([""]);
  }

  async saveVideo(rotate?: boolean) {
    let tags: IUploadTag[] = [];
    if (this.leftTagRef) {
      tags.push({
        image: await this.imageSvc.convertSvgToBase64PNG(this.leftTagRef.SVG),
        location: "left"
      });
    }

    if (this.rightTagRef) {
      tags.push({
        image: await this.imageSvc.convertSvgToBase64PNG(this.rightTagRef.SVG),
        location: "right"
      });
    }
    
    this.videoAPISvc.postVideoEdits(tags, rotate)
    .pipe(take(1))
    .subscribe(()=>{
      this.notificationSvc.alert("The edits has been saved successfully.");
    },
    err=> this.commonSvc.handleError(err));
  }

  resetValues() {
    this.selectedLeftTag = null;
    this.selectedRightTag = null;
  }

  ngOnDestroy() {
    if (this.videoSubscription && !this.videoSubscription.closed)
      this.videoSubscription.unsubscribe();
  }
}
