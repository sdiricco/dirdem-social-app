import inputDto from "@/functions/dto/input-dto";
import { IBcast } from "@/interfaces/bcast";
import { IMessage } from "@/interfaces/message";
import { IUserInfo } from "@/interfaces/user-info";
import { ApiError } from "../../models/apiError";

type ApiHandler<T> = (dto) => ({data, error}) => T;

const handlerObject = (dto: Function) => ({data, error}: {data: any, error: any}) => {
    if (error) {
        throw new ApiError(error.message, {
            details: error.name,
            code: error.status
        })
    }
    return dto(data?.at(0));
}

const handlerArray = (dto: Function) => ({data, error}: {data: any, error: any}) => {
    if (error) {
        throw new ApiError(error.message, {
            details: error.name,
            code: error.status
        })
    }
    return data.map((_:any) => dto(_));
}

const bcastHandler: ApiHandler<IBcast[]> = handlerArray(inputDto.buildBcast);
const userInfoHandler: ApiHandler<IUserInfo> = handlerObject(inputDto.buildUserInfo);
const messageHandler: ApiHandler<IMessage> = handlerArray(inputDto.buildMessage);


export default {
  bcastHandler,
  userInfoHandler,
  messageHandler
}


