<template>
  <ion-page>
    <ion-content>
      <div class="vh-100 d-flex align-items-center justify-content-center">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-md-6">
              <div class="d-grid gap-2">
                <ion-button expand="block" size="large" color="dark" @click="router.push('/login')">Accedi</ion-button>
                <ion-button expand="block" size="large" color="dark" @click="router.push('/registration')">Registrati</ion-button>
                <ion-button expand="block" size="large" fill="outline" color="dark" @click="router.push('/admin')">Admin</ion-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ion-content>
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
  IonSegmentButton,
} from "@ionic/vue";
import { add, star, mailOutline, arrowRedoOutline, closeOutline, locationOutline, timeOutline } from "ionicons/icons";
import { useAuthStore } from "@/store/auth";
import { useBroadcastStore } from "@/store/broadcast";
import BroadcastForm from "@/components/BroadcastForm.vue";
import router from "@/router";
const broadcastStore = useBroadcastStore();
const authStore = useAuthStore();
const modalOpen = ref(false);
const filter = ref("all");

async function goToLoginPage() {
  // Aggiungi qui la logica per navigare alla pagina di accesso
}
async function goToRegistrationPage() {
  // Aggiungi qui la logica per navigare alla pagina di registrazione
}

async function onSubmitBCast() {
  await broadcastStore.create();
}

onMounted(async () => {
  await broadcastStore.fetchCandidate();
  await broadcastStore.fetchInserted();
});
</script>

<style scoped>
.background-image {
  background: linear-gradient(to bottom, #8e2de2, #4a00e0);
}
</style>
