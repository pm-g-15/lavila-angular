import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { env } from 'src/app/variables/env';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http:HttpClient) { }
  getAllBooking(data):Observable<any>{
    let url = `${env.apiURL}/list-all-booking`;
    return this.http.post(url,data);
  }
  getCompletedBooking(data):Observable<any>{
    let url = `${env.apiURL}/completed-booking`;
    return this.http.post(url,data);
  }
  getUpcomingBooking(data):Observable<any>{
    let url = `${env.apiURL}/upcoming-booking`;
    return this.http.post(url,data);
  }
  getCancelledBooking(data):Observable<any>{
    let url = `${env.apiURL}/cancelled-booking`;
    return this.http.post(url,data);
  }
  getNoShowBooking(data):Observable<any>{
    let url = `${env.apiURL}/noshow-booking`;
    return this.http.post(url,data);
  }
  getInvalidBooking(data):Observable<any>{
    let url = `${env.apiURL}/invalid-booking`;
    return this.http.post(url,data);
  }
  getBooking(id):Observable<any>{
    let url = `${env.apiURL}/booking/${id}`;
    return this.http.get(url);
  }
  cancelBooking(data):Observable<any>{
    let url = `${env.apiURL}/cancel-booking`;
    return this.http.post(url,data);
  }
  listBranch():Observable<any>{
    let url = `${env.apiURL}/branch`;
    return this.http.get(url);
  }
  checkOut(data):Observable<any>{
    let url = `${env.apiURL}/check-out`;
    return this.http.post(url,data);
  }
  moveToNoShow(id,cancellationAmount):Observable<any>{
    let url = `${env.apiURL}/move-to-no-show/${id}`;
    return this.http.post(url,{cancellationAmount:cancellationAmount});
  }
  markAsInvalid(id):Observable<any>{
    let url = `${env.apiURL}/mark-as-invalid/${id}`;
    return this.http.get(url);
  }
}
