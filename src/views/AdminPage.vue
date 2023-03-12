<template>
  <ion-page>
    <div>Admin</div>
  </ion-page>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import {
  IonPage,  
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

onMounted(async () => {
  await broadcastStore.fetchInserted();
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
