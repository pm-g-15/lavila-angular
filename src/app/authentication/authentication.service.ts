import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs/internal/Observable';
import { catchError, map } from 'rxjs/operators';
import { throwError, Subject } from 'rxjs';
import { env } from '../variables/env';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  fromRouter:boolean;
  redirectURL: string;
  authenticatedFlag: boolean;
  authenticateWatcher = new Subject<boolean>();
  setAuthenticate(key: boolean) {
    this.authenticatedFlag = key;
    this.authenticateWatcher.next(true);
  }
  watchAuthenticate(): Observable<any> {
    return this.authenticateWatcher.asObservable(); 
  }
  checkAuth(){
    if(sessionStorage.getItem('token')!= undefined && sessionStorage.getItem('refresh_token')!= undefined){
      return true;
    }else{
      return false;
    }
  }
  constructor(private http: HttpClient) { }
  login(data): Observable<any> {
    return this.http.post<any>(`${env.apiURL}/admin/auth`, data)
      .pipe(
        map(response => {
          this.addTokens(response.accessToken, response.refreshToken);
          return "success";
        }),
        catchError(this.loginHandleError)
      );
  }
  updateAccess(): Observable<any> {
    let apiURL = `${env.apiURL}/admin/auth/refresh`;
    let header = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    })
    return this.http.post<any>(apiURL, { refresh_token: sessionStorage.getItem('refresh_token') }, { headers: header }).pipe(
      map(response => {
        this.addTokens(response.accessToken, response.refreshToken);
        return "success";
      }),
      catchError(this.handleError)
    )
  }
  addTokens(accessToken: string, refreshToken: string) {
    
    this.setAuthenticate(true);
    sessionStorage.setItem('token', accessToken);
    sessionStorage.setItem('refresh_token', refreshToken);
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else { 
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(`${error.error}`);
  };
  private loginHandleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else { 
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error.errors[0]}`);
    }
    return throwError(`${error.error.errors[0]}`);
  };
}
