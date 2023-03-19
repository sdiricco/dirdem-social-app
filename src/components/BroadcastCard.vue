<template>
  <div>
    <ion-card-header class="d-flex justify-content-between">
      <div>
        <ion-card-title>{{ props.broadcast.content.title || "---" }}</ion-card-title>
        <ion-card-subtitle>{{ props.broadcast.content.message || "---" }}</ion-card-subtitle>
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
            <p>{{ props.broadcast.location }}</p>
          </ion-label>
        </ion-item>
        <ion-item lines="none">
          <ion-icon slot="start" :icon="timeOutline"> </ion-icon>
          <ion-label>
            <h3>Scadenza</h3>
            <p>{{ props.broadcast.expiresAt }}</p>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-card-content>
    <ion-button fill="solid" expand="full" class="no-margin" @click="emit('click-join')">Unisciti</ion-button>
  </div>
</template>

<script lang="ts" setup>
import {
  IonFabButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonButton,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonCardSubtitle,
  IonList,
} from "@ionic/vue";
import { closeOutline, locationOutline, timeOutline } from "ionicons/icons";
import { defineProps, withDefaults, defineEmits } from "vue";

const emit = defineEmits(['click-join']);

const props = withDefaults(defineProps<{broadcast: any}>(), {broadcast: () => {}});
</script>

<style lang="" scoped></style>
