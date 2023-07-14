<template>
  <ion-content class="ion-padding">
    <ion-card-header class="mt-5">
      <ion-card-title>Accedi</ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <ion-item fill="outline" class="ion-margin-bottom">
        <ion-label position="floating">Email</ion-label>
        <ion-input placeholder="Enter email" v-model="email"></ion-input>
      </ion-item>
      <ion-item fill="outline" class="ion-margin-bottom">
        <ion-label position="floating">Password</ion-label>
        <ion-input placeholder="Enter password" v-model="password" type="password"></ion-input>
      </ion-item>
      <ion-button size="large" expand="block" @click="() => emit('submit', { email, password })"
        >Continua
        <ion-icon slot="end" :icon="arrowForwardSharp"></ion-icon>
      </ion-button>
      <div v-if="error?.length" class="ion-text-start error-container">
        <ion-icon :icon="informationCircle" color="danger" size="small"></ion-icon>
        <ion-label class="ion-padding-left" color="danger">{{ error }}</ion-label>
      </div>
      <p>Non hai un account? <router-link to="/auth/registration">Registrati</router-link></p>
    </ion-card-content>
  </ion-content>
</template>

<script lang="ts" setup>
import { IonContent, IonItem, IonButton, IonLabel, IonInput, IonCardHeader, IonCardContent, IonCardTitle, IonIcon } from "@ionic/vue";
import { arrowForwardSharp, informationCircle } from "ionicons/icons";
import { ref } from "vue";

const { error } = defineProps(['error']);
const emit = defineEmits(['submit']);

const email = ref('');
const password = ref('');



</script>
