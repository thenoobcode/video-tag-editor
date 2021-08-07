import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  private _videoBase64Str$: BehaviorSubject<string>;

  constructor() {
    this._videoBase64Str$ = new BehaviorSubject(null);
  }

  public async setVideo(videoFile: File): Promise<void> {
    this._videoBase64Str$.next(await this.convertToBase64(videoFile));
  }

  public get Base64String() {
    return this._videoBase64Str$.asObservable();
  }

  private convertToBase64(file: File): Promise<string | any> {
    return new Promise((myresolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => myresolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

}
