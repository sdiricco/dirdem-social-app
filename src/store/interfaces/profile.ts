import { UserInfo } from "@/interfaces/user-info"

export interface IProfile {
    userInfo: UserInfo | null,
    tempUserInfo: UserInfo | null
  }