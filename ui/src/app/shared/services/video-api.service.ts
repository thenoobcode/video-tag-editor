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

  public postVideoEdits(tags: IUploadTag[], icons?: IUploadTag[], rotate: boolean=false): Observable<ArrayBuffer> {
    var body = {
      tags: tags,
      icons: icons,
      rotate: rotate
    };
    return this._http.post(APIRoutes.UploadVideoEdits, body, {
      responseType: "arraybuffer"
    });
  }
}

export interface IUploadTag{
  location: 'left' | 'right';
  image: string;
}
