<template>
  <ion-page>
    <ion-header>
      <HeaderChat />
    </ion-header>
    <ion-content>
      <ChatContainer/>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import { IonContent, IonHeader, IonPage } from "@ionic/vue";
import ChatContainer from "@/components/ChatContainer.vue";

import { useMessageStore } from "@/store/message";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import HeaderChat from "@/components/HeaderChat.vue";
const route = useRoute();
const messageStore = useMessageStore();

if (typeof route.params.id === "string") {
  messageStore.bcastId = route.params.id;
} 

onMounted(async () => {
  await messageStore.fetchMessages();
  messageStore.listenMessages();
});
</script>

<style scoped>
</style>
