import { defineStore } from "pinia";
import { Preferences } from "@capacitor/preferences";
import { setTheme } from "@/theme/utility";
import { Network } from '@capacitor/network';


interface IState {
  httpRequestOnGoing: boolean;
  appVersion: string;
  networkStatus: {
    connected: boolean;
    connectionType: string;
  },
  preferences: {
    isDark: boolean;
  },
}
export const useStore = defineStore({
  id: "store",
  state: (): IState =>({
    httpRequestOnGoing: false,
    appVersion: "0.0.1",
    networkStatus: {
      connected: true,
      connectionType: ''
    },
    preferences: {
      isDark: false,
    }
  }),
  getters: {
    isDark: (state: any) => state.preferences.isDark,
  },
  actions: {
    async toggleTheme(isDark: boolean) {
      this.preferences.isDark = isDark;
      console.log("Toggle theme");
      console.log("\tisDark", isDark);
      await setTheme(isDark);
    },
    async fetchPreferences() {
      console.log("Fetch preferences");
      try {
        const data = await Preferences.get({ key: "preferences" });
        const result = JSON.parse(String(data.value));
        if (!result) {
          return;
        }
        this.preferences = result;
        console.log("\tpreferences", this.preferences);
      } catch (e) {
        console.log("\tError fetching preferences");
      }
    },
    async savePreferences(preferences: any) {
      try {
        await Preferences.set({
          key: "preferences",
          value: JSON.stringify(preferences),
        });
      } catch (e) {
        console.log("\tError saving preferences");
      }
    },
    listenForNetworkChanges(){
      Network.addListener('networkStatusChange', status => {
        this.networkStatus = status;
        console.log('Network status changed', status.connected);
      });
    },
    async getNetworkStatus(){
      try {
        const status = await Network.getStatus()
        this.networkStatus = status;
        console.log('Network status:', status.connected);
      } catch (e) {
        console.log('Error getting network status')
      }
    },
    async loadApp() {
      await this.fetchPreferences();
      await setTheme(this.isDark);
      this.listenForNetworkChanges();
      await this.getNetworkStatus();
    },
    async clear() {
      await Preferences.clear();
    }
  },
});
