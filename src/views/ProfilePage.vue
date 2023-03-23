<template>
  <ion-page>
    <ion-header>
      <HeaderChat />
    </ion-header>
    <ion-content>
      <ProfileForm />
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import {IonPage, IonHeader, IonContent} from "@ionic/vue";
import ProfileForm from "@/components/ProfileForm.vue"
import HeaderChat from "@/components/HeaderChat.vue";
</script>
