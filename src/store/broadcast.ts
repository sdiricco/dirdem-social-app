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
    broadcasts: [
      {
        content: {
          title: "Gita sulla Pania",
          message: "Chi si aggrega per una escursione questa domenica?",
        },
        expiresAt: new Date(),
        location: {
          lat: 22.0,
          lng: 34.0,
        },
        maxDistanceKm: 1000,
        maxUsers: 12,
        tag: ["sport", "trekking"],
        explicitContent: false,
      },
      {
        content: {
          title: "Giro in città",
          message: "Chi si aggrega per una escursione questa domenica?",
        },
        expiresAt: new Date(),
        location: {
          lat: 22.0,
          lng: 34.0,
        },
        maxDistanceKm: 1000,
        maxUsers: 12,
        tag: ["sport", "trekking"],
        explicitContent: false,
      },
    ],
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
    async fetch() {
      const response = await client.bcast.getInserted(this.userId);
      console.log(response);
    },
    async create() {
      const response = await client.bcast.insert(this.userId)(this.tempBroadcast);
      console.log(response);
    },
  },
});
