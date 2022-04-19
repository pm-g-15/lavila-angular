export class User {
    constructor(
        public id:number = null,
        public fName:string = null,
        public lName:string = null,
        public phone:number = null,
        public email:string = null,
        public image:string = null,
        public password:string = null,
        public status:boolean = true
    ) {}
}