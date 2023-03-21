import inputDto from "@/functions/dto/input-dto";
import { IBcast } from "@/interfaces/bcast";
import { ICandidateBcast } from "@/interfaces/candidate-bcast";
import { IMessage } from "@/interfaces/message";
import { IUserInfo } from "@/interfaces/user-info";
import { RealtimePostgresChangesPayload } from "@supabase/supabase-js";
import { ApiError } from "../models/apiError";

type ApiHandler<T> = (data: any) => T;

const handleObject = (dto: Function) => ({ data, error }: { data: any, error: any }) => {
    if (error) {
        throw new ApiError(error.message, {
            details: error.name,
            code: error.status
        })
    }
    return dto(data);
}

const handleFirstObject = (dto: Function) => ({data, error}: {data: any, error: any}) => {
    if (error) {
        throw new ApiError(error.message, {
            details: error.name,
            code: error.status
        })
    }
    return dto(data?.at(0));
}

const handleArray = (dto: Function) => ({data, error}: {data: any, error: any}) => {
    if (error) {
        throw new ApiError(error.message, {
            details: error.name,
            code: error.status
        })
    }
    return data.map((_:any) => dto(_));
}

const handleInteractedBcast = (dto: Function) => ({data, error}: {data: any, error: any}) => {
    if (error) {
        throw new ApiError(error.message, {
            details: error.name,
            code: error.status
        })
    }
    return data.map((_:any) => dto(_.bcast));
}

const handlePostgresChangePayload = (dto: Function) => (payload: RealtimePostgresChangesPayload<{ [key: string]: any }>) => {
    if (payload?.errors) {
        throw new ApiError(payload?.errors?.join('-'));
    }
    return dto(payload?.new);
}

const bcastCandidateHandler: ApiHandler<ICandidateBcast[]> = handleArray(inputDto.buildCandidateBcast);
const bcastHandler: ApiHandler<IBcast[]> = handleArray(inputDto.buildBcast);
const userInfoHandler: ApiHandler<IUserInfo> = handleFirstObject(inputDto.buildUserInfo);
const messageHandler: ApiHandler<IMessage[]> = handleArray(inputDto.buildMessage);
const bcastUserExistsHandler: ApiHandler<boolean> = handleObject(((data: any) => data.length > 0));
const candidateBcastHandler: ApiHandler<ICandidateBcast[]> = handleArray(inputDto?.buildBcast);
const interactedBcastHandler: ApiHandler<IBcast[]> = handleInteractedBcast(inputDto.buildBcast);
const messageInsertedHandler: ApiHandler<IMessage> = handlePostgresChangePayload(inputDto.buildMessage);


export default {
  bcastCandidateHandler,
  bcastHandler,
  userInfoHandler,
  messageHandler,
  bcastUserExistsHandler,
  candidateBcastHandler,
  interactedBcastHandler,
  messageInsertedHandler
}


