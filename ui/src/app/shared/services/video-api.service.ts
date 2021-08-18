import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIRoutes } from '../constants/api-route.constants';
import { IVideo } from '../models/iVideo.model';

@Injectable({
  providedIn: 'root'
})
export class VideoApiService {

  constructor(private _http: HttpClient) { }

  public uploadRawVideo(video: IVideo): Observable<any> {
    return this._http.post<any>(APIRoutes.UploadRawVideo, {path: video.base64String});
  }

  public postVideoEdits(tags: IUploadTag[], rotate?: boolean): Observable<any> {
    var body = {
      tags: tags,
      rotate: rotate
    };
    return this._http.post<any>(APIRoutes.UploadVideoEdits, body);
  }
}

export interface IUploadTag{
  location: 'left' | 'right';
  image: string;
}
