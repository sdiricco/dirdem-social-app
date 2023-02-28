import { Bcast } from './../interfaces/bcast';

import {supabase} from '../main'

const BCAST_TABLE = 'bcast'

export async function publish(userId: string, bcast: Bcast){
    try {
        const {data, error} = await supabase
            .from(BCAST_TABLE)
            .insert({
                user_id: userId,
                expires_at: bcast.expiresAt,
                max_user: bcast.maxUsers,
                max_distance_km: bcast.maxDistanceKm,
                tag: bcast.tag,
                title: bcast.content.title,
                content: bcast.content.message,
                latitude: bcast.location.lat,
                longitude: bcast.location.lng,
                explicit: bcast.explicitContent
            })
        //qui devi gestire l'errore creando il tuo errore standard
        return {data, error}
    } catch (e) {
        console.log(e)
    }
}

export async function fetch(userId: string){
    try {
        const {data, error} = await supabase
            .from(BCAST_TABLE)
            .select('*')
        //qui devi gestire l'errore creando il tuo errore standard
        return {data, error}
    } catch (e) {
        console.log(e)
    }
}

