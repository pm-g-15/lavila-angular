import { RoomImage } from './room-images';
import { Addon } from './addon';
import { RoomCategories } from './room-categories';
import { Branch } from './branch';
import { RoomDate } from './room-date';
import { BedType } from './bed-type';

export class Room {
    constructor(
        public id: number = null,
        public description: string = null,
        public descriptionAr: string = null,
        public branchId: number = null,
        public branch: Branch = null,
        public roomCategoryId: number = null,
        public roomCategory: RoomCategories = null,
        public roomDate: RoomDate[] = [],
        public bedTypeId: number = null,
        public maxAccommodateCount: number = null,
        public adultCount: number = null,
        public childCount: number = null,
        public BBATwoPercent: number = null,
        public BBAOnePercent: number = null,
        public ROATwoPercent: number = null,
        public count: number = null,
        public featured: boolean = false,
        public roomImages: RoomImage[] = [],
        public addons: Addon[] = [],
        public amenitiesId: number[] = [],
        public startDate: any = null,
        public endDate: any = null,
        public bedType: BedType = null,
        public roomCountWithDate: number = null,
        public roomCountStartDate: any = null,
        public roomCountEndDate: any = null,
        public roomCount: any = [],
    ) { }
}