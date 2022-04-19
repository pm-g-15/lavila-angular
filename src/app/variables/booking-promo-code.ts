export class BookingPromoCode {
    constructor(
      public id:number = null,
      public promoCodeId:number = null,
      public code:string = null,
      public description:string = null,
      public descriptionAr:string = null,
      public discountPercent:number = null
    ) {}
}