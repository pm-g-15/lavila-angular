export class BookingCancellation {
    constructor(
        public id:number,
        public date:string,
        public balanceAmount:number,
        public note:string,
    ) {}
}