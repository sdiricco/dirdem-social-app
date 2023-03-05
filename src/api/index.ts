import {
  RealtimePostgresChangesPayload,
  SupabaseClient,
} from "@supabase/supabase-js";
import { v4 as uuid } from "uuid";
import { ISignUp } from "../interfaces/sign-up";
import { IBcast } from "../interfaces/bcast";
import { IGeoLocation } from "../interfaces/geo-location";
import { IUserInfo } from "../interfaces/user-info";
import { ISignIn } from "@/interfaces/sign-in";
import handlers from "./utils/handlers";

const api =
  (init = false) => (supabase: SupabaseClient<any, "public", any>) => {
    if (init) {
      throw new Error("Supabase client alredy initialized");
    }
    init = true;

    return {
      supabase,

      bcast: {
        insert: (userId: string) => (bcast: IBcast) =>
          supabase
            .from("bcast")
            .insert({
              user_id: userId,
              expires_at: bcast.expiresAt,
              max_user: bcast.maxUsers,
              max_distance_km: bcast.maxDistanceKm,
              tag: bcast.tag,
              title: bcast.content.title,
              content: bcast.content.message,
              location: `POINT(${bcast.location.lng} ${bcast.location.lat})`,
              explicit: bcast.explicitContent,
            }),

        getInserted: (userId: string) =>
          supabase
            .from("bcast")
            .select("*")
            .eq("user_id", userId)
            .then(handlers.bcastHandler),

        getCandidate:
          (userId: string) => (location: IGeoLocation) => (tag: string[]) =>
            supabase
              .rpc("candidate_bcast", {
                _user_id: userId,
                _lat: location.lat,
                _lng: location.lng,
                _tag: tag,
              })
              .then(handlers.bcastHandler),

        getJoined: (userId: string) =>
          supabase
            .from("bcast_user")
            .select("bcast(*)")
            .eq("user_id", userId)
            .is("joined", true)
            .then(handlers.bcastHandler),

        getHided: (userId: string) =>
          supabase
            .from("bcast_user")
            .select("bcast(*)")
            .eq("user_id", userId)
            .is("hided", true)
            .then(handlers.bcastHandler),

        getReported: (userId: string) =>
          supabase
            .from("bcast_user")
            .select("bcast(*)")
            .eq("user_id", userId)
            .is("reported", true)
            .then(handlers.bcastHandler),

        onInsert: (userId: string) =>
        (
          cb: (
            payload: RealtimePostgresChangesPayload<{ [key: string]: any }>,
          ) => void,
          channelId = uuid(),
        ) =>
          supabase
            .channel(channelId)
            .on(
              "postgres_changes",
              {
                event: "INSERT",
                schema: "public",
                table: "bcast_user",
                filter: `user_id=eq.${userId}`,
              },
              cb,
            )
            .subscribe(),

        join: (userId: string) =>
          supabase
            .from("bcast_user")
            .update({ accepted: true })
            .eq("user_id", userId)
            .is("accepted", null),

        hide: (userId: string) =>
          supabase
            .from("bcast_user")
            .update({ accepted: false })
            .eq("user_id", userId)
            .is("accepted", null),
      },

      message: {
        get: (bcastId: string) =>
          supabase
            .from("message")
            .select("*")
            .eq("bcast_id", bcastId)
            .then(handlers.messageHandler),

        insert: (userId: string) => (bcastId: string) => (content: string) =>
          supabase
            .from("message")
            .insert([
              { content, user_id: userId, bcast_id: bcastId },
            ]),

        onInsert: (
          bcastId: string,
          cb: (
            payload: RealtimePostgresChangesPayload<{ [key: string]: any }>,
          ) => void,
          channelId = uuid(),
        ) =>
          supabase
            .channel(channelId)
            .on(
              "postgres_changes",
              {
                event: "INSERT",
                schema: "public",
                table: "message",
                filter: `bcast_id=eq.${bcastId}`,
              },
              cb,
            )
            .subscribe(),
      },

      userInfo: {
        get: (userId: string) =>
          supabase
            .from("user_info")
            .select("*")
            .eq("id", userId)
            .then(handlers.userInfoHandler),

        insert: (userId: string) => (userInfo: IUserInfo) =>
          supabase
            .from("user_info")
            .insert({
              id: userId,
              bcast_to_send: userInfo.bcast.toSend,
              bcast_to_get: userInfo.bcast.toGet,
              tag: userInfo.tag,
            }),
      },

      auth: {
        signIn: (signIn: ISignIn) =>
          supabase
            .auth.signInWithPassword(signIn),

        signUp: (signUp: ISignUp) =>
          supabase
            .auth.signUp(signUp)
      }
    }
    
  };

export default api();