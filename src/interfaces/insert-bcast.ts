import { IGeoLocation } from "./geo-location";

export interface IInsertBcast {
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
