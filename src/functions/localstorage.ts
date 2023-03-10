import {authKey} from "@/constants"
import {User, Session} from "@supabase/supabase-js"

export function getUser(): User | null{
    const jsonString = localStorage.getItem(authKey);
    const data = JSON.parse(jsonString);
    return data && data.user
}