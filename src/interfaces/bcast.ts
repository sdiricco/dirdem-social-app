import { GeoLocation } from "./geo-location";

export interface Bcast {
    expiresAt: Date;
    content: {
        title: string;
        message: string;
    },
    maxUsers: number;
    maxDistanceKm: number;
    tag: string[];
    location: GeoLocation;
    explicitContent?: boolean;
}