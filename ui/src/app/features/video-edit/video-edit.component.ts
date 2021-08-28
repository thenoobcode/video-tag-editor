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
import { AvailableIconsPaths, LeftSideTags } from './tags.constant';

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
  firstSelectedIcon: string;
  secondSelectedIcon: string;
  currencyEnum = Currency;
  availableIcons: string[];
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
    this.leftSideTags = JSON.parse(JSON.stringify(LeftSideTags));
    this.availableIcons = JSON.parse(JSON.stringify(AvailableIconsPaths));
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
    let icons: IUploadTag[] = [];

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

    if (this.firstSelectedIcon) {
      icons.push({
        image: await this.imageSvc.imgPathToBase64(this.firstSelectedIcon),
        location: 'left'
      });
    }

    if (this.secondSelectedIcon) {
      icons.push({
        image: await this.imageSvc.imgPathToBase64(this.secondSelectedIcon),
        location: 'right'
      });
    }
    
    this.videoAPISvc.postVideoEdits(tags, icons, rotate)
    .pipe(take(1))
    .subscribe((arrayBuffer: ArrayBuffer) => {
      this.commonSvc.downloadFile(arrayBuffer, "video/mp4", true);
      this.resetValues();
      this.notificationSvc.alert("The edits has been saved successfully.", "S");
    },
    err=> this.commonSvc.handleError(err));
  }

  onIconSelect(position: 'left' | 'right', icon: string) {
    if (position === "left")
      this.firstSelectedIcon = icon;
    else if (position === "right")
      this.secondSelectedIcon = icon;
  }

  resetValues() {
    this.selectedLeftTag = null;
    this.selectedRightTag = null;
    this.firstSelectedIcon = null;
    this.secondSelectedIcon = null;
  }

  ngOnDestroy() {
    if (this.videoSubscription && !this.videoSubscription.closed)
      this.videoSubscription.unsubscribe();
  }
}
