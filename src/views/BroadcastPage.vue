<template>
  <h1>Benvenuto {{ userEmail }}</h1>
  <p>Id: {{ userId }}</p>
  <ion-button @click="getPendingBCast">get pending bcast</ion-button>
  <ion-modal :is-open="modalOpen">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="modalOpen = false">Cancel</ion-button>
        </ion-buttons>
        <ion-title>Welcome</ion-title>
        <ion-buttons slot="end">
          <ion-button :strong="true" @click="onSubimit">Confirm</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-item>
        <ion-label position="stacked">Enter your name</ion-label>
        <ion-input ref="input" type="text" placeholder="Your name"></ion-input>
      </ion-item>
    </ion-content>
  </ion-modal>
  <ion-fab slot="fixed" vertical="bottom" horizontal="end">
    <ion-fab-button @click="modalOpen = true">
      <ion-icon :icon="add"></ion-icon>
    </ion-fab-button>
  </ion-fab>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonModal,
  IonToolbar,
  IonButtons,
  IonFab,
  IonFabButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonTitle,
} from "@ionic/vue";
import { supabaseProjectId } from "../constants";
import { add } from "ionicons/icons";


import {dbUtility } from "../main"

const userEmail = ref("");
const userId = ref("");
const modalOpen = ref(false);

async function onSubimit() {
  modalOpen.value = false;
  const response = await dbUtility.bcast.insert(userId.value)({
    maxDistanceKm: 100,
    expiresAt: new Date(),
    tag: ["mioTag"],
    location: { lat: 11.11, lng: 22.22 },
    maxUsers: 30,
    content: {
      message: "message",
      title: "title",
    },
  });
  console.log(response)
}

async function getPendingBCast(){
  const response = await dbUtility.bcast.getPending(userId.value);
  console.log(response);
}

onMounted(async () => {
  const authKey = `sb-${supabaseProjectId}-auth-token`;
  const userData = JSON.parse(localStorage.getItem(authKey) || "");
  userEmail.value = userData?.user?.email;
  userId.value = userData?.user?.id;
  console.log("userData", userData);

  dbUtility.bcast.onInsert(userId.value)((data)=>{
    console.log('on insert', data);
  })

});
</script>
