import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { env } from 'src/app/variables/env';
import { map } from 'rxjs/operators';
import { colors } from 'src/app/variables/color';

@Injectable({
  providedIn: 'root'
})
export class RoomCalendarService {

  constructor(private http: HttpClient) { }
  getRoomAvailability(data, id): Observable<any> {
    let url = `${env.apiURL}/get-room-availabilities/${id}`;
    return this.http.post(url, data);
    // .pipe(
    //   map((results: any[]) => {
    //     return results.map((ra: any) => {
    //       if (ra.room) {
    //         return {
    //           id: ra.id,
    //           title: ra.room.roomCategory.name+" ( "+ra.bookedCount+" / "+ra.room.count+" )",
    //           start: new Date(ra.date),
    //           end: new Date(ra.date),
    //           color: colors[ra.room.roomCategory.name],
    //           meta: {
    //             ra
    //           }
    //         };
    //       } else {
    //         return {
    //         };
    //       }

    //     });
    //   })
    // );
  }
  updateRoomPricing(data): Observable<any> {
    let url = `${env.apiURL}/update-room-pricing-value`;
    return this.http.post(url,data);
  }
  roomPricingBulkUpdate(data): Observable<any> {
    let url = `${env.apiURL}/room-pricing-bulk-update`;
    return this.http.post(url,data);
  }
  getBookingDetail(id): Observable<any> {
    let url = `${env.apiURL}/booking/${id}`;
    return this.http.get(url);
  }
  listBranch(): Observable<any> {
    let url = `${env.apiURL}/branch`
    return this.http.get(url);
  }
  updatePricing(data, id): Observable<any> {
    let url = `${env.apiURL}/update-room-pricing/${id}`;
    return this.http.post(url, data);
  }
}
