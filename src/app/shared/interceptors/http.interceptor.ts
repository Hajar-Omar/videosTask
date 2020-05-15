import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpHeaders
} from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class AddHeaderInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authReq: HttpRequest<any>;
    if (req.url.search('manifest.webmanifest')) {
      authReq = req.clone({
        headers: new HttpHeaders({
          'Content-Type': 'application/manifest+json'
        })
      });
    } else {
      authReq = req.clone({
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      });
    }
    return next.handle(authReq);
  }
}
