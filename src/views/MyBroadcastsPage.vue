<template>
  <div v-if="!broadcastStore.candidateBroadcasts.length">
    <p>No broadcast fetching API</p>
  </div>
  <div>candidate:</div>

  
  <div>joined:</div> 
  <div v-for="bcast in broadcastStore.joinedBroadcasts">
    <ion-card-header class="d-flex justify-content-between">
      <div>
        <ion-card-title>{{ bcast.content.title || "---" }}</ion-card-title>
        <ion-card-subtitle>{{ bcast.content.message || "---" }}</ion-card-subtitle>
      </div>
      <ion-fab-button color="danger" size="small">
        <ion-icon :icon="closeOutline"></ion-icon>
      </ion-fab-button>
    </ion-card-header>

    <ion-card-content>
      <ion-list>
        <ion-item lines="none">
          <ion-icon slot="start" :icon="locationOutline"></ion-icon>
          <ion-label>
            <h3>Dove</h3>
            <p>{{ bcast.location }}</p>
          </ion-label>
        </ion-item>
        <ion-item lines="none">
          <ion-icon slot="start" :icon="timeOutline"> </ion-icon>
          <ion-label>
            <h3>Scadenza</h3>
            <p>{{ bcast.expiresAt }}</p>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-card-content>
    <ion-button fill="solid" expand="full" class="no-margin" @click="onClickChat(bcast)">Chat</ion-button>
  </div>
</template>

<script lang="ts" setup>
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
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonCardSubtitle,
  IonList,
  IonFooter,
  IonSegment,
  IonSegmentButton
} from "@ionic/vue";
import { add, star, mailOutline, arrowRedoOutline, closeOutline, locationOutline, timeOutline } from "ionicons/icons";
import { onMounted } from "vue";
import { useMessageStore } from "@/store/message";
import { useBroadcastStore } from "@/store/broadcast";
import router from "@/router";
const broadcastStore = useBroadcastStore();
const messageStore = useMessageStore();

async function onClickJoin(bcast:any){
  await broadcastStore.join(bcast.id)
  messageStore.bcastId = bcast.id
  router.push('/home/chat-page')
}

async function onClickChat(bcast:any){
  messageStore.bcastId = bcast.id
  router.push('/home/chat-page')
}

onMounted(async () => {
  await broadcastStore.fetchCandidate();
  await broadcastStore.fetchJoined();
});
</script>
