import { defineStore } from "pinia";
import * as authApi from "@/api/auth"
import { ApiError } from "@/api/errorHandler";
import router from "@/router/index"

interface IAuthState {
  email: string;
  password: string;
  error: ApiError | null;
}

export const useAuthStore = defineStore({
  id: "auth-store",
  state: (): IAuthState => ({
    email: "",
    password: "",
    error: null,
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
        await authApi.signUp({
          email: this.email,
          password: this.password,
        });
        router.push("/home");
      } catch (error) {
        this.handleApiError(error)
      }
    },

    /* SIGN IN */
    async signIn() {
      try {
        await authApi.signIn({
          email: this.email,
          password: this.password,
        });
        router.push("/home");
      } catch (error) {
        this.handleApiError(error)
      }
    },
  },
});
