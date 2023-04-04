<template>
  <ion-tab-bar slot="bottom">
    <ion-tab-button tab="overview" href="/home/candidate-broadcasts">
      <ion-icon :icon="compassOutline"></ion-icon>
      Vicini a me
    </ion-tab-button>

    <ion-tab-button tab="categories" href="/home/joined-broadcasts">
      <ion-icon :icon="chatboxOutline"></ion-icon>
      Chat
    </ion-tab-button>
  </ion-tab-bar>
</template>

<script lang="ts" setup>
import { IonTabBar, IonTabButton, IonLabel, IonIcon } from "@ionic/vue";
import { compassOutline, chatboxOutline } from "ionicons/icons";

</script>
<style scoped>
.tab-selected{
  color: var(--ion-color-secondary);
}
</style>
