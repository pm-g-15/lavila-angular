import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Room } from './room';

export class Offer {
    constructor(
        public id:number = null,
        public offerPercent:number = null,
        public roomId:number = null,
        public room:Room = null,
        public status:boolean = true
    ) {}
}