import { defineStore } from "pinia";
import client from "@/api/client";
import { IBcastState } from "@/interfaces/state/bcast-state";
import { useAuthStore } from "./auth-store";
import { getCurrentPosition } from "@/functions/geolocalization-fns";
import { IBcast } from "@/interfaces/bcast";

export const useBcastStore = defineStore({
  id: "broadcast",

  state: (): IBcastState => ({
    bcastList: []
  }),

  getters: {
    userId() {
      const authStore = useAuthStore();
      return authStore.userId;
    }
  },

  actions: {
    async join(bcastId: string){
      if (!this.userId) {
        return
      }
      await client.bcast.join(this.userId, bcastId);
      console.log('[JOINED, bcastid]', bcastId)
    },
    async fetchList(maxDistanceMeters: number) {
      const currentPosition = await getCurrentPosition();
      const response = await client.bcast.getList(this.userId!!, {
        lat: currentPosition.coords.latitude,
        lng: currentPosition.coords.longitude
      }, maxDistanceMeters)
      this.bcastList = response?.bcastList;
    },
    async create(bcast: IBcast) {
      if (!this.userId) {
        return
      }
      try {
        const response = await client.bcast.insert(this.userId, bcast);
        console.log('[Api response: bcast.insert()]', response);
      } catch (e:any) {
        console.log('Error during creation', e.message);
      }
    }
  }

});