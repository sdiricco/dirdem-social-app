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

import { useStore } from "@/store/store";
const store = useStore();

</script>