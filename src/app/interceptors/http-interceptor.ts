import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';


@Injectable()
export class CustomInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    const interceptedReq = req.clone({
      headers: req.headers.set('Content-Type', 'application/json')
    });

    return next.handle(interceptedReq);
  }
}