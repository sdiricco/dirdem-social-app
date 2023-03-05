<template>
  <ion-header>
    <ion-toolbar class="pt64 pb16" color="primary">
      <h3 class="ion-padding-horizontal">Template PRO</h3>
      <div class="ion-padding-horizontal pb16">v: {{ store.appVersion }}</div>
    </ion-toolbar>
  </ion-header>
  <ion-content>
    <ion-item lines="inset">
      <ion-icon slot="start" :icon="moon"></ion-icon>
      <ion-label>Dark mode</ion-label>
      <ion-toggle slot="end" @ion-change="onToggleTheme" :checked="store.isDark"> </ion-toggle>
    </ion-item>
    <ion-menu-toggle>
      <ion-item lines="inset" button @click="onClickHome">
        <ion-label>Home</ion-label>
      </ion-item>
    </ion-menu-toggle>
    <ion-menu-toggle>
      <ion-item lines="inset" button @click="onClickProfile">
        <ion-label>Profile</ion-label>
      </ion-item>
    </ion-menu-toggle>
  </ion-content>
</template>

<script lang="ts" setup>
import router from "../router";
import { IonHeader, IonToolbar, IonContent, IonIcon, IonLabel, IonToggle, IonItem, IonMenuToggle } from "@ionic/vue";
import { moon } from "ionicons/icons";
import { useStore } from "@/store/main";

const store = useStore();

async function onToggleTheme(evt: any) {
  const isDark = evt.target.checked;
  await store.toggleTheme(isDark);
}

function onClickProfile() {
  router.push("/home/profile");
}

function onClickHome(){
  router.push("/home");
}
</script>

<style scoped>
.pt64 {
  padding-top: 64px;
}

.pb16 {
  padding-bottom: 16px;
}
</style>
