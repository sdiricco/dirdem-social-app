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
      if (!this.getUserId || !this.tempMessage) {
        return
      }
      console.log('[Send messages]');
      await client.message.insert(this.getUserId)(this.bcastId)(this.tempMessage)
      this.tempMessage = ''
    },
    async fetchMessages(){
      console.log('[Fetch messages]');
      this.messages = await client.message.get(this.bcastId);
    },
    listenMessages(){
      client.message.onInsert(this.bcastId, (payload:any) => {
        console.log("New message", payload);
        const rawMessage = payload.new
        const message = {
          bcastId: rawMessage.bcast_id,
          content: rawMessage.content,
          createdAt: new Date(rawMessage.created_at),
          userId: rawMessage.user_id
        }
        console.log('message', message);
        this.messages.push(message);
      });
    }
  },
});
