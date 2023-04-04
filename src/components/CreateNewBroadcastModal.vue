<template>
  <ion-header class="ion-no-border pt-5">
    <ion-toolbar>
      <ion-title>Crea un broadcast</ion-title>
      <ion-buttons slot="end">
        <ion-button @click="emit('cancel')">
          <ion-icon :icon="closeOutline"></ion-icon>
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content>
    <!-- <BroadcastForm /> -->
  </ion-content>
  <ion-footer class="footer-height ion-no-border">
    <div class="mx-2">
      <ion-button shape="round" color="primary" expand="block" @click="emit('save')"> Salva </ion-button>
    </div>
  </ion-footer>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { IonContent, IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonFooter, IonIcon } from "@ionic/vue";
import { closeOutline } from "ionicons/icons";
import { useBroadcastStore } from "@/store/broadcast";
import BroadcastForm from "@/components/BroadcastForm.vue";
const broadcastStore = useBroadcastStore();

const emit = defineEmits(["cancel", "save"]);

onMounted(async () => {
  await broadcastStore.fetchCandidate();
});
</script>

<style scoped>
ion-content {
  height: calc(100% - 56px - 56px - 3rem);
  overflow-y: auto;
}
</style>
