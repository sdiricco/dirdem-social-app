<template>
  <ion-page>
    <ion-content class="ion-padding">
    <ion-card class="ion-padding">
      <ion-card-header>
        <ion-card-title>Accedi</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <ion-item fill="outline" class="ion-margin-bottom">
          <ion-label position="floating">Email</ion-label>
          <ion-input placeholder="Enter email" v-model="authStore.email" ></ion-input>
        </ion-item >
        <ion-item fill="outline" class="ion-margin-bottom">
          <ion-label position="floating">Password</ion-label>
          <ion-input placeholder="Enter password" v-model="authStore.password" type="password"></ion-input>
        </ion-item>
        <ion-button size="large" expand="block" @click="authStore.signIn">Continua
          <ion-icon slot="end" :icon="arrowForwardSharp"></ion-icon>
        </ion-button>
        <div v-if="authStore.error" class="ion-text-start error-container">
          <ion-icon :icon="informationCircle" color="danger" size="small"></ion-icon>
          <ion-label class="ion-padding-left" color="danger" >{{ authStore.error?.message }}</ion-label>
        </div>
        <p class="mt64">Non hai un account? <router-link to="/registration">Registrati</router-link> </p>
      </ion-card-content>
    </ion-card>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import { IonContent, IonPage, IonItem, IonButton, IonLabel, IonInput, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonIcon } from "@ionic/vue";
import { arrowForwardSharp, informationCircle } from 'ionicons/icons';
import { useAuthStore } from "@/store/auth";
const authStore = useAuthStore();
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

.m64{
  margin-bottom: 64px;
}

.mt64{
  margin-top: 64px;
}
</style>
