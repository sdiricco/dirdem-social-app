<template>
  <h1>Welcome {{ authStore.email }}</h1>
  <p>Id: {{ authStore.user?.id }}</p>
  <ion-button>get pending bcast</ion-button>
  <ion-modal :is-open="modalOpen">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="modalOpen = false">Cancel</ion-button>
        </ion-buttons>
        <ion-title>Welcome</ion-title>
        <ion-buttons slot="end">
          <ion-button :strong="true">Confirm</ion-button>
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
import {ref } from "vue";
import {
  IonContent,
  IonHeader,
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
import { add } from "ionicons/icons";
import {useAuthStore} from "@/store/auth"
const authStore = useAuthStore()
const modalOpen = ref(false);
</script>
