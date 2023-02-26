import { Location } from "./location"

export interface UserInfo {
    bcast: {
        toGet: number
        toSend: number
    };
    location: Location;
    tag: string[];
}
