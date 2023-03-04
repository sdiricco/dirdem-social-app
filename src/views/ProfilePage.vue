<template>
  <div class="p-4">
    <div class="d-flex flex-column justify-content-center align-items-center pb-4">
      <ion-avatar class="mb-4 border">
        <img :src="avatarUrl" />
      </ion-avatar>
      <ion-card-title class="mb-4">{{ user.name }}</ion-card-title>

      <ion-button shape="round" fill="outline" color="primary" class="mb-4">
      <ion-icon slot="start" :icon="pencil" ></ion-icon>
      Modifica Profilo 
    </ion-button>
    </div>



    <ion-list>
      <ion-item lines="none">  
        <ion-icon slot="start" :icon="mailOutline"></ion-icon>
        <ion-label>
          <h3>Email</h3>
          <p>{{ user.email }}</p>
        </ion-label>
      </ion-item>
      <ion-item lines="none">
        <ion-icon slot="start" :icon="callOutline"> </ion-icon>
        <ion-label>
          <h3>Telefono</h3>
          <p>{{ user.phone }}</p>
        </ion-label>
      </ion-item>
      <ion-item lines="none">
        <ion-icon slot="start" :icon="lockClosedOutline"></ion-icon>
        <ion-label>
          <h3>Password</h3>
          <p>**********</p>
        </ion-label>
      </ion-item>
    </ion-list>
  </div>
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
import { mailOutline, callOutline, lockClosedOutline, pencil } from "ionicons/icons";
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
