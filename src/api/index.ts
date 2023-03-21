import {
  RealtimePostgresChangesPayload,
  SupabaseClient,
} from "@supabase/supabase-js";
import { v4 as uuid } from "uuid";
import { ISignUp } from "../interfaces/sign-up";
import { IGeoLocation } from "../interfaces/geo-location";
import { IUserInfo } from "../interfaces/user-info";
import handlers from "./handlers";
import outputDto from "@/functions/dto/output-dto";
import utilsFns from "@/functions/utils-fns";
import { IInsertBcast } from "@/interfaces/insert-bcast";
import { ISignIn } from "@/interfaces/sign-in";
import { IMessage } from "@/interfaces/message";

const bcastUserRecordExists = (supabase: SupabaseClient<any, "public", any>) => (userId: string) => (bcastId: string) => {
    return supabase.from("bcast_user")
      .select('*')
      .eq("user_id", userId)
      .eq("bcast_id", bcastId)
      .then(handlers.bcastUserExistsHandler)
  }


const api =
  (init = false) => (supabase: SupabaseClient<any, "public", any>) => {
    if (init) {
      throw new Error("Supabase client alredy initialized");
    }
    init = true;

    return {
      supabase,

      bcast: {
        insert: (userId: string) => (bcast: IInsertBcast) => {
          const rawBcast = outputDto.buildRawBcast(userId, bcast);
          return supabase
            .from("bcast")
            .insert(rawBcast);
        },

        getAll: () =>
          supabase
            .from("bcast")
            .select("*")
            .then(handlers.bcastHandler),

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
              .then(handlers.bcastCandidateHandler),

        getJoined: (userId: string) =>
          supabase
            .from("bcast_user")
            .select("bcast(*)")
            .eq("user_id", userId)
            .is("joined", true)
            .then(handlers.interactedBcastHandler),

        getHided: (userId: string) =>
          supabase
            .from("bcast_user")
            .select("bcast(*)")
            .eq("user_id", userId)
            .is("hided", true)
            .then(handlers.interactedBcastHandler),

        getReported: (userId: string) =>
          supabase
            .from("bcast_user")
            .select("bcast(*)")
            .eq("user_id", userId)
            .is("reported", true)
            .then(handlers.interactedBcastHandler),

        onInsert: (userId: string) =>
          (
            cb: (message: IMessage) => void,
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
                (payload: RealtimePostgresChangesPayload<{ [key: string]: any }>) => {
                  const message: IMessage = handlers.messageInsertedHandler(payload);
                  cb(message);
                },
              )
              .subscribe(),

        join: (userId: string) => async (bcastId: string) => {
          const bcastUserExists = await bcastUserRecordExists(supabase)(userId)(bcastId);
          if (bcastUserExists) {
            return supabase
              .from("bcast_user")
              .update({ joined: true })
              .eq("user_id", userId)
              .eq("bcast_id", bcastId)
          } else {
            return supabase
            .from("bcast_user")
            .insert({ user_id: userId, bcast_id: bcastId, joined: true })
          }
        },

        hide: (userId: string) => async (bcastId: string) => {
          const bcastUserExists = await bcastUserRecordExists(supabase)(userId)(bcastId);
          if (bcastUserExists) {
            return supabase
              .from("bcast_user")
              .update({ joined: false, hided: true, reported: false })
              .eq("user_id", userId)
              .eq("bcast_id", bcastId)
          } else {
            return supabase
            .from("bcast_user")
            .insert({ user_id: userId, bcast_id: bcastId, hided: true })
          }
        },

        report: (userId: string) => async (bcastId: string) => {
          const bcastUserExists = await bcastUserRecordExists(supabase)(userId)(bcastId);
          if (bcastUserExists) {
            return supabase
              .from("bcast_user")
              .update({ joined: false, hided: true, reported: true })
              .eq("user_id", userId)
              .eq("bcast_id", bcastId)
          } else {
            return supabase
            .from("bcast_user")
            .insert({ user_id: userId, bcast_id: bcastId, reported: true })
          }
        }
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

        insert: (userId: string) => (userInfo: IUserInfo) => {
          const rawUserInfo = outputDto.buildRawUserInfo(userId, userInfo);
          return supabase
            .from("user_info")
            .insert(rawUserInfo);
        },

        update: (userId: string) => (userInfo: Partial<IUserInfo>) => {
          const rawUserInfo = outputDto.buildRawUserInfo(userId, userInfo);
          const obj = utilsFns.removeUndefinedOrNullProps(rawUserInfo);
          return supabase
            .from("user_info")
            .update(obj)
            .eq('id', userId);
        },
      },

      auth: {
        signIn: (signIn: ISignIn) =>
          supabase
            .auth.signInWithPassword(signIn),

        signUp: (signUp: ISignUp) =>
          supabase
            .auth.signUp(signUp),
      },
    };
  };

export default api();
