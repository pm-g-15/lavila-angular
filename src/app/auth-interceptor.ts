import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpRequest, HttpClient, HttpHeaders } from "@angular/common/http";
import { HttpInterceptor } from "@angular/common/http";
import { Router } from '@angular/router';
import { env } from './variables/env';
import { Observable, of } from 'rxjs'; 
import { catchError, map } from 'rxjs/operators'; 
import { throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private _router: Router, private http: HttpClient) { }


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = sessionStorage.getItem('token');
        if (token) {
            req = req.clone({
                headers: req.headers.set(
                    'Authorization',('Bearer ' + sessionStorage.getItem('token'))
                )
            });

        }
        return next.handle(req).pipe(
            catchError(err => {
                console.log(err);
                if (err.error == "Invalid token") {
                    let apiURL = `${env.apiURL}/auth/refresh`;
                    let header = new HttpHeaders({
                        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
                        'Content-Type':'application/x-www-form-urlencoded'
                    })
                    this.http.post<any>(apiURL, { refresh_token: sessionStorage.getItem('refresh_token') }, { headers: header }).pipe(
                        map(response => {
                            this.addTokens(response.accessToken, response.refreshToken);
                            req = req.clone({
                                headers: req.headers.set(
                                    'Authorization',('Bearer ' + response.accessToken)
                                )
                            });
                        }),
                        catchError(this.handleError<any[]>('updateAccess', []))
                    )
                }  
                return throwError(err);
            }));
    }
    addTokens(accessToken: string, refreshToken: string) {
        sessionStorage.setItem('token', accessToken);
        sessionStorage.setItem('refresh_token', refreshToken);
    }
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            console.log(`${operation} failed: ${error.message}`);
            
            return of(result as T);
        };
    }
}