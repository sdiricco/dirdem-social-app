<template>
  <ion-content class="ion-padding">
    <ion-card-header class="mt-5">
      <ion-card-title>Registrati</ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <ion-item fill="outline" class="ion-margin-bottom">
        <ion-label position="floating">Email</ion-label>
        <ion-input placeholder="Enter email" v-model="authStore.email"></ion-input>
      </ion-item>
      <ion-item fill="outline" class="ion-margin-bottom">
        <ion-label position="floating">Password</ion-label>
        <ion-input placeholder="Enter password" v-model="authStore.password" type="password"></ion-input>
      </ion-item>
      <ion-button size="large" expand="block" @click="authStore.signUp"
        >Procedi
        <ion-icon slot="end" :icon="arrowForwardSharp"></ion-icon>
      </ion-button>
      <div v-if="authStore.error" class="ion-text-start">
        <ion-icon :icon="informationCircle" color="danger" size="small"></ion-icon>
        <ion-label class="ion-padding-left" color="danger">{{ authStore.error.message }}</ion-label>
      </div>
      <p class="mt64">Hai già un account? <router-link to="/auth/login">Accedi</router-link></p>
    </ion-card-content>
  </ion-content>
</template>

<script lang="ts" setup>
import { IonContent, IonItem, IonButton, IonLabel, IonInput, IonCardHeader, IonCardContent, IonCardTitle, IonIcon } from "@ionic/vue";
import { arrowForwardSharp, informationCircle } from "ionicons/icons";
import { useAuthStore } from "@/store/auth";
import { onMounted } from "vue";
const authStore = useAuthStore();
onMounted(() => {
  authStore.$reset();
});
</script>
