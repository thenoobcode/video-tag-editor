import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VideoService } from 'src/app/shared/services/video.service';

@Component({
  selector: 'app-video-upload',
  templateUrl: './video-upload.component.html',
  styleUrls: ['./video-upload.component.scss']
})
export class VideoUploadComponent implements OnInit {

  constructor(
    private videoSvc: VideoService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  async uploadVideo(event: any) {
    if (!event.target.files) return;
    const videoFile = event.target.files![0];
    if (videoFile) {
      this.videoSvc.setVideo(videoFile);
      this.router.navigate(['edit']);
    }
  }

  

}
