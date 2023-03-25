<template>
  <ion-toolbar color="primary" class="pt4">
    <ion-buttons slot="start" class="pb16">
      <ion-menu-button></ion-menu-button>
    </ion-buttons>
    <ion-title>{{ auth.getEmail }}</ion-title>
    <ion-progress-bar type="indeterminate" v-if="store.httpRequestOnGoing" color="secondary"></ion-progress-bar>
  </ion-toolbar>
</template>

<script lang="ts" setup>
import { IonToolbar, IonProgressBar, IonButtons, IonMenuButton, IonTitle } from "@ionic/vue";

import { useMainStore } from "@/store";
import { useAuthStore } from "@/store/auth";

const auth = useAuthStore();
const store = useMainStore();
</script>
