import { Location } from "./location";

export interface Bcast {
    expiresAt: Date;
    content: {
        title: string;
        message: string;
    },
    maxUsers: number;
    maxDistanceKm: number;
    tag: string[];
    location: Location;
    explicitContent?: boolean;
}