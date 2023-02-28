/*****************************************************************************/
/* Imports */
/*****************************************************************************/
import { defineStore } from "pinia";
import authApi from "@/api/auth"

import {User, Session} from "@supabase/supabase-js"
import router from "@/router";
import { ApiError } from "@/models/apiError";

/*****************************************************************************/
/* Interfaces */
/*****************************************************************************/
interface IAuthState {
  email: string;
  password: string;
  error: ApiError | null;
  user: User | null;
  session: Session | null;
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
    user: null,
    session: null
  }),

  actions: {
    
    /* Sign up */
    async signUp() {
      try {
        const data = await authApi.signUp({
          email: this.email,
          password: this.password,
        });
        this.user = data.user;
        this.session = data.session;
        router.push("/home");
      } catch (error) {
        this.handleApiError(error)
      }
    },

    /* sign in */
    async signIn() {
      try {
        const data = await authApi.signIn({
          email: this.email,
          password: this.password,
        });
        this.user = data.user;
        this.session = data.session;
        router.push("/home");
      } catch (error) {
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
