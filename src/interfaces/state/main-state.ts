import { ThemesEnum } from "@/constants/enum";

export interface IMainState {
    appVersion: string;
    networkStatus: {
      connected: boolean | null;
    },
    preferences: {
        theme: ThemesEnum;
    },
    apiErrorMessage: string | null;
  }