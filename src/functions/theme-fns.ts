
import { ThemesEnum } from "@/constants/enum";
import { StatusBar, Style } from "@capacitor/status-bar";

export async function setTheme(theme: ThemesEnum) {
  try {
    await StatusBar.setOverlaysWebView({ overlay: true });
  } catch (e) {
    console.log("Error during setting status overlay");
  }
  document.body.classList.toggle(theme, true);
  switch (theme) {
    case ThemesEnum.Dark:
      await setDarkTheme();
      break;
    case ThemesEnum.Light:
      await setLightTheme();
      break
    default:
      console.error("Theme not recognized");
      break;
  }
}

async function setDarkTheme() {
  try {
    await StatusBar.setStyle({ style: Style.Dark });
  } catch (e) {
    console.log("Error during setting status bar color");
  }
  document.body.classList.toggle("dark", true);
}

async function setLightTheme() {
  try {
    await StatusBar.setStyle({ style: Style.Dark });
  } catch (e) {
    console.log("Error during setting status bar color");
  }
  document.body.classList.toggle("dark", false);

}
