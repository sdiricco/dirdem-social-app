/*****************************************************************************/
/* Imports */
/*****************************************************************************/
import { defineStore } from "pinia";
import {getUser} from "@/functions/localstorage"

import client from "@/api/client";

/*****************************************************************************/
/* Interfaces */
/*****************************************************************************/
interface IMessageState {
  messages: any[];
  tempMessage: string;
  bcastId: string;
}

/*****************************************************************************/
/* Store */
/*****************************************************************************/
export const useMessageStore = defineStore({
  id: "message",

  state: (): IMessageState => ({
    messages: [],
    tempMessage: '',
    bcastId: ''
  }),

  getters:{
    getUserId: () => getUser()?.id,
  },

  actions: {
    async sendMessage(){
      if (!this.getUserId) {
        return
      }
      console.log('[Send messages]');
      await client.message.insert(this.getUserId)(this.bcastId)(this.tempMessage)
      this.tempMessage = ''
    },
    async fetchMessages(){
      console.log('[Fetch messages]');
      this.messages = await client.message.get(this.bcastId);
    }
  },
});
