import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AccountService } from '../Service/account.service'
import { ToastrcustomService } from './toastrcustom'

@Injectable()


export class HttpClientInterceptor implements HttpInterceptor {

  constructor(private accountService: AccountService, private router: Router, private toast: ToastrcustomService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!request.headers.has('Content-Type') && request.url.search('Upload') < 0 && request.url.search('Import') < 0) {
      request = request.clone({
        headers: request.headers.set('Content-Type', 'application/json')
      });
    }
    if (request.url.includes('http://45.124.94.191:8789')) {
      request = this.addAccessTokenMb(request);
    } else {
      request = this.addAccessToken(request);
    }
    return next.handle(request).pipe(
      catchError((error) => {
        console.log('error', error);
        const isFobiden = error.status === 403;
        const isUnauthorizedError = error.status === 401;
        const isUnknownError = error.statusText === 'Unknown Error' || error.status === 0 || error.status === 500 || error.status === 504;
        if (isUnauthorizedError) {

          let UserInfo = this.accountService.getUserInfo();

          if (UserInfo.refreshToken && UserInfo.jwt) {
            let obj = {
              accessToken: UserInfo.jwt,
              refreshToken: UserInfo.refreshToken
            }
            localStorage.removeItem('UserInfo');
            this.accountService.refreshToken(obj).subscribe(res => {
              if (res.errorCode == "00") {
                localStorage.setItem('UserInfo', JSON.stringify(res));
                location.reload();
              }
            })
          }
        }
        if (isFobiden) {
          this.toast.showError("B???n kh??ng c?? quy???n truy c???p !");
        }

        if (isUnknownError) {
          this.toast.showError("L???i h??? th???ng !");
        }
        return throwError(error);
      })
    );
  }

  private addAccessToken(request: HttpRequest<any>): HttpRequest<any> {
    const userInfo = this.accountService.getUserInfo();

    if (!userInfo) {
      return request;
    }

    return request.clone({
      setHeaders: {
        Authorization: "Bearer " + userInfo.access_token
      }
    });
  }

  private addAccessTokenMb(request: HttpRequest<any>): HttpRequest<any> {
    const token = this.accountService.getTokenMb();

    if (!token) {
      return request;
    }

    return request.clone({
      setHeaders: {
        Authorization: "Bearer " + token
      }
    });
  }
}
