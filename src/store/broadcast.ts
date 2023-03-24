import { defineStore } from "pinia";
import { useAuthStore } from "./auth";
import { IBcast } from "@/interfaces/bcast";
import client from "@/api/client";
import { IInsertBcast } from "@/interfaces/insert-bcast";
import { ICandidateBcast } from "@/interfaces/candidate-bcast";
import {getCurrentPosition} from "@/functions/geolocalization"

interface IState {
  candidateBroadcasts: ICandidateBcast[];
  joinedBroadcasts: IBcast[];
  tempBroadcast: IInsertBcast;
  tempTag: string;
}
export const useBroadcastStore = defineStore({
  id: "broadcast",
  state: (): IState => ({
    candidateBroadcasts: [],
    joinedBroadcasts: [],
    tempBroadcast: {
      content: {
        title: "",
        message: "",
      },
      expiresAt: new Date(new Date().getTime() + 86400000),
      location: {
        lat: 0,
        lng: 0,
      },
      maxDistanceKm: 0,
      maxUsers: 0,
      tag: [],
      explicitContent: false,
    },
    tempTag: ''
  }),
  getters: {
    userId() {
      const authStore = useAuthStore();
      return authStore.getUserId
    },
  },
  actions: {
    async join(bcastId: string){
      if (!this.userId) {
        return
      }
      await client.bcast.join(this.userId)(bcastId);
      console.log('[JOINED, bcastid]', bcastId)
    },
    async hide(bcastId: string){
      if (!this.userId) {
        return
      }
      await client.bcast.hide(this.userId)(bcastId);
      console.log('[HIDED, bcastid]', bcastId)
    },
    async report(bcastId: string){
      if (!this.userId) {
        return
      }
      await client.bcast.report(this.userId)(bcastId);
      console.log('[REPORTED, bcastid]', bcastId)
    },
    async fetchInserted() {
      if (!this.userId) {
        return
      }
      const response = await client.bcast.getInserted(this.userId);
      console.log('[Api response: bcast.getInserted()]', response);

    },
    async fetchCandidate() {
      try {
        console.log('user-id', this.userId);
        if (!this.userId) {
          return
        }
        const currentPosition = await getCurrentPosition()
        const response = await client.bcast.getCandidate(this.userId)({
          lat: currentPosition.coords.latitude,
          lng: currentPosition.coords.longitude
        })(['mio']);
        console.log('[Api response: bcast.getCandidate()]', response);
        this.candidateBroadcasts = response
      } catch (e) {
        console.log('error in fetch', e)
      }
    },
    async fetchHided() {
      if (!this.userId) {
        return
      }
      const response = await client.bcast.getHided(this.userId);
      console.log('[Api response: bcast.getHided()]', response);
    },
    async fetchJoined() {
      if (!this.userId) {
        return
      }
      console.log('user id')
      console.log(this.userId)
      const response = await client.bcast.getJoined(this.userId);
      console.log('[Api response: bcast.getJoined()]', response);
      this.joinedBroadcasts = response
    },
    async create() {
      if (!this.userId) {
        return
      }
      const response = await client.bcast.insert(this.userId)(this.tempBroadcast);
      console.log('[Api response: bcast.insert()]', response);

    },
  },
});
