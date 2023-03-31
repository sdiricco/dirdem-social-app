// @ts-nocheck

import inputDto from "@/functions/dto/input-dto";
import { ApiError } from "@/models/apiError";
import { IBcast } from "src/interfaces/bcast";
import { IMessage } from "src/interfaces/message";
import { IUserInfo } from "src/interfaces/user-info";
import { UserAuth } from "@/interfaces/user-auth";
import * as R from 'ramda';


type ApiHandler<T> = (data: any) => T;
const logger = (label) => (data) => { console.log(`${label} -> ${JSON.stringify(data)}`); return data };


const errorHandler = (customErrorMessage?: string) => ({ error, errors, ...props }) => {
    if (error || errors?.length) {
        throw new ApiError(customErrorMessage || error.message, {
            details: error?.name,
            code: error?.status
        })
    }
    return { ...props };
}

const handleObject = (dto: Function) => ({ data, error }) => error ? errorHandler(error) : dto(data);
const handleFirstObject = (dto: Function) => ({ data, error }) => error ? errorHandler(error) : dto(data?.at(0));
const handleArray = (dto: Function) => ({ data, error }) => error ? errorHandler(error) : data.map((_: any) => dto(_));
const handleInteractedBcast = (dto: Function) => ({ data, error }) => error ? errorHandler(error) : data.map((_: any) => dto(_.bcast))

const handleAuth = (dto: Function) => ({ data, error }) => error ? errorHandler(error) : dto(data);

const arrayBcastHandler: ApiHandler<IBcast[]> = handleArray(inputDto.buildBcast);

const messagesHandler: ({ data, error }) => { count: number, messages: IMessage[] } = R.pipe(
    errorHandler(),
    R.over(R.lensPath(['data']), R.map(inputDto.buildMessage)),
    ({ data, count }) => ({ messages: data, count })
)

const messageInsertedHandler: ({ payload }) => IMessage = R.pipe(
    R.prop('payload'),
    errorHandler('Error postgres change payload'),
    R.view(R.lensPath(['payload', 'new'])),
    inputDto.buildMessage
)


const userInfoHandler: ApiHandler<IUserInfo> = handleFirstObject(inputDto.buildUserInfo);
const dataHasLengthHandler: ApiHandler<boolean> = handleObject(((data: any) => data.length > 0));
const interactedBcastHandler: ApiHandler<IBcast[]> = handleInteractedBcast(inputDto.buildBcast);

const authHandler: ApiHandler<UserAuth> = handleAuth(inputDto.buildUserAuth);

export default {
    messagesHandler,
    messageInsertedHandler,

    arrayBcastHandler,
    userInfoHandler,
    dataHasLengthHandler,
    interactedBcastHandler,
    authHandler,
}


