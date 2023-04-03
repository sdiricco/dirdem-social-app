// @ts-nocheck

import * as R from 'ramda';
import inputDto from "@/functions/dto/input-dto";
import { ApiError } from "@/models/apiError";
import { IBcast } from "src/interfaces/bcast";
import { IMessage } from "src/interfaces/message";
import { IUserInfo } from "src/interfaces/user-info";
import { UserAuth } from "@/interfaces/user-auth";
import utilsFns from '@/functions/utils-fns';


const errorHandler = (customErrorMessage = 'Handler error') => ({ error, errors, ...props }) => {
    if (error || errors?.length) {
        throw new ApiError(error.message || customErrorMessage, {
            details: error?.name,
            code: error?.status
        })
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

const bcastsHandler: ({ data, error }) => { count: number, bcast: IBcast[] } = R.pipe(
    errorHandler(),
    R.over(R.lensPath(['data']), R.map(inputDto.buildBcast)),
    ({ data, count }) => ({ bcast: data, count })
)

const userInfoHandler: ({ data, error }) => IUserInfo = R.pipe(
    errorHandler(),
    R.prop('data'),
    R.head,
    inputDto.buildUserInfo
)

const authHandler: ({ data, error }) => any = R.pipe(
    errorHandler(),
    R.prop('data'),
    inputDto.buildUserAuth
)

const bcastInteractedHandler: ({ data, error }) => { count: number, bcast: IBcast[] } = R.pipe(
    errorHandler(),
    R.over(R.lensPath(['data']), R.pipe(
        R.map(
            R.pipe(
                R.prop('bcast'),
                inputDto.buildBcast
            )
        )
    )),
    ({ data, count }) => ({ bcast: data, count })
)

const dataHasLengthHandler: ({ data, error }) => boolean = R.pipe(
    errorHandler(),
    R.prop('data'),
    R.length,
    R.gt(R.__, 0),
    utilsFns.logger('res')
)

export default {
    messagesHandler,
    messageInsertedHandler,
    bcastsHandler,
    bcastInteractedHandler,
    userInfoHandler,
    authHandler,    
    dataHasLengthHandler
}


