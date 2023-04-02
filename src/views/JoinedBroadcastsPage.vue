<template>
  <ion-page>
    <ion-header>
      <Header show-menu-button />
    </ion-header>
    <ion-content>
      <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <NoBroadcasts v-if="!broadcastStore.getJoinedAndInsertedBroadcasts.length && !broadcastStore.isLoading" />
      <SkeletonBroadcast v-for="i in 10" v-else-if="!broadcastStore.candidateBroadcasts.length && broadcastStore.isLoading && !refreshing" />
      <BroadcastCard v-else
        class="my-2"
        v-for="broadcast in broadcastStore.getJoinedAndInsertedBroadcasts"
        :broadcast="broadcast"
        @click-join="onClickJoin(broadcast)">
        <ion-button fill="solid" expand="full" :style="{ margin: '0px' }" class="no-margin" @click="router.push(`/home/joined-broadcasts/${broadcast.id}`)"
          >Chat</ion-button
        >
      </BroadcastCard>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
/**************************************************/
/* IMPORTS */
/**************************************************/
import { IonPage, IonButton, IonHeader, IonContent, IonRefresher, IonRefresherContent } from "@ionic/vue";
import NoBroadcasts from "@/components/NoBroadcasts.vue";
import BroadcastCard from "@/components/BroadcastCard.vue";
import SkeletonBroadcast from "@/components/SkeletonBroadcast.vue";

import Header from "@/components/Header.vue";
import { onMounted, ref } from "vue";
import { useBroadcastStore } from "@/store/broadcast";
import { useMessageStore } from "@/store/message";
import router from "@/router";

/**************************************************/
/* COMPONENT VARIABLES */
/**************************************************/
const broadcastStore = useBroadcastStore();
const messageStore = useMessageStore();

let refreshing = ref(false)

/**************************************************/
/* COMPONENT FUNCTIONS */
/**************************************************/
async function onClickJoin(broadcast: any) {
  await broadcastStore.join(broadcast.id);
  messageStore.bcastId = broadcast.id;
  router.push("/home/chat-page");
}

async function handleRefresh(evt:any){
  refreshing.value = true;
  await broadcastStore.fetchCandidate()
  refreshing.value = false;
  evt.target.complete();
  
}

/**************************************************/
/* COMPONENT HOOKS */
/**************************************************/
onMounted(async () => {
  await broadcastStore.fetchJoined();
  await broadcastStore.fetchInserted();
});
</script>

<style scoped>
ion-button {
  --box-shadow: none;
}
</style>
