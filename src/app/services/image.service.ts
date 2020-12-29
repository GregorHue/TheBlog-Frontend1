import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor() { }

  async scale(file: File): Promise<string> {
    const maxW = 110;
    const maxH = 110;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext("2d");
    let img = new Image();
    img.src = URL.createObjectURL(file);
    return new Promise((res, rej) => {
      img.onload = () => {
        let iw = img.width;
        let ih = img.height;
        let scale = Math.min
          ((maxW / iw), (maxH / ih));
        let iwScaled = iw * scale;
        let ihScaled = ih * scale;
        canvas.width = iwScaled;
        canvas.height = ihScaled;
        ctx.drawImage(img, 0, 0, iwScaled, ihScaled);
        res(canvas.toDataURL())
      };
      img.onerror = () => rej('Scaling failure');
    })
  }

}
