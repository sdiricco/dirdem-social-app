<template>
  <ion-page>
    <ion-header>
      <HeaderLarge />
    </ion-header>
    <ion-content>
      <NoBroadcasts v-if="!broadcastStore.getJoinedAndInsertedBroadcasts.length" />
      <BroadcastCard v-for="broadcast in broadcastStore.getJoinedAndInsertedBroadcasts" :broadcast="broadcast" @click-join="onClickJoin(broadcast)">
        <ion-button fill="solid" expand="full" class="no-margin" @click="router.push(`/home/joined-broadcasts/${broadcast.id}`)">Chat</ion-button>
      </BroadcastCard>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
/**************************************************/
/* IMPORTS */
/**************************************************/
import { IonPage, IonButton, IonHeader, IonContent } from "@ionic/vue";
import NoBroadcasts from "@/components/NoBroadcasts.vue";
import BroadcastCard from "@/components/BroadcastCard.vue";
import HeaderLarge from "@/components/HeaderLarge.vue";
import { onMounted } from "vue";
import { useBroadcastStore } from "@/store/broadcast";
import { useMessageStore } from "@/store/message";
import router from "@/router";

/**************************************************/
/* COMPONENT VARIABLES */
/**************************************************/
const broadcastStore = useBroadcastStore();
const messageStore = useMessageStore();

/**************************************************/
/* COMPONENT FUNCTIONS */
/**************************************************/
async function onClickJoin(broadcast: any) {
  await broadcastStore.join(broadcast.id);
  messageStore.bcastId = broadcast.id;
  router.push("/home/chat-page");
}

/**************************************************/
/* COMPONENT HOOKS */
/**************************************************/
onMounted(async () => {
  await broadcastStore.fetchJoined();
  await broadcastStore.fetchInserted();
});
</script>
