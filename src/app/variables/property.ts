export class Property {
    constructor(
        public id:number = null,
        public name:string = null,
        public nameAr:string = null,
        public description:string = null,
        public descriptionAr:string = null,
        public bedroomNo:number = null,
        public bathroomNo:number = null,
        public plotArea:number = null,
        public price:number = null,
        public carParking:boolean = false,
        public furnished:boolean = false,
        public phone:number = null,
        public email:string = null,
        public address:string = null,
        public addressAr:string = null,
        public lat:number = 25.209094339280746,
        public lng:number = 50.95256742556967,
        public featured:boolean = false,
        public propertyTypeId:number = null,
        public propertyPurposeId:number = null,
        public propertyLocationId:number = null,
        public propertyLookingForId:number = null,
        public amenityId:number[] = [],
        public propertyImages:{path:string}[] = [],
        public images:File[] = [],
    ) {}
}