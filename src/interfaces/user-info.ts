export interface IUserInfo {
    readonly bcast: {
        toGet: number
        toSend: number
    };
    tag: string[];
}