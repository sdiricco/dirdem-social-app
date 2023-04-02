import { defineStore } from "pinia";
import { useAuthStore } from "./auth";
import { IBcast } from "@/interfaces/bcast";
import client from "@/api/client";
import { getCurrentPosition } from "@/functions/geolocalization";
import { ApiError } from "@/models/apiError";
import utils from "@/functions/utils-fns"


interface IState {
  candidateBroadcasts: IBcast[];
  joinedBroadcasts: IBcast[];
  insertedBroadcasts: IBcast[];
  tempBroadcast: IBcast;
  tempTag: string;
  error: ApiError | null;
  isLoading: boolean;
}
export const useBroadcastStore = defineStore({
  id: "broadcast",
  state: (): IState => ({
    candidateBroadcasts: [],
    joinedBroadcasts: [],
    insertedBroadcasts: [],

    /* Temp broadcast structure */
    /* Used when creating a new broadcast */
    tempBroadcast: {
      content: {
        title: "Il mio titolo",
        message: "il mio contenuto",
      },
      expiresAt: new Date(new Date().getTime() + 86400000),
      location: {
        lat: 0,
        lng: 0,
      },
      maxDistanceKm: 100,
      maxUsers: 100,
      tag: [],
      explicitContent: false,
    },
    tempTag: "",

    /* Api Error structure */
    error: null,

    /* Loading variable */
    isLoading: false,
  }),

  getters: {
    userId() {
      const authStore = useAuthStore();
      return authStore.getUserId;
    },
    getJoinedAndInsertedBroadcasts(): IBcast[] {
      return [...this.insertedBroadcasts, ...this.joinedBroadcasts];
    },
  },

  actions: {

    /* Join candidate broadcast */
    async join(bcastId: string) {
      if (!this.userId) {
        return;
      }
      try {
        this.isLoading = true
        await client.bcast.join(this.userId)(bcastId);
        await utils.wait(2000);
        this.isLoading = false
        console.log("[JOINED, bcastid]", bcastId);
      } catch (error) {
        this.isLoading = false
        this.handleApiError(error);
      }
    },

    /* Hide candidate broadcast */
    async hide(bcastId: string) {
      if (!this.userId) {
        return;
      }
      try {
        this.isLoading = true
        await client.bcast.hide(this.userId)(bcastId);
        await utils.wait(2000);
        this.isLoading = false
        console.log("[HIDED, bcastid]", bcastId);
      } catch (error) {
        this.isLoading = false
        this.handleApiError(error);
      }
    },

    /* Report candidate broadcast */
    async report(bcastId: string) {
      if (!this.userId) {
        return;
      }
      try {
        this.isLoading = true
        await client.bcast.report(this.userId)(bcastId);
        await utils.wait(2000);
        this.isLoading = false
        console.log("[REPORTED, bcastid]", bcastId);
      } catch (error) {
        this.isLoading = false
        this.handleApiError(error); 
      }

    },

    /* Fetch Inserted broadcasts */
    async fetchInserted() {
      if (!this.userId) {
        return;
      }
      try {
        this.isLoading = true;
        const response = await client.bcast.getInserted(this.userId);
        await utils.wait(2000);
        this.insertedBroadcasts = response;
        this.isLoading = false;
        console.log("[Api response: bcast.getInserted()]", response);
      } catch (error) {
        this.isLoading = false
        this.handleApiError(error); 
      }

    },

    /* Fetch Candidate broadcast*/
    async fetchCandidate() {
      if (!this.userId) {
        return;
      }
      try {
        this.isLoading = true;
        const currentPosition = await getCurrentPosition();
        const response = await client.bcast.getCandidate(this.userId)({
          lat: currentPosition.coords.latitude,
          lng: currentPosition.coords.longitude,
        })(["mio"]);
        await utils.wait(2000);
        this.candidateBroadcasts = response;
        this.isLoading = false;
        console.log("[Api response: bcast.getCandidate()]", response);
      } catch (error) {
        this.isLoading = false
        this.handleApiError(error); 
      }
    },

    /* Fetch Joined broadcast*/
    async fetchJoined() {
      if (!this.userId) {
        return;
      } 
      try {
        this.isLoading = true;
        const response = await client.bcast.getJoined(this.userId);
        this.joinedBroadcasts = response;
        await utils.wait(2000);
        this.isLoading = false
        console.log("[Api response: bcast.getJoined()]", response);
      } catch (error) {
        this.isLoading = false
        this.handleApiError(error); 
      }
    },

    /* CreateNew Broadcast*/
    async create() {
      if (!this.userId) {
        return;
      }
      try {
        this.isLoading = true;
        const response = await client.bcast.insert(this.userId)(this.tempBroadcast);
        await utils.wait(2000);
        this.isLoading = false
        console.log("[Api response: bcast.insert()]", response);
      } catch (error) {
        this.isLoading = false
        this.handleApiError(error); 
      }
    },

    /* handle errors */
    async handleApiError(error: any) {
      if (error instanceof ApiError) {
        this.error = error;
      } else {
        alert(`[UNKNOWN ERROR]: ${error.message}`);
      }
    },
  },
});
