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
  error: ApiError | null
}

/*****************************************************************************/
/* Store */
/*****************************************************************************/
export const useProfileStore = defineStore({
  id: "profile",
  state: (): IProfile =>({
    userInfo: null,
    error: null,
  }),
  getters: {
    /* get user id from auth store */
    userId(){
      const authStore = useAuthStore();
      return authStore.user?.id;
    },
    email(){
      const authStore = useAuthStore();
      return authStore.user?.email;
    }
  },
  actions: { 

    /* fetch user profile */
    async fetch(){
      try {
        this.userInfo = await client.userInfo.get(this.userId);
        console.log(this.userInfo)
      } catch (error) {
        this.handleApiError(error);
      }
    },

    /* update user profile */
    async update(){
      try {
        const response = await client.userInfo.insert(this.userdId)({bcast: {toGet: 10, toSend:10}, tag: ['mio', 'tuo']})
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
