<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <NavTabs />
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts" setup>
import { IonPage, IonTabs, IonRouterOutlet } from "@ionic/vue";
import NavTabs from "@/components/NavTabs.vue";



</script>
