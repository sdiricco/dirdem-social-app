<template>
  <ion-page>
    <ion-header>
      <SearchToolbar />
    </ion-header>

    <ion-content :fullscreen="true">
      <h1>Benvenuto</h1>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import SearchToolbar from "@/components/SearchToolbar.vue";
import {supabaseProjectId} from "../constants"
import { IonContent, IonHeader, IonPage } from "@ionic/vue";

const authKey = `sb-${supabaseProjectId}-auth-token`

/* IONIC COMPONENTS */
onMounted(()=>{
  const userData = localStorage.getItem('sb-jfrwlzogdrutdwdsqpub-auth-token')
  console.log("userData", userData)
})

</script>
