<template>
  <div class="d-flex justify-content-center">
    <ion-avatar>
      <img :src="avatarUrl" />
    </ion-avatar>
  </div>
  <ion-card-title>{{ user.name }}</ion-card-title>
  <ion-card-subtitle>{{ user.status }}</ion-card-subtitle>

  <ion-list>
    <ion-item>
      <ion-icon slot="start" :icon="mailOutline"></ion-icon>
      <ion-label>Email</ion-label>
      <ion-label>{{ user.email }}</ion-label>
    </ion-item>
    <ion-item>
      <ion-icon slot="start" :icon="callOutline">  </ion-icon>
      <ion-label>Telefono</ion-label>
      <ion-label>{{ user.phone }}</ion-label>
    </ion-item>
    <ion-item>
      <ion-icon slot="start" :icon="lockClosedOutline"></ion-icon>
      <ion-label>Password</ion-label>
      <ion-label>**********</ion-label>
    </ion-item>
  </ion-list>

  <ion-button expand="block" color="primary"> Modifica Profilo </ion-button>
</template>

<script lang="ts" setup>
import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonIcon,
  IonLabel,
  IonToggle,
  IonItem,
  IonList,
  IonCardContent,
  IonButton,
  IonCard,
  IonCardHeader,
  IonAvatar,
  IonCardTitle,
  IonCardSubtitle,
} from "@ionic/vue";
import { mailOutline, callOutline, lockClosedOutline  } from "ionicons/icons";
import { useProfileStore } from "@/store/profile";
import { onMounted, reactive, ref } from "vue";
const profileStore = useProfileStore();

const user = reactive({
  name: "Mario Rossi",
  status: "Disponibile",
  email: "mario.rossi@example.com",
  phone: "+39 1234567890",
});

const avatarUrl = ref(`https://robohash.org/${Math.random().toString(36).substring(7)}.png`);
onMounted(() => {
  profileStore.fetch();
});
</script>
