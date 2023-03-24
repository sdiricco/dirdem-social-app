<template>
  <ion-list lines="inset">
    <ion-item>
      <ion-label position="stacked">Titolo</ion-label>
      <ion-input v-model="broadcastStore.tempBroadcast.content.title"></ion-input>
    </ion-item>
    <ion-item>
      <ion-label position="stacked">Contenuto</ion-label>
      <ion-input v-model="broadcastStore.tempBroadcast.content.message"></ion-input>
    </ion-item>
    <ion-item>
      <ion-label position="stacked">Data di scadenza: {{ broadcastStore.tempBroadcast.expiresAt.toISOString() }}</ion-label>
      <ion-datetime color="secondary" presentation="date-time" :prefer-wheel="true" :value="broadcastStore.tempBroadcast.expiresAt.toISOString()" @ion-change="onChangeDate"></ion-datetime>
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
import { onMounted, ref, watch } from "vue";
import { IonItem, IonLabel, IonInput, IonDatetime, IonList, IonTextarea, IonButton, IonGrid, IonCol, IonRow } from "@ionic/vue";
import { useBroadcastStore } from "@/store/broadcast";
import {getCurrentPosition} from "@/functions/geolocalization"
const broadcastStore = useBroadcastStore();


function onChangeDate(evt:any){ 
  const date = evt.target.value;
  broadcastStore.tempBroadcast.expiresAt = new Date(date);
}

function addTag(){
  broadcastStore.tempBroadcast.tag.push(broadcastStore.tempTag)
}

async function onSubmitBCast() {
  await broadcastStore.create();
}
onMounted(async ()=> {
  const currentPosition = await getCurrentPosition();
  broadcastStore.tempBroadcast.location.lat =  currentPosition.coords.latitude;
  broadcastStore.tempBroadcast.location.lng =  currentPosition.coords.longitude;
})

</script>

<style scoped></style>
