import inputDto from "@/functions/dto/input-dto";
import { IBcast } from "@/interfaces/bcast";
import { ICandidateBcast } from "@/interfaces/candidate-bcast";
import { IMessage } from "@/interfaces/message";
import { IUserInfo } from "@/interfaces/user-info";
import { ApiError } from "../models/apiError";

type ApiHandler<T> = (dto: any) => T;

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

const bcastHandler: ApiHandler<IBcast[]> = handleArray(inputDto.buildBcast);
const userInfoHandler: ApiHandler<IUserInfo> = handleFirstObject(inputDto.buildUserInfo);
const messageHandler: ApiHandler<IMessage> = handleArray(inputDto.buildMessage);
const bcastUserExistsHandler: ApiHandler<boolean> = handleObject(((data: any) => data.length > 0));
const candidateBcastHandler: ApiHandler<ICandidateBcast[]> = handleArray(inputDto?.buildBcast);


export default {
  bcastHandler,
  userInfoHandler,
  messageHandler,
  bcastUserExistsHandler,
  candidateBcastHandler
}


