/*****************************************************************************/
/* Imports */
/*****************************************************************************/
import { defineStore } from "pinia";
import router from "@/router";
import { ApiError } from "@/models/apiError";
import client from "@/api/client";
import {getUser} from "@/functions/localstorage"
import utils from "@/functions/utils-fns"

/*****************************************************************************/
/* Interfaces */
/*****************************************************************************/
interface IAuthState {
  email: string;
  password: string;
  error: ApiError | null;
  isLoading: boolean;
}

/*****************************************************************************/
/* Store */
/*****************************************************************************/
export const useAuthStore = defineStore({
  id: "auth",

  state: (): IAuthState => ({
    email: "",
    password: "",
    error: null,
    isLoading: false,
  }),

  getters: {
    getUser: () => getUser(),
    getEmail: () => getUser()?.email,
    getUserId: () => getUser()?.id,
  },

  actions: {
    
    /* Sign up */
    async signUp() {
      try {
        this.isLoading = true;
        const response = await client.auth.signUp({
          email: this.email,
          password: this.password,
        });
        await utils.wait(2000);
        this.isLoading = false;
        console.log('[Login succesfully]', response)
        router.push("/home");
      } catch (error) {
        this.isLoading = false;
        this.handleApiError(error)
      }
    },

    /* sign in */
    async signIn() {
      try {
        this.isLoading = true;
        const response = await client.auth.signIn({
          email: this.email,
          password: this.password,
        }); 
        await utils.wait(2000);
        this.isLoading = false;
        console.log('[Login succesfully]', response)
        router.push("/home");
      } catch (error) {
        this.isLoading = false;
        this.handleApiError(error)
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
