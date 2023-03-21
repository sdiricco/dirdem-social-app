<template>
  <ion-page>
    <ion-tabs>
      <ion-header>
        <NavBar />
      </ion-header>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="overview" href="/home/broadcast">
          <ion-label>Home</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="categories" href="/home/profile">
          <ion-label>Profile</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts" setup>
import NavBar from "@/components/NavBar.vue";
import { IonHeader, IonPage, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel } from "@ionic/vue";
import { useMainStore } from "@/store";

const store = useMainStore();
</script>
