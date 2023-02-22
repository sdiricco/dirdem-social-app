
import { UserInfo } from '@/interfaces/user-info';
import { createClient, RealtimePostgresChangesPayload } from '@supabase/supabase-js';
import { Bcast } from 'dirdem-bcast-client/dist/interfaces/bcast';
import { v4 as uuid } from 'uuid';
import { supabaseKey, supabaseUrl } from '../constants';


const supabase = createClient(supabaseUrl, supabaseKey);

const bcast = {
    insert: (userId: string) => (bcast: Bcast) => supabase
        .from('bcast')
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
        }),

    getPending: (userId: string) => supabase
        .from('bcast_user')
        .select('bcast(*)')
        .eq('user_id', userId)
        .is('accepted', null),

    getAccepted: (userId: string) => supabase
        .from('bcast_user')
        .select('bcast(*)')
        .eq('user_id', userId)
        .is('accepted', true),

    getRejected: (userId: string) => supabase
        .from('bcast_user')
        .select('bcast(*)')
        .eq('user_id', userId)
        .is('accepted', false),

    onInsert: (userId: string) => (
        cb: (payload: RealtimePostgresChangesPayload<{ [key: string]: any; }>) => void,
        channelId = uuid(),
    ) => supabase
        .channel(channelId)
        .on(
            'postgres_changes',
            {
                event: 'INSERT',
                schema: 'public',
                table: 'bcast_user',
                filter: `user_id=eq.${userId}`,
            },
            cb
        )
        .subscribe(),

    accept: (userId: string) => supabase
        .from('bcast_user')
        .update({ accepted: true })
        .eq('user_id', userId)
        .is('accepted', null),

    reject: (userId: string) => supabase
        .from('bcast_user')
        .update({ accepted: false })
        .eq('user_id', userId)
        .is('accepted', null)

}

const message = {
    get: (bcastId: string) => supabase
        .from('message')
        .select('*')
        .eq('bcast_id', bcastId),

    insert: (userId: string) => (bcastId: string) => (content: string) => supabase
        .from('message')
        .insert([
            { content, user_id: userId, bcast_id: bcastId }
        ]),

    onInsert: (
        bcastId: string,
        cb: (payload: RealtimePostgresChangesPayload<{ [key: string]: any; }>) => void,
        channelId = uuid(),
    ) => supabase
        .channel(channelId)
        .on(
            'postgres_changes',
            {
                event: 'INSERT',
                schema: 'public',
                table: 'message',
                filter: `bcast_id=eq.${bcastId}`
            },
            cb
        )
        .subscribe()
}

const userInfo = {
    get: (userId: string) => supabase
        .from('user_info')
        .select('*')
        .eq('user_id', userId),

    insert: (userId: string) => (userInfo: UserInfo) => supabase
        .from('user_info')
        .insert({
            user_id: userId,
            bcast_to_send: userInfo.bcast.toSend,
            bcast_to_get: userInfo.bcast.toGet,
            tag: userInfo.tag,
            latitude: userInfo.location.lat,
            longitude: userInfo.location.lng
        })
}


export default {
    supabase,
    bcast,
    message,
    userInfo
}