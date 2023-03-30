<template>
  <ion-page>
    <ion-header>
      <Header show-back-button/>
    </ion-header>
    <ion-content>
      <ProfileForm />
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import {IonPage, IonHeader, IonContent} from "@ionic/vue";
import ProfileForm from "@/components/ProfileForm.vue"
import Header from "@/components/Header.vue";
</script>
