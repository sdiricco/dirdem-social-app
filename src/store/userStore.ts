import { dbUtility } from './../main';
import { defineStore } from "pinia";
import { IUserStore } from '@/interfaces/store/iUserStore';

export const useUserStore = defineStore({
  id: "user-store",
  state: (): IUserStore =>({
    user: {
      email: '',
      id: ''
    },
    userInfo: {
      bcast: { toGet: 0, toSend: 0 },
      location: { lat: 0, lng: 0 },
      tag: []
    },
    tempUserInfo:{
      bcast: { toGet: 0, toSend: 0 },
      location: { lat: 0, lng: 0 },
      tag: []
    }
  }),
  getters: { },
  actions: { 
    async fetchUserInfo(){
      try {
        const {data, error} = await dbUtility.userInfo.get(this.user.id)
      } catch (e) {
        console.log(e)
      }

    }
  },
});
