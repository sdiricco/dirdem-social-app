/*****************************************************************************/
/* Imports */
/*****************************************************************************/
import { defineStore } from "pinia";
import {getUser} from "@/functions/localstorage"

import client from "@/api/client";
import { IMessage } from "@/interfaces/message";

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
      client.message.onInsert(this.bcastId, (message: any) => {
        console.log('message', message);
        this.messages.push(message);
      });
    }
  },
});
