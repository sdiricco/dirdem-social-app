import { IMessage } from "@/interfaces/message";
import { IRawBcast } from "@/interfaces/raw/raw-bcast";
import { IRawMessage } from "@/interfaces/raw/raw-message";
import { IRawUserInfo } from "@/interfaces/raw/raw-user-info";
import { IUserInfo } from "@/interfaces/user-info";
import { Bcast } from "dirdem-bcast-client/dist/interfaces/bcast";

// @todo check correct data wrapping in all dto functions

const rawBcastToBcast = (rawBcast: IRawBcast): Bcast => ({
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

const rawUserInfoToUserInfo = (rawUserInfo: IRawUserInfo): IUserInfo => ({
  bcast: {
    toGet: rawUserInfo.bcast_to_get,
    toSend: rawUserInfo.bcast_to_send,
  },
  tag: rawUserInfo.tag,
});

const rawMessageToMessage = (rawMessage: IRawMessage): IMessage => ({
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