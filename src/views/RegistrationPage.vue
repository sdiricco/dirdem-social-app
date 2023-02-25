<template>
  <ion-page>
    <ion-content class="ion-padding">
    <ion-card class="ion-padding">
      <ion-card-header>
        <ion-card-title>Registrati</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <ion-item fill="outline" class="ion-margin-bottom">
          <ion-label position="floating">Email</ion-label>
          <ion-input placeholder="Enter email" v-model="email" ></ion-input>
        </ion-item >
        <ion-item fill="outline" class="ion-margin-bottom">
          <ion-label position="floating">Password</ion-label>
          <ion-input placeholder="Enter password" v-model="password" type="password"></ion-input>
        </ion-item>
        <ion-button size="large" expand="block" @click="onSignUp">Procedi
          <ion-icon slot="end" :icon="arrowForwardSharp"></ion-icon>
        </ion-button>
        <div v-if="loginErrorMessage" class="ion-text-start error-container">
          <ion-icon :icon="informationCircle" color="danger" size="small"></ion-icon>
          <ion-label class="ion-padding-left" color="danger" >{{ loginErrorMessage }}</ion-label>
        </div>
        <p class="mt64">Hai già un account? <router-link to="/login">Accedi</router-link> </p>
      </ion-card-content>
    </ion-card>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import { IonContent, IonPage, IonItem, IonButton, IonLabel, IonInput, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonIcon } from "@ionic/vue";
import { arrowForwardSharp, informationCircle } from 'ionicons/icons';
import { ref } from "vue";
import router from "../router/index"

import * as authApi from "../api/auth"
import { ApiError } from "@/api/errorHandler";

const email = ref('');
const password = ref('');
const loginErrorMessage = ref('');


async function onSignUp(){
  try {
    await authApi.signUp({
      email:email.value,
      password:password.value
    })
    router.push('/home')
  } catch (error:any) {
    if (error instanceof ApiError) {
      loginErrorMessage.value = error.message
    }else{
      alert(`[UNKNOWN ERROR]: ${error.message}`)
    }
  }
}

</script>

<style scoped>
ion-card{
    margin:auto;
    height: 100%;
    display: flex;
    flex-direction: column;
    box-shadow: none;
    text-align: center;
}

ion-card-header{
    margin-top: auto;
}

ion-card-content{
    padding-bottom: 20vh;
    margin-bottom: auto;
}

.error-container{
  display: flex;
  align-items: center;
}


.mt64{
  margin-top: 64px;
}
</style>
