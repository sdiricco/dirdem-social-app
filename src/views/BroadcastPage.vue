<template>
  <div class="overflow-auto h-100">
    <div v-if="!broadcastStore.broadcasts.length">
      <p>No broadcast fetching API [{{ filter }}]</p>
    </div>
    <ion-card card v-for="bcast in broadcastStore.broadcasts" class="m-4">
    <ion-card-header class="d-flex justify-content-between">
      <div>
        <ion-card-title>{{ bcast.content.title || '---' }}</ion-card-title>
        <ion-card-subtitle>{{ bcast.content.message || '---' }}</ion-card-subtitle>
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
    <ion-button fill="solid" expand="full" class="no-margin" @click="onClickJoin(bcast)">Unisciti</ion-button>
  </ion-card>
  </div>

  <ion-modal :is-open="modalOpen">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="modalOpen = false">Cancel</ion-button>
        </ion-buttons>
        <ion-title>Welcome</ion-title>
        <ion-buttons slot="end">
          <ion-button :strong="true" @click="onSubmitBCast">Salva</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <BroadcastForm />
    </ion-content>
  </ion-modal>
  <ion-fab slot="fixed" vertical="bottom" horizontal="end">
    <ion-fab-button @click="modalOpen = true">
      <ion-icon :icon="add"></ion-icon>
    </ion-fab-button>
  </ion-fab>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
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
import { useAuthStore } from "@/store/auth";
import { useBroadcastStore } from "@/store/broadcast";
import BroadcastForm from "@/components/BroadcastForm.vue";
const broadcastStore = useBroadcastStore();
const authStore = useAuthStore();
const modalOpen = ref(false);
const filter = ref('all')

async function onSubmitBCast() {
  await broadcastStore.create();
}

async function onClickJoin(bcast:any){
  console.log('join', bcast?.id)
  await broadcastStore.join(bcast?.id)
}

onMounted(async () => {
  await broadcastStore.fetchAll();
});


</script>

<style scoped>
.no-padding {
  padding: 0px !important;
}

.no-margin {
  margin: 0px !important;
}

ion-segment {
  --background: #efefef;
}
</style>
