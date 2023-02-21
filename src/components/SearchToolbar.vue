<template>
  <ion-toolbar color="primary" class="pt64">
    <ion-buttons slot="start" class="pb16">
      <ion-menu-button></ion-menu-button>
    </ion-buttons>
    <ion-progress-bar type="indeterminate" v-if="store.httpRequestOnGoing" color="secondary"></ion-progress-bar>
  </ion-toolbar>
</template>

<script lang="ts" setup>
import { IonToolbar, IonProgressBar, IonButtons, IonMenuButton } from "@ionic/vue";

import { useStore } from "@/store/main";
const store = useStore();

</script>

<style scoped>
ion-icon {
  font-size: 24px;
}

ion-buttons {
  margin: auto;
}

ion-searchbar {
  --border-radius: 24px;
  padding-bottom: 0px;
  padding-top: 0px;
}

.pt64 {
  padding-top: 64px;
}

.pb16 {
  padding-bottom: 16px;
}

.pr16 {
  padding-right: 16px;
}
</style>
