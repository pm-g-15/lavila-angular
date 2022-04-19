export class Loyalty {
    constructor(
        public id:number = null,
        public minTotalBookingAmountPassLoyalty:number = null,
        public oneQAREqualPoint:number = null,
        public minTotalBookingAmountForUsing:number = null,
        public minTotalBookingAmountToGetLoyalty:number = null
    ) {}
}