import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { mergeMap, take } from 'rxjs/operators';
import { CommonService } from 'src/app/shared/services/common.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { VideoApiService } from 'src/app/shared/services/video-api.service';
import { VideoService } from 'src/app/shared/services/video.service';

@Component({
  selector: 'app-video-upload',
  templateUrl: './video-upload.component.html',
  styleUrls: ['./video-upload.component.scss']
})
export class VideoUploadComponent implements OnInit {
  selectedFile: File;
  constructor(
    private videoSvc: VideoService,
    private router: Router,
    private videoAPISvc: VideoApiService,
    private commonSvc: CommonService,
    private notificationSvc: NotificationService
  ) { }

  ngOnInit(): void {
  }

  onFileChange(files: FileList) {
    if (files?.length > 0) {
      if (files[0].type.match('video.*'))
        this.selectedFile = files[0];
      else
        this.notificationSvc.alert("Please upload only video files.");
    }
  }

  async uploadVideo() {
    if (!this.selectedFile) return;
    
    await this.videoSvc.setVideo(this.selectedFile);
    this.videoSvc.Base64String.pipe(
      mergeMap((_video:any) => {
        return this.videoAPISvc.uploadRawVideo(_video)
      }),
      take(1)
    ).subscribe(()=>{
      this.router.navigate(['edit']);
    },
    (err)=> {
      this.commonSvc.handleError(err, "The video was not uploaded. Something didn't work fine.");
    });
  }

}
