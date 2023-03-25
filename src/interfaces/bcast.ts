import { IGeoLocation } from "./geo-location";

export interface IBcast {
    id: string;
    userId: string;
    expiresAt: Date;
    content: {
        title: string;
        message: string;
    },
    maxUsers: number;
    maxDistanceKm: number;
    tag: string[];
    location: IGeoLocation;
    explicitContent?: boolean;
}
