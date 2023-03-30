import { IBcast } from "@/interfaces/bcast";
import { IMessage } from "@/interfaces/message";
import { IRawBcast } from "@/interfaces/raw/raw-bcast";
import { IRawMessage } from "@/interfaces/raw/raw-message";
import { IRawUserInfo } from "@/interfaces/raw/raw-user-info";
import { IUserInfo } from "@/interfaces/user-info";
import { parseGeoPoint } from "../geolocalization";
import { IRawUserAuth } from "@/interfaces/raw/raw-user-auth";
import { UserAuth } from "@/interfaces/user-auth";


const buildBcast = (rawBcast: IRawBcast): IBcast => {
  const { lat, lng } = parseGeoPoint(rawBcast.location);
  return {
    id: rawBcast.id,
    userId: rawBcast.user_id,
    content: {
      title: rawBcast.title,
      message: rawBcast.content,
    },
    expiresAt: new Date(rawBcast.expires_at),
    location: {
      lat: lat,
      lng: lng,
    },
    maxDistanceKm: rawBcast.max_distance_km,
    maxUsers: rawBcast.max_user,
    tag: rawBcast.tag,
    explicitContent: rawBcast.explicit,
    distanceKm: Math.floor(rawBcast?.distance_km!!) || 0,
  }
};

const buildUserInfo = (rawUserInfo: IRawUserInfo): IUserInfo => {
  return {
    bcast: {
      toGet: rawUserInfo.bcast_to_get,
      toSend: rawUserInfo.bcast_to_send,
    },
    tag: rawUserInfo.tag,
  }
};

const buildMessage = (rawMessage: IRawMessage): IMessage => {
  return {
    bcastId: rawMessage.bcast_id,
    content: rawMessage.content,
    userId: rawMessage.user_id,
    createdAt: new Date(rawMessage.created_at),
  }
};

const buildUserAuth = (rawUserInfo: IRawUserAuth): UserAuth => {
  return rawUserInfo;
}


export default {
  buildBcast,
  buildUserInfo,
  buildMessage,
  buildUserAuth
}