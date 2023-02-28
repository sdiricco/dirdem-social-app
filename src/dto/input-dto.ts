import { IMessage } from "@/interfaces/message";
import { RawBcast } from "@/interfaces/raw/raw-bcast";
import { RawMessage } from "@/interfaces/raw/raw-message";
import { RawUserInfo } from "@/interfaces/raw/raw-user-info";
import { IUserInfo } from "@/interfaces/user-info";
import { Bcast } from "dirdem-bcast-client/dist/interfaces/bcast";


const rawBcastToBcast = (rawBcast: RawBcast): Bcast => ({
  content: {
    title: rawBcast.title,
    message: rawBcast.content,
  },
  expiresAt: new Date(rawBcast.expires_at),
  location: {
    lat: +rawBcast.location,
    lng: +rawBcast.location,
  },
  maxDistanceKm: rawBcast.max_distance_km,
  maxUsers: rawBcast.max_user,
  tag: rawBcast.tag,
  explicitContent: rawBcast.explicit,
});

const rawUserInfoToUserInfo = (rawUserInfo: RawUserInfo): IUserInfo => ({
  bcast: {
    toGet: rawUserInfo.bcast_to_get,
    toSend: rawUserInfo.bcast_to_send,
  },
  tag: rawUserInfo.tag,
});

const rawMessageToMessage = (rawMessage: RawMessage): IMessage => ({
  bcastId: rawMessage.bcast_id,
  content: rawMessage.content,
  userId: rawMessage.user_id,
  createdAt: new Date(rawMessage.created_at),
});



export default {
    rawBcastToBcast,
    rawUserInfoToUserInfo,
    rawMessageToMessage
}