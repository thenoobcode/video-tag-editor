import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onFileChange(files: FileList) {
    if(files?.length > 0) this.selectedFile = files[0];
  }

  async uploadVideo() {
    if (!this.selectedFile) return;
    
    this.videoSvc.setVideo(this.selectedFile);
    this.router.navigate(['edit']);
  }

  

}
