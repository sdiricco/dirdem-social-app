import inputDto from "@/functions/dto/input-dto";
import { IBcast } from "@/interfaces/bcast";
import { IMessage } from "@/interfaces/message";
import { IUserInfo } from "@/interfaces/user-info";
import { ApiError } from "../../models/apiError";


type ApiHandler<T> = (dto) => ({data, error}) => T;

const handler = (dto: Function) => ({data, error}: {data: any, error: any}) => {
    if (error) {
        throw new ApiError(error.message, {
            details: error.name,
            code: error.status
        })
    }
    return dto(data);
}

const bcastHandler: ApiHandler<IBcast> = handler(inputDto.buildBcast);
const userInfoHandler: ApiHandler<IUserInfo> = handler(inputDto.buildUserInfo);
const messageHandler: ApiHandler<IMessage> = handler(inputDto.buildMessage);


export default {
  bcastHandler,
  userInfoHandler,
  messageHandler
}


