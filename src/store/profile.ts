/*****************************************************************************/
/* Imports */
/*****************************************************************************/
import { defineStore } from "pinia";
import { useAuthStore} from "./auth"
import { IUserInfo } from "@/interfaces/user-info"
import client from "@/api/client"
import { ApiError } from "@/models/apiError";


/*****************************************************************************/
/* Interfaces */
/*****************************************************************************/
export interface IProfile {
  userInfo: IUserInfo | null,
  error: ApiError | null,
  tempUserInfo: any,
}

/*****************************************************************************/
/* Store */
/*****************************************************************************/
export const useProfileStore = defineStore({
  id: "profile",
  state: (): IProfile =>({
    userInfo: null,
    tempUserInfo: {
      tag: [],
      bcast:{
        toGet: 10,
        toSend: 10,
      }
    },
    error: null,
  }),
  getters: {
    /* get user id from auth store */
    userId(){
      const auth = useAuthStore();
      return auth.getUserId
    },
    email(){
      const auth = useAuthStore();
      return auth.getEmail
    },
  },
  actions: { 

    /* fetch user profile */
    async fetch(){
      try {
        if (!this.userId) {
          return;
        }
        this.userInfo = await client.userInfo.get(this.userId);
        this.tempUserInfo = this.userInfo;
        console.log(this.userInfo)
      } catch (error) {
        this.handleApiError(error);
      }
    },

    /* update user profile */
    async update(){
      try {
        if (!this.userId) {
          return;
        }
        const response = await client.userInfo.update(this.userId)(this.tempUserInfo)
        console.log(response)
      } catch (error) {
        this.handleApiError(error);
      }
    },

    /* handle errors */
    async handleApiError(error:any){
      if (error instanceof ApiError) {
        this.error = error;
      } else {
        alert(`[UNKNOWN ERROR]: ${error.message}`);
      }
    },
  },
});
