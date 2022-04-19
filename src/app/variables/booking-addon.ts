import { Addon } from './addon';

export class BookingAddon {
    constructor(
        public addonId:number = null,
        public price:number = null,
        public count:number = null,
        public addon:Addon = null
    ) {}
}