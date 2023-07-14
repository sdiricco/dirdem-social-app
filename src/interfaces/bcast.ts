import { IGeoLocation } from "./geo-location";

export interface IBcast {
    id?: string;
    userId?: string;
    createdAt: string | Date;
    expiresAt: string | Date;
    maxUsers: number;    
    tag: string[];
    title: string;
    location: IGeoLocation;
    content: string;
    imageName?: string;
}