import { UserInfo } from "../user-info"

export interface IUserStore {
    user: {
      email: string,
      id: string
    },
    userInfo: UserInfo,
    tempUserInfo: UserInfo
  }