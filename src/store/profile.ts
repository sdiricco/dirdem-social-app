/*****************************************************************************/
/* Imports */
/*****************************************************************************/
import { defineStore } from "pinia";
import { useAuthStore} from "./auth"
import { IUserInfo } from "@/interfaces/user-info"
import { ApiError } from "@/models/apiError";


/*****************************************************************************/
/* Interfaces */
/*****************************************************************************/
export interface IProfile {
  userInfo: IUserInfo | null,
  tempUserInfo: IUserInfo | null,
  error: ApiError | null
}

/*****************************************************************************/
/* Store */
/*****************************************************************************/
export const useProfileStore = defineStore({
  id: "profile",
  state: (): IProfile =>({
    userInfo: null,
    tempUserInfo: null,
    error: null,
  }),
  getters: {
    /* get user id from auth store */
    userId(){
      const authStore = useAuthStore();
      return authStore.user?.id;
    }
  },
  actions: { 

    /* fetch user profile */
    async fetch(){
      try {
        if (!this.userId) {
          return;
        }
        this.userInfo = await fetch(this.userId);
      } catch (error) {
        this.handleApiError(error);
      }
    },

    /* update user profile */
    async update(){
      try {
        if (!this.tempUserInfo) {
          return
        }
        await (this.tempUserInfo);
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
