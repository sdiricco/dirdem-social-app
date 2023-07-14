import { IUserInfo } from "../user-info";

export interface IAuthState {
    userId: string | null;
    userInfo: IUserInfo | null;
}