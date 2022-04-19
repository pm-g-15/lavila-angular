export class Addon {
    constructor(
        public name:string = null,
        public nameAr:string = null,
        public description:string = null,
        public descriptionAr:string = null,
        public price:number = null,
        public image:File = null,
        public multiple:boolean = false
    ) {}
}
