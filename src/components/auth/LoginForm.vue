<template>
  <ion-content class="ion-padding">
    <ion-card-header class="mt-5">
      <ion-card-title>Accedi</ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <ion-item fill="outline" class="ion-margin-bottom" :disabled="authStore.isLoading">
        <ion-label position="floating">Email</ion-label>
        <ion-input placeholder="Enter email" v-model="authStore.email"></ion-input>
      </ion-item>
      <ion-item fill="outline" class="ion-margin-bottom" :disabled="authStore.isLoading">
        <ion-label position="floating">Password</ion-label>
        <ion-input placeholder="Enter password" v-model="authStore.password" type="password"></ion-input>
      </ion-item>
      <ion-button size="large" expand="block" @click="authStore.signIn">
        <template v-if="!authStore.isLoading">
          Continua
          <ion-icon slot="end" :icon="arrowForwardSharp"></ion-icon>
        </template>
        <ion-spinner v-else name="lines"></ion-spinner>

      </ion-button>
      <div v-if="authStore.error" class="ion-text-start error-container">
        <ion-icon :icon="informationCircle" color="danger" size="small"></ion-icon>
        <ion-label class="ion-padding-left" color="danger">{{ authStore.error?.message }}</ion-label>
      </div>
      <p>Non hai un account? <router-link to="/auth/registration">Registrati</router-link></p>
    </ion-card-content>
  </ion-content>
</template>

<script lang="ts" setup>
import { IonContent, IonItem, IonButton, IonLabel, IonInput, IonCardHeader, IonCardContent, IonCardTitle, IonIcon, IonSpinner } from "@ionic/vue";
import { arrowForwardSharp, informationCircle } from "ionicons/icons";
import { useAuthStore } from "@/store/auth";
import { onMounted } from "vue";
const authStore = useAuthStore();
onMounted(() => {
  authStore.$reset();
});
</script>
