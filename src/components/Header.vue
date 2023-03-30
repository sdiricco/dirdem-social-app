<template>
  <ion-toolbar color="primary" class="pt-5 ion-no-border">
    <ion-buttons slot="start">
      <ion-menu-button v-if="props.showMenuButton"></ion-menu-button>
      <ion-back-button v-if="props.showBackButton" default-href="/home" ></ion-back-button>
    </ion-buttons>
  </ion-toolbar>
</template>

<script lang="ts" setup>
import { IonToolbar, IonButtons, IonMenuButton, IonBackButton } from "@ionic/vue";

const props = defineProps({
  showMenuButton: Boolean,
  showBackButton: Boolean,
})
</script>
