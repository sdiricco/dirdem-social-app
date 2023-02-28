<template>
  <ion-page>
    <ion-header>
      <SearchToolbar />
    </ion-header>

    <ion-content :fullscreen="true">
      <router-view></router-view>
      
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import SearchToolbar from "@/components/SearchToolbar.vue";
import { IonContent, IonHeader, IonPage } from "@ionic/vue";
import { useStore } from "@/store/store";
import { supabaseProjectId } from "@/constants/constants";
import { onMounted } from "vue";

const store = useStore();


onMounted(async () => {
  const authKey = `sb-${supabaseProjectId}-auth-token`;
  const userData = JSON.parse(localStorage.getItem(authKey) || "");
  store.user.email = userData?.user?.email;
  store.user.id = userData?.user?.id;
  console.log("userData", userData);

});
</script>
