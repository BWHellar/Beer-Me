import { PlaceLocation } from './location.model';

export class Beer {
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public imageUrl: string,
        public price: number,
        public date: Date,
        public userId: string,
        public location: PlaceLocation
        ){}
}