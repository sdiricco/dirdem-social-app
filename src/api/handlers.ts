// @ts-nocheck

import inputDto from "@/functions/dto/input-dto";
import { ApiError } from "@/models/apiError";
import { IBcast } from "src/interfaces/bcast";
import { IMessage } from "src/interfaces/message";
import { IUserInfo } from "src/interfaces/user-info";

type ApiHandler<T> = (data: any) => T;

const errorHandler = (error) => {
    if (error) {
        throw new ApiError(error.message, {
            details: error?.name,
            code: error?.status
        })
    }
}

const handleObject = (dto: Function) => ({ data, error }) => error ? errorHandler(error) : dto(data);
const handleFirstObject = (dto: Function) => ({ data, error }) => error ? errorHandler(error) : dto(data?.at(0));
const handleArray = (dto: Function) => ({ data, error }) => error ? errorHandler(error) : data.map((_:any) => dto(_));
const handleInteractedBcast = (dto: Function) => ({data, error}) => error ? errorHandler(error) : data.map((_:any) => dto(_.bcast))
const handlePostgresChangePayload = (dto: Function) => (payload) => payload?.errors? errorHandler({ message: 'Error postgres change payload' }) : dto(payload?.new);

const arrayBcastHandler: ApiHandler<IBcast[]> = handleArray(inputDto.buildBcast);
const arrayMessageHandler: ApiHandler<IMessage[]> = handleArray(inputDto.buildMessage);
const userInfoHandler: ApiHandler<IUserInfo> = handleFirstObject(inputDto.buildUserInfo);
const dataHasLengthHandler: ApiHandler<boolean> = handleObject(((data: any) => data.length > 0));
const interactedBcastHandler: ApiHandler<IBcast[]> = handleInteractedBcast(inputDto.buildBcast);
const messageInsertedHandler: ApiHandler<IMessage> = handlePostgresChangePayload(inputDto.buildMessage);

export default {
    arrayBcastHandler,
    arrayMessageHandler,
    userInfoHandler,
    dataHasLengthHandler,
    interactedBcastHandler,
    messageInsertedHandler
}


