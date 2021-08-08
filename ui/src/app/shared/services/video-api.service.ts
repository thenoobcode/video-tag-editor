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
    return this._http.post<any>(APIRoutes.UploadRawVideo, video);
  }
}
