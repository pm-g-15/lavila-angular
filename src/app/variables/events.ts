import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

export class Events {
    constructor(
        public id:number = null,
        public name:string = null,
        public nameAr:string = null,
        public description:string = null,
        public descriptionAr:string = null,
        public image:string = null,
        public eventImage:File = null,
        public date:NgbDateStruct =  {
            year: null,
            month: null,
            day: null
          },
        public featured:boolean = false
    ) {}
}