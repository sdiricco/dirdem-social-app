<template>
  <ion-page>
    <ion-header>
      <SearchToolbar />
    </ion-header>

    <ion-content :fullscreen="true">
      <h1>Benvenuto {{ userEmail }}</h1>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import SearchToolbar from "@/components/SearchToolbar.vue";
import {supabaseProjectId} from "../constants"
import { IonContent, IonHeader, IonPage } from "@ionic/vue";

const userEmail = ref('')
/* IONIC COMPONENTS */
onMounted(()=>{
  const authKey = `sb-${supabaseProjectId}-auth-token`
  const userData = JSON.parse(localStorage.getItem(authKey) || "")
  userEmail.value = userData?.user?.email
  console.log("userData", userData)
})

</script>
