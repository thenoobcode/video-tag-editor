import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor() { }

  public convertSvgToPNG(svg: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      try {
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');
        let img = new Image();
        let url = `data:image/svg+xml,${svg}`;

        img.onload = function () {
          ctx.drawImage(img, 0, 0);
          resolve(canvas.toDataURL('image/png'));
          img.remove();
          canvas.remove();
        };

        img.src = url;
      }
      catch (err) {
        reject(err);
      }
    });
  }
}
