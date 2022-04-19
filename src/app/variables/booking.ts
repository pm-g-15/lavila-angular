import { Addon } from './addon';
import { BookingUser } from './booking-user';
import { BookingRoom } from './booking-room';
import { Branch } from './branch';
import { BookingPromoCode } from './booking-promo-code';
import { BookingLoyalty } from './booking-loyalty';
import { BookingCard } from './booking-card';
import { BookingStatus } from './booking-status';
import { BookingCancellation } from './booking-cancellation';

export class Booking {
    constructor(
      public id:string = null,
      public branchId:number = null,
      public adultCount:number = null,
      public childCount:number = null,
      public roomCount:number = null,
      public checkIn:string = null,
      public checkOut:string = null,
      public finalPrice:number = null,
      public bookingRoom:BookingRoom[] = [],
      public bookingUser:BookingUser = null,
      public branch:Branch = null,
      public createdAt:string = null,
      public bookingStatusId:number = null,
      public bookingPromoCode:BookingPromoCode = null, 
      public bookingLoyalty:BookingLoyalty = null,
      public bookingCard:BookingCard = null,
      public bookingStatus:BookingStatus = null,
      public booking_cancellation:BookingCancellation = null,
      public userId:number = null,
      public email:string = null,
    ) {}
}