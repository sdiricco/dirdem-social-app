import { defineStore } from "pinia";

interface IState {
  broadcasts: []
}
export const useBroadcastStore = defineStore({
  id: "broadcast-store",
  state: (): IState =>({
    broadcasts: []
  }),
});
