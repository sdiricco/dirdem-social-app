import { IRawUserInfo } from "@/interfaces/raw/raw-user-info";
import { IUserInfo } from "@/interfaces/user-info";
import { IRawBcast } from "@/interfaces/raw/raw-bcast";
import { IMessage } from "@/interfaces/message";
import { IRawMessage } from "@/interfaces/raw/raw-message";
import { IInsertBcast } from "@/interfaces/insert-bcast";


const buildRawUserInfo = (userId: string, userInfo: Partial<IUserInfo> ): IRawUserInfo => ({
    id: userId,
    bcast_to_get: userInfo.bcast.toGet,
    bcast_to_send: userInfo.bcast.toSend,
    tag: userInfo?.tag,
});

const buildRawBcast = (userId: string, bcast: IInsertBcast): Partial<IRawBcast> => ({
    user_id: userId,
    expires_at: bcast.expiresAt,
    max_user: bcast.maxUsers,
    max_distance_km: bcast.maxDistanceKm,
    tag: bcast.tag,
    title: bcast.content.title,
    content: bcast.content.message,
    location: `POINT(${bcast.location.lng} ${bcast.location.lat})`
});

const buildRawMessage = (userId: string, bcastId: string, message: IMessage): Partial<IRawMessage> => ({
    user_id: userId,
    bcast_id: bcastId,
    content: message.content
})


export default {
    buildRawUserInfo,
    buildRawBcast,
    buildRawMessage
}