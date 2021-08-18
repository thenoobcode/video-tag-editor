import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { CommonService } from 'src/app/shared/services/common.service';
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
    private commonSvc: CommonService
  ) { }

  ngOnInit(): void {
  }

  onFileChange(files: FileList) {
    if(files?.length > 0) this.selectedFile = files[0];
  }

  async uploadVideo() {
    if (!this.selectedFile) return;
    
    this.videoSvc.setVideo(this.selectedFile);
    let video = await this.videoSvc.Base64String.toPromise();
    this.videoAPISvc.uploadRawVideo(video)
    .pipe(take(1))
    .subscribe(()=>{
      this.router.navigate(['edit']);
    },
    (err)=> {
      this.commonSvc.handleError(err, "The video was not uploaded. Something didn't work fine.");
    });
  }

}
