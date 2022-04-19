export class BookingCard {
    constructor(
        public id:number = null,
        public creditCard:number = null,
        public cvc:number = null,
        public expirationDate:string = null,
        public name:string = null
    ) {}
}