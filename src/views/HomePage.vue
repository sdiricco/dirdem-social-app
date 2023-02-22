<template>
  <ion-page>
    <ion-header>
      <SearchToolbar />
    </ion-header>

    <ion-content :fullscreen="true">
      <router-view></router-view>
      
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import SearchToolbar from "@/components/SearchToolbar.vue";
import { IonContent, IonHeader, IonPage } from "@ionic/vue";
</script>
