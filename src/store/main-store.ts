import { defineStore } from "pinia";
import { Preferences } from "@capacitor/preferences";
import { setTheme } from "@/theme/utility";
import { Network } from '@capacitor/network';
import { IMainState } from "@/interfaces/state/main-state";
import { ThemesEnum } from "@/constants/enum";
import { useAuthStore } from "./auth-store";
import { version as appVersion } from '../../package.json';


export const useMainStore = defineStore({
  id: "main",
  state: (): IMainState =>({
    appVersion: appVersion,
    networkStatus: {
      connected: null
    },
    preferences: {
      theme: ThemesEnum.Dark
    },
    apiErrorMessage: null
  }),
  getters: {
    theme: (state: IMainState) => state.preferences.theme
  },
  actions: {
    async toggleTheme() {
      const toggledTheme = this.theme === ThemesEnum?.Dark ? ThemesEnum.Light : ThemesEnum.Dark;
      this.preferences.theme = toggledTheme;
      await setTheme(this.theme);
    },
    async fetchPreferences() {
      const data = await Preferences.get({ key: "preferences" });
      const result = JSON.parse(String(data.value));
      if (!result) {
        return;
      }
      this.preferences = result;
    },
    listenForNetworkChanges(){
      Network.addListener('networkStatusChange', status => {
        this.networkStatus = status;
        console.log('Network status changed', status.connected);
      });
    },
    async getNetworkStatus(){
      const status = await Network.getStatus()
      this.networkStatus = status;
    },
    async loadApp() {
      console.log('[Loading app function]')
      this.listenForNetworkChanges();
      await this.fetchPreferences();
      await setTheme(this.preferences.theme);
      await this.getNetworkStatus();
      await useAuthStore().fetchUserInfo();
    },
    setApiErrorMessage(errorMessage: string | null) {
      this.apiErrorMessage = errorMessage;
      setTimeout(() => {
        this.apiErrorMessage = null
      }, 5000)
    }
  },
});
