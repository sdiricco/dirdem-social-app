<template>
  <div class="p-4">
    <div class="d-flex flex-column justify-content-center align-items-center pb-4">
      <ion-avatar class="mb-4 border">
        <img :src="avatarUrl" />
      </ion-avatar>
      <ion-card-title class="mb-4">{{ user.name }}</ion-card-title>

      <ion-button shape="round" fill="outline" color="primary" class="mb-4" @click="isOpen = true">
        <ion-icon slot="start" :icon="pencil"></ion-icon>
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

    <ion-modal :is-open="isOpen">
      <ion-header class="ion-no-border">
        <ion-toolbar>
          <ion-title>Modifica il profilo</ion-title>
          <ion-buttons slot="end">
            <ion-button @click="isOpen = false">
              <ion-icon :icon="closeOutline"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-list>
          <ion-item>
            <ion-label position="stacked">Email</ion-label>
            <ion-input placeholder="Email" ></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">Nome</ion-label>
            <ion-input placeholder="Nome"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">Cognome</ion-label>
            <ion-input placeholder="Cognome"></ion-input>
          </ion-item>
        </ion-list>

        <ion-button shape="round" color="primary" expand="block"> Salva </ion-button>
      </ion-content>
    </ion-modal>
  </div>
</template>

<script lang="ts" setup>
import {
  IonModal,
  IonTitle,
  IonButtons,
  IonInput,
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
import { mailOutline, callOutline, lockClosedOutline, pencil, closeOutline } from "ionicons/icons";
import { useProfileStore } from "@/store/profile";
import { onMounted, reactive, ref } from "vue";
import router from "@/router";

const profileStore = useProfileStore();

const user = reactive({
  name: "Mario Rossi",
  status: "Disponibile",
  email: "mario.rossi@example.com",
  phone: "+39 1234567890",
});

function onModifyProfile() {
  router.push("temp-profile");
}

const avatarUrl = ref(`https://robohash.org/${Math.random().toString(36).substring(7)}.png`);

const isOpen = ref(false);

onMounted(() => {
  profileStore.fetch();
});
</script>
