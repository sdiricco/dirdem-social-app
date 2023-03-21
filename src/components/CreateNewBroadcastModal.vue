<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button @click="emit('cancel')">Cancel</ion-button>
      </ion-buttons>
      <ion-title>Welcome</ion-title>
      <ion-buttons slot="end">
        <ion-button :strong="true" @click="emit('save')">Salva</ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding"> <BroadcastForm /> </ion-content>
</template>

<script lang="ts" setup>
import { onMounted, defineEmits } from "vue";
import { IonContent, IonHeader, IonToolbar, IonButtons, IonButton, IonTitle } from "@ionic/vue";
import { useBroadcastStore } from "@/store/broadcast";
import BroadcastForm from "@/components/BroadcastForm.vue";
const broadcastStore = useBroadcastStore();

const emit = defineEmits(["cancel", "save"]);

onMounted(async () => {
  await broadcastStore.fetchCandidate();
});
</script>

<style scoped></style>
