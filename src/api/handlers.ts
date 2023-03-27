import inputDto from "@/functions/dto/input-dto";
import { RealtimePostgresChangesPayload } from "@supabase/supabase-js";
import { IBcast } from "src/interfaces/bcast";
import { IMessage } from "src/interfaces/message";
import { IUserInfo } from "src/interfaces/user-info";

type ApiHandler<T> = (data: any) => T;

const handleObject = (dto: Function) => ({ data, error }: { data: any, error: any }) => {
    if (error) {
        throw error;
    }
    return dto(data);
}

const handleFirstObject = (dto: Function) => ({data, error}: {data: any, error: any}) => {
    if (error) {
        throw error;
    }
    return dto(data?.at(0));
}

const handleArray = (dto: Function) => ({data, error}: {data: any, error: any}) => {
    if (error) {
        throw error;
    }
    return data.map((_:any) => dto(_));
}

const handleInteractedBcast = (dto: Function) => ({data, error}: {data: any, error: any}) => {
    if (error) {
        throw new error;
    }
    return data.map((_:any) => dto(_.bcast));
}

const handlePostgresChangePayload = (dto: Function) => (payload: RealtimePostgresChangesPayload<{ [key: string]: any }>) => {
    if (payload?.errors) {
        throw payload?.errors;
    }
    return dto(payload?.new);
}

//
const arrayBcastHandler: ApiHandler<IBcast[]> = handleArray(inputDto.buildBcast);
const arrayMessageHandler: ApiHandler<IMessage[]> = handleArray(inputDto.buildMessage);
//
const userInfoHandler: ApiHandler<IUserInfo> = handleFirstObject(inputDto.buildUserInfo);
const dataHasLengthHandler: ApiHandler<boolean> = handleObject(((data: any) => data.length > 0));
const interactedBcastHandler: ApiHandler<IBcast[]> = handleInteractedBcast(inputDto.buildBcast);
//
const messageInsertedHandler: ApiHandler<IMessage> = handlePostgresChangePayload(inputDto.buildMessage);


export default {
    arrayBcastHandler,
    arrayMessageHandler,
    userInfoHandler,
    dataHasLengthHandler,
    interactedBcastHandler,
    messageInsertedHandler
}


