import { supabase } from './../main';
import { defineStore } from "pinia";
import * as authApi from "@/api/auth"
import { ApiError } from "@/api/errorHandler";
import router from "@/router/index"
import {User, Session} from "@supabase/supabase-js"

interface IAuthState {
  email: string;
  password: string;
  error: ApiError | null;
  user: User | null;
  session: Session | null;
}

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

    /* HANDLE ERRORS */
    async handleApiError(error:any){
      if (error instanceof ApiError) {
        this.error = error;
      } else {
        alert(`[UNKNOWN ERROR]: ${error.message}`);
      }
    },

    /* SIGN UP */
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

    /* SIGN IN */
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
  },
});
