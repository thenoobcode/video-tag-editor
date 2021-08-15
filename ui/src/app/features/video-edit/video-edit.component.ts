import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TagComponent } from 'src/app/shared/components/tag/tag.component';
import { ITag } from 'src/app/shared/models/iTag.model';
import { Currency } from 'src/app/shared/models/iTagItem.model';
import { IVideo, VideoOrientation } from 'src/app/shared/models/iVideo.model';
import { ImageService } from 'src/app/shared/services/image.service';
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
    private router: Router
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

  async saveVideo() {
    var leftTagImgPromise = this.imageSvc.convertSvgToPNG(this.leftTagRef.SVG);
    var rightTagImgPromise = this.imageSvc.convertSvgToPNG(this.rightTagRef.SVG);
    
    var images = await Promise.all([leftTagImgPromise, rightTagImgPromise]);
    
    console.log(images);
  }

  resetValues() {
    
  }

  rotateAndSave() {
    
  }

  ngOnDestroy() {
    if (this.videoSubscription && !this.videoSubscription.closed)
      this.videoSubscription.unsubscribe();
  }
}
