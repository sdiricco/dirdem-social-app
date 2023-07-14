import { defineStore } from "pinia";
import client from "@/api/client";
import { Preferences } from "@capacitor/preferences";
import { IAuthState } from "@/interfaces/state/auth-state";
import router from "@/router/router";
import { useMainStore } from "./main-store";


export const useAuthStore = defineStore({
  id: "auth",

  state: (): IAuthState => ({
    userId: null,
    userInfo: null
  }),

  actions: {
    async signUp(email: string, password: string) {
      const response = await client.auth.signUp({
        email: email,
        password: password,
      });
      this.storeUserId(response.user?.id);
      this.fetchUserInfo();
    },
    async signIn(email: string, password: string) {
      try {
        const response = await client.auth.signIn({
          email: email,
          password: password,
        });
        this.storeUserId(response.user?.id);
        this.fetchUserInfo();
        router.push("/home");  
      } catch (error: any) {
        useMainStore().setApiErrorMessage(error);
      }

    },

    storeUserId(userId: string | undefined) {
      if (userId?.length) {
        this.userId = userId;
        Preferences.set({ key: 'user-id', value: userId })
      }
    },

    async fetchUserInfo() {
      if (this.userId?.length) {
        this.userInfo = await client.userInfo.get(this.userId); 
      }
    }
  }
  
})
