<template>
  <ion-toolbar color="primary" class="pt-5 ion-no-border">
    <ion-buttons slot="start" class="pb16">
      <ion-back-button default-href="/home"></ion-back-button>
    </ion-buttons>
  </ion-toolbar>
</template>

<script lang="ts" setup>
import { IonToolbar, IonProgressBar, IonButtons, IonMenuButton, IonTitle, IonBackButton } from "@ionic/vue";

import { useMainStore } from "@/store";
import { useAuthStore } from "@/store/auth";

const auth = useAuthStore();
const store = useMainStore();
</script>
