import { defineStore } from "pinia";
import { IProfile } from './interfaces/profile';
import {fetch, update} from "@/api/profile"
import { useAuthStore} from "./auth"

export const useProfileStore = defineStore({
  id: "profile",
  state: (): IProfile =>({
    userInfo: null,
    tempUserInfo: null
  }),
  getters: {
    userId(){
      const authStore = useAuthStore();
      return authStore.user?.id;
    }
  },
  actions: { 
    async fetch(){
      try {
        if (!this.userId) {
          return;
        }
        this.userInfo = await fetch(this.userId);
      } catch (e) {
        console.log(e)
      }
    },
    async update(){
      try {
        if (!this.tempUserInfo) {
          return
        }
        await update(this.tempUserInfo);
      } catch (e) {
        console.log(e)
      }
    }
  },
});
