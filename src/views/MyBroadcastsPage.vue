<template>
  <ion-page>
    <NoBroadcasts v-if="!broadcastStore.candidateBroadcasts.length" />
    <BroadcastCard v-for="broadcast in broadcastStore.joinedBroadcasts" :broadcast="broadcast" @click-join="onClickJoin(broadcast)" />
  </ion-page>
</template>

<script lang="ts" setup>
/**************************************************/
/* IMPORTS */
/**************************************************/
import {IonPage} from "@ionic/vue";
import NoBroadcasts from "@/components/NoBroadcasts.vue";
import BroadcastCard from "@/components/BroadcastCard.vue";
import { onMounted } from "vue";
import { useBroadcastStore } from "@/store/broadcast";
import {useMessageStore} from "@/store/message"
import router from "@/router";

/**************************************************/
/* COMPONENT VARIABLES */
/**************************************************/
const broadcastStore = useBroadcastStore();
const messageStore = useMessageStore();

/**************************************************/
/* COMPONENT FUNCTIONS */
/**************************************************/
async function onClickJoin(broadcast:any){
  await broadcastStore.join(broadcast.id)
  messageStore.bcastId = broadcast.id
  router.push('/home/chat-page')
}

/**************************************************/
/* COMPONENT HOOKS */
/**************************************************/
onMounted(async () => {
  await broadcastStore.fetchCandidate();
  await broadcastStore.fetchJoined();
});
</script>
