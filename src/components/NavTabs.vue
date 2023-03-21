<template>
  <ion-tab-bar slot="bottom">
    <ion-tab-button tab="overview" href="/home/candidate-broadcasts">
      <ion-label>Candidate</ion-label>
    </ion-tab-button>

    <ion-tab-button tab="categories" href="/home/joined-broadcasts">
      <ion-label>Joined</ion-label>
    </ion-tab-button>
  </ion-tab-bar>
</template>

<script lang="ts" setup>
import { IonTabBar, IonTabButton, IonLabel } from "@ionic/vue";

</script>
