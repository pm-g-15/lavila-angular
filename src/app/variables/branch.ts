import { BranchImage } from './branch-images';

export class Branch {
    constructor(
        public id:string = null,
        public name:string = null,
        public nameAr:string = null,
        public address:string = null,
        public addressAr:string = null,
        public description:string = null,
        public descriptionAr:string = null,
        public lat:number = null,
        public lng:number = null,
        public selectedUserId:number = null,
        public userId:number = null,
        public branchImages:BranchImage[] = [],
        public status:boolean = true
    ) {}
}