<template>
  <h1>Profilo</h1>
  <ion-button @click="submitProfile">submit profile</ion-button>
  <ion-button @click="getProfile">get profile</ion-button>
</template>

<script lang="ts" setup>
import { IonButton } from "@ionic/vue";
import { onMounted } from "vue";
import { dbUtility } from "../main";

import { useStore } from "@/store/main";


const store = useStore();

async function submitProfile() {
  const response = await dbUtility.userInfo.insert(store.user.id)({ bcast: { toGet: 10, toSend: 100 }, location: { lat: 11.11, lng: 22.22 }, tag: ["sport", "trekking", "sex", "mioTag"] });
  console.log(response);
}

async function getProfile(){
    const response = await dbUtility.userInfo.get(store.user.id)
    console.log(response);
}

onMounted(async () => {

    console.log('email', store.user.email)
    console.log('id', store.user.id)
});
</script>
