<template>
  <ion-header >
    <ion-toolbar class="pt64 pb16" color="primary">
      <h3 class="ion-padding-horizontal">Template PRO</h3>
      <div class="ion-padding-horizontal pb16">v: {{ store.appVersion }}</div>
    </ion-toolbar>
  </ion-header>
  <ion-content>
    <ion-item lines="inset">
      <ion-icon slot="start" :icon="moon"></ion-icon>
      <ion-label>Dark mode</ion-label>
      <ion-toggle
        slot="end"
        @ion-change="onToggleTheme"
        :checked="store.isDark"
      >
      </ion-toggle>
    </ion-item>
  </ion-content>
</template>

<script lang="ts" setup>

import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonIcon,
  IonLabel,
  IonToggle,
  IonItem,
} from "@ionic/vue";
import { moon } from "ionicons/icons";
import { useStore } from "@/store/main";

const store = useStore();

async function onToggleTheme(evt: any) {
  const isDark = evt.target.checked;
  await store.toggleTheme(isDark);
}

</script>

<style scoped>
.pt64{
  padding-top: 64px;
}

.pb16{
  padding-bottom: 16px;
}
</style>