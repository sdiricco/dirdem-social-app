<template>
  <ion-page>
    <ion-header>
      <Header show-menu-button />
    </ion-header>
    <ion-content>
      <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <NoBroadcasts v-if="!broadcastStore.candidateBroadcasts.length && !broadcastStore.isLoading" />
      <SkeletonBroadcast v-for="i in 10" v-else-if="!broadcastStore.candidateBroadcasts.length && broadcastStore.isLoading" />
      <div v-else class="overflow-auto">
        <BroadcastCard class="my-2" v-for="broadcast in broadcastStore.candidateBroadcasts" :broadcast="broadcast" @click-join="onClickJoin(broadcast)">
          <ion-button fill="solid" expand="full" class="no-margin" @click="onClickJoin(broadcast)">Unisciti</ion-button>
        </BroadcastCard>
      </div>
      <ion-modal :is-open="modalOpen" css-class="modal-container">
        <CreateNewBroadcastModal @cancel="modalOpen = false" @save="onSubmitBCast" />
      </ion-modal>
      <CreateNewBroadcastButton @click="modalOpen = true" />
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from "vue";
import { IonPage, IonModal, IonButton, IonHeader, IonContent, IonRefresher, IonRefresherContent } from "@ionic/vue";
import { onBeforeRouteUpdate } from "vue-router";
import { useBroadcastStore } from "@/store/broadcast";
import CreateNewBroadcastModal from "@/components/CreateNewBroadcastModal.vue";
import CreateNewBroadcastButton from "@/components/CreateNewBroadcastButton.vue";
import NoBroadcasts from "@/components/NoBroadcasts.vue";
import BroadcastCard from "@/components/BroadcastCard.vue";
import Header from "@/components/Header.vue";
import SkeletonBroadcast from "@/components/SkeletonBroadcast.vue";
import utilsFns from "@/functions/utils-fns";

const broadcastStore = useBroadcastStore();
const modalOpen = ref(false);

async function onSubmitBCast() {
  await broadcastStore.create();
  await broadcastStore.fetchCandidate();
  await broadcastStore.fetchJoined();
  await broadcastStore.fetchInserted();
  modalOpen.value = false;
}

async function onClickJoin(bcast: any) {
  await broadcastStore.join(bcast?.id);
}

async function handleRefresh(evt:any){
  console.log('refreshing...');
  await broadcastStore.fetchCandidate()
  evt.target.complete();
  
}

onMounted(async () => {
  console.log("[HO MONTATO CANDIDATE BROADCAST PAGE]");
  await broadcastStore.fetchCandidate()
});

onUnmounted(() => {
  console.log("STO SMONTANDO CANDIDATE BROADCAST PAGE");
});
</script>

<style scoped>
.no-padding {
  padding: 0px !important;
}

.no-margin {
  margin: 0px !important;
}

ion-segment {
  --background: #efefef;
}
</style>
