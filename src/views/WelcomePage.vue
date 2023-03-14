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
import {
  IonPage,
  IonContent,
  IonButton
} from "@ionic/vue";
import router from "@/router";
</script>

