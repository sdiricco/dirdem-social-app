// @ts-nocheck

import * as R from 'ramda';
import { IMessage } from "src/interfaces/message";
import { IUserInfo } from "src/interfaces/user-info";
import { UserAuth } from "@/interfaces/user-auth";
import { IListedBcast } from '@/interfaces/listedBcast';
import { IBcast } from '@/interfaces/bcast';
import inputDto from './dto/input-dto';

const errorHandler = (customErrorMessage = 'Handler error') => ({ error, errors, ...props }) => {
    if (error || errors?.length) {
        throw error.message || customErrorMessage;
    }
    return { ...props };
}

const messagesHandler: ({ data, error }) => { count: number, messages: IMessage[] } = R.pipe(
    errorHandler(),
    R.over(R.lensPath(['data']), R.map(inputDto.buildMessage)),
    ({ data, count }) => ({ messages: data, count })
)

const messageInsertedHandler: (data) => IMessage = R.pipe(
    errorHandler('Error postgres change payload'),
    R.prop('payload'),
    inputDto.buildMessage
)

const bcastListHandler: ({ data, error }) => { count: number, bcastList: IListedBcast[] } = R.pipe(
    errorHandler(),
    R.over(R.lensPath(['data']), R.map(inputDto.buildListedBcast)),
    ({ data, count }) => ({ bcast: data, count })
)

const bcastHandler: ({ data, error }) => IBcast = R.pipe(
    errorHandler(),
    R.prop('data'),
    inputDto.buildBcast
)

const userInfoHandler: ({ data, error }) => IUserInfo = R.pipe(
    errorHandler(),
    R.prop('data'),
    R.head,
    inputDto.buildUserInfo
)

const authHandler: ({ data, error }) => UserAuth = R.pipe(
    errorHandler(),
    R.prop('data'),
    inputDto.buildUserAuth
)

const dataHasLengthHandler: ({ data, error }) => boolean = R.pipe(
    errorHandler(),
    R.prop('data'),
    R.length,
    R.gt(R.__, 0)
)

//

export default {
    messagesHandler,
    messageInsertedHandler,
    bcastListHandler,
    bcastHandler,
    userInfoHandler,
    authHandler,    
    dataHasLengthHandler
}


