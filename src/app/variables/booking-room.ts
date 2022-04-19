import { BookingAddon } from './booking-addon';
import { BookingOffer } from './booking-offer';
import { Room } from './room';

export class BookingRoom {
    constructor(
        public roomId:number = null,
        public BBAOneCount:number = null,
        public BBATwoCount:number = null,
        public ROAOneCount:number = null,
        public ROATwoCount:number = null,
        public BBAOnePrice:number = null,
        public BBATwoPrice:number = null,
        public ROAOnePrice:number = null,
        public ROATwoPrice:number = null,
        public bookingAddon:BookingAddon[] = [],
        public bookingOffer:BookingOffer[] = [],
        public room:Room = null
    ) {}
}