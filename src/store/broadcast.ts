import { defineStore } from "pinia";
import { useAuthStore } from "./auth";
import { IBcast } from "@/interfaces/bcast";
import client from "@/api/client";

interface IState {
  broadcasts: IBcast[];
  tempBroadcast: IBcast;
  tempTag: string;
}
export const useBroadcastStore = defineStore({
  id: "broadcast-store",
  state: (): IState => ({
    broadcasts: [],
    tempBroadcast: {
      content: {
        title: "",
        message: "",
      },
      expiresAt: new Date(),
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

    async fetchAll() {
      this.$store.broadcasts = await client.bcast.getAll();
    },
    async fetchInserted() {
      this.broadcasts = await client.bcast.getInserted(this.userId);
      console.log(this.broadcasts)
    },
    async fetchCandidate() {
      this.broadcasts = await client.bcast.getCandidate(this.userId)({
        lat: 33.33,
        lng: 44.44
      })(['mio', 'tuo']);
    },
    async fetchJoined() {
      this.broadcasts = await client.bcast.getJoined(this.userId);
    },
    async fetchHided() {
      this.broadcasts = await client.bcast.getHided(this.userId);
    },
    async create() {
      const response = await client.bcast.insert(this.userId)(this.tempBroadcast);
      console.log(response);
    },
  },
});
