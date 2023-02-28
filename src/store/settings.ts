import { defineStore } from "pinia";
import { Preferences } from "@capacitor/preferences";
import { setTheme } from "@/theme/utility";

const stringify = (value: any) => JSON.stringify(value);
const parse = (value: any) => JSON.parse(String(value));

interface ISettingsStore {
  preferences: {
    isDark: boolean;
  }
}
export const useLayoutStore = defineStore({
  id: "settings-store",
  state: (): ISettingsStore =>({
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
      await setTheme(isDark);
    },
    async fetchPreferences() {
      console.log("[Fetch preferences]");
      try {
        const data = await Preferences.get({ key: "preferences" });
        const result = parse(data.value)
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
          value: stringify(preferences),
        });
      } catch (e) {
        console.log("\tError saving preferences");
      }
    }
  },
});
