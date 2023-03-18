<template>
  <ion-list>
    <ion-item>
      <ion-label position="stacked">Titolo</ion-label>
      <ion-input v-model="broadcastStore.tempBroadcast.content.title"></ion-input>
    </ion-item>
    <ion-item>
      <ion-label position="stacked">Contenuto</ion-label>
      <ion-textarea v-model="broadcastStore.tempBroadcast.content.message"></ion-textarea>
    </ion-item>

    <ion-item>
      <ion-label position="stacked">Latitudine</ion-label>
      <ion-input type="number" v-model="broadcastStore.tempBroadcast.location.lat"></ion-input>
    </ion-item>
    <ion-item>
      <ion-label position="stacked">Longitudine</ion-label>
      <ion-input type="number" v-model="broadcastStore.tempBroadcast.location.lng"></ion-input>
    </ion-item>

    <ion-item>
      <ion-label position="stacked">Distanza massima</ion-label>
      <ion-input type="number" v-model="broadcastStore.tempBroadcast.maxDistanceKm"></ion-input>
    </ion-item>

    <ion-item>
      <ion-label position="stacked">Utenti Massimi</ion-label>
      <ion-input type="number" v-model="broadcastStore.tempBroadcast.maxUsers"></ion-input>
    </ion-item>
    <ion-item>
      <ion-label position="fixed">Tag</ion-label>
      <ion-input v-model="broadcastStore.tempTag"></ion-input>
      <ion-button slot="end" @click="addTag"> Add </ion-button>
    </ion-item>
    <ion-item>
      <ion-label>{{ broadcastStore.tempBroadcast.tag }}</ion-label>
    </ion-item>
  </ion-list>
</template>

<script lang="ts" setup>
import { IonItem, IonLabel, IonInput, IonList, IonTextarea, IonButton, IonGrid, IonCol, IonRow } from "@ionic/vue";
import { useBroadcastStore } from "@/store/broadcast";
const broadcastStore = useBroadcastStore();

function addTag(){
  broadcastStore.tempBroadcast.tag.push(broadcastStore.tempTag)
}

async function onSubmitBCast() {
  await broadcastStore.create();
}
</script>

<style scoped></style>
