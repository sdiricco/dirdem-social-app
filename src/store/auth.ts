/*****************************************************************************/
/* Imports */
/*****************************************************************************/
import { defineStore } from "pinia";
import {User, Session} from "@supabase/supabase-js"
import router from "@/router";
import { ApiError } from "@/models/apiError";
import client from "@/api/client";
import {getUser} from "@/functions/localstorage"

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

  getters: {
    getUser: () => getUser(),
    getEmail: () => getUser() && getUser().email,
    getUserId: () => getUser() && getUser().id,
  },

  actions: {
    
    /* Sign up */
    async signUp() {
      try {
        const response = await client.auth.signUp({
          email: this.email,
          password: this.password,
        });
        router.push("/home");
      } catch (error) {
        this.handleApiError(error)
      }
    },

    /* sign in */
    async signIn() {
      try {
        const response = await client.auth.signIn({
          email: this.email,
          password: this.password,
        });
        this.user = response.data.user
        this.session = response.data.session;
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
