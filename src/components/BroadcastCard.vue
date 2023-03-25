<template>
  <div class="border-top border-bottom">
    <ion-card-header class="d-flex justify-content-between">
      <div>
        <ion-card-title>{{ props.broadcast.content.title || "---" }}</ion-card-title>
        <ion-card-subtitle>{{ props.broadcast.content.message || "---" }}</ion-card-subtitle>
      </div>
      <ion-fab-button size="small">
        <ion-icon :icon="closeOutline"></ion-icon>
      </ion-fab-button>
    </ion-card-header>

    <ion-card-content>home/profile
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
    <slot/>
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

<style   scoped>
ion-fab-button{
  --background: transparent;
  --color: black;
  --box-shadow: none
}
</style>
