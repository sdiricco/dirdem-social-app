export interface IRawListedBcast {
    id: string;
    user_id: string;
    expires_at: string | Date;
    title: string;
    max_users: number;
    tag: string [];
    image_name: string;
    location: string;
    dist_meters: number;
    joined: boolean;
}