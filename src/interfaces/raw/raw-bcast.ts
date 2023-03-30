export interface IRawBcast {
  id: string;
  user_id: string;
  created_at: string | Date;
  expires_at: string | Date;
  max_user: number;
  max_distance_km: number;
  tag: string[];
  title: string;
  content: string;
  explicit: boolean;
  location: string;
  distance_km?: number;
}

