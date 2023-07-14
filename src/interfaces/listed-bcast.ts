import { IGeoLocation } from "./geo-location";

export interface IListedBcast {
    id: string;
    userId: string;
    expiresAt: string | Date;
    maxUsers: number;
    tag: string [];
    title: string;
    location: IGeoLocation;
    imageName: string;
    distMeters: number;
    joined: boolean;
}