import { Addon } from './addon';
import { BookingUser } from './booking-user';
import { BookingAddon } from './booking-addon';
import { BookingStatus } from './booking-status';
import { BookingCancellation } from './booking-cancellation';
import { Room } from './room';

export class BookingDetails {
  constructor( 
      public id:string = null,
      public adultCount:number = null,
      public adultPrice:number = null,
      public childCount:number = null,
      public childPrice:number = null,
      public checkIn:string = null,
      public checkOut:string = null,
      public finalPrice:number = null,
      public offerPercent:number = null,
      public createdAt:string = null,
      public bookingAddon:BookingAddon[] = [],
      public bookingStatus:BookingStatus = new BookingStatus(),
      public booking_cancellation:BookingCancellation = null,
      public bookingUser:BookingUser = new BookingUser(),
      public room: Room = new Room() 
  ) { }
}