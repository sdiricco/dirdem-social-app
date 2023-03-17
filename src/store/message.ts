/*****************************************************************************/
/* Imports */
/*****************************************************************************/
import { defineStore } from "pinia";
import router from "@/router";
import { ApiError } from "@/models/apiError";
import client from "@/api/client";
import {getUser} from "@/functions/localstorage"

/*****************************************************************************/
/* Interfaces */
/*****************************************************************************/
interface IMessageState {
  messages: [];
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

  actions: {
    
  },
});
