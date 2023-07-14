import { IRawUserInfo } from "@/interfaces/raw/raw-user-info";
import { IUserInfo } from "@/interfaces/user-info";
import { IRawBcast } from "@/interfaces/raw/raw-bcast";
import { IMessage } from "@/interfaces/message";
import { IRawMessage } from "@/interfaces/raw/raw-message";
import { IBcast } from "@/interfaces/bcast";


const buildRawUserInfo = (userId: string, userInfo: Partial<IUserInfo> ): IRawUserInfo => ({
    id: userId,
    bcast_to_get: userInfo?.bcast?.toGet || 0,
    bcast_to_send: userInfo?.bcast?.toSend || 0,
    tag: userInfo?.tag || [],
});

const buildRawBcast = (userId: string, bcast: IBcast): Partial<IRawBcast> => ({
    user_id: userId,
    expires_at: bcast.expiresAt,
    max_users: bcast.maxUsers,
    tag: bcast.tag,
    title: bcast.title,
    content: bcast.content,
    location: `POINT(${bcast.location.lng} ${bcast.location.lat})`,
    image_name: bcast.imageName
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