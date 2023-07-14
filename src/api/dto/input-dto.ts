import { IBcast } from "@/interfaces/bcast";
import { IMessage } from "@/interfaces/message";
import { IRawBcast } from "@/interfaces/raw/raw-bcast";
import { IRawMessage } from "@/interfaces/raw/raw-message";
import { IRawUserInfo } from "@/interfaces/raw/raw-user-info";
import { IUserInfo } from "@/interfaces/user-info";
import { parseGeoPoint } from "../../functions/geolocalization-fns";
import { IRawUserAuth } from "@/interfaces/raw/raw-user-auth";
import { UserAuth } from "@/interfaces/user-auth";
import { IRawListedBcast } from "@/interfaces/raw/raw-listed-bcast";
import { IListedBcast } from "@/interfaces/listed-bcast";


const buildBcast = (rawBcast: IRawBcast): IBcast => {
  const { lat, lng } = parseGeoPoint(rawBcast?.location);
  return {
    id: rawBcast?.id,
    userId: rawBcast?.user_id,
    expiresAt: new Date(rawBcast?.expires_at),
    location: { lat: lat, lng: lng },
    maxUsers: rawBcast?.max_users,
    tag: rawBcast?.tag,
    content: rawBcast?.content,
    title: rawBcast?.title,
    createdAt: rawBcast?.created_at,
    imageName: rawBcast?.image_name
  }
};

const buildListedBcast = (rawListedBcast: IRawListedBcast): IListedBcast => {
  const { lat, lng } = parseGeoPoint(rawListedBcast.location);
  return {
    id: rawListedBcast?.id,
    userId: rawListedBcast?.user_id,
    title: rawListedBcast?.title,
    expiresAt: rawListedBcast?.expires_at,
    distMeters: rawListedBcast?.dist_meters,
    imageName: rawListedBcast?.image_name,
    location: { lat, lng },
    maxUsers: rawListedBcast?.max_users,
    joined: rawListedBcast?.joined,
    tag: rawListedBcast?.tag
  }
}

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
  buildUserAuth,
  buildListedBcast
}