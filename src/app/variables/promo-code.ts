import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

export class PromoCode {
    constructor(
        public id:number = null,
        public code:string = null,
        public description:string = null,
        public descriptionAr:string = null,
        public discountPercent:number = null,
        public global:boolean = false,
        public expDate:NgbDateStruct =  {
          year: null,
          month: null,
          day: null
        },
        public status:string = null,
        public users:string[] = [],
        public branchId:number = null
    ) {}
}