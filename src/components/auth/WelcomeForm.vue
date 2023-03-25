<template>
  <ion-content>
    <div class="vh-100 d-flex align-items-center justify-content-center">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-6">
            <div class="d-grid gap-2">
              <ion-button expand="block" size="large" color="dark" @click="router.push('/auth/login')">Accedi</ion-button>
              <ion-button expand="block" size="large" color="dark" @click="router.push('/auth/registration')">Registrati</ion-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ion-content>
</template>

<script lang="ts" setup>
import { IonContent, IonButton } from "@ionic/vue";
import router from "@/router";
</script>
