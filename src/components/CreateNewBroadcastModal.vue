<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button @click="emit('cancel')">Cancel</ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content>
      <BroadcastForm />
  </ion-content>
  <ion-footer class="footer-height">
    <ion-button expand="block" @click="emit('save')">Salva</ion-button>
  </ion-footer>
</template>

<script lang="ts" setup>
import { onMounted, defineEmits } from "vue";
import { IonContent, IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonFooter } from "@ionic/vue";
import { useBroadcastStore } from "@/store/broadcast";
import BroadcastForm from "@/components/BroadcastForm.vue";
const broadcastStore = useBroadcastStore();

const emit = defineEmits(["cancel", "save"]);

onMounted(async () => {
  await broadcastStore.fetchCandidate();
});
</script>

<style scoped>  
ion-content{
  height: calc(100% - 56px - 56px);
  overflow-y: auto;
}
.footer-height{
  height: 56px;
}
</style>
