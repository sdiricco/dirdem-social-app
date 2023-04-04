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
      <SkeletonBroadcast v-for="i in 10" v-else-if="!broadcastStore.candidateBroadcasts.length && broadcastStore.isLoading && !refreshing" />
      <div v-else class="overflow-auto">
        <BroadcastCard class="my-2" v-for="broadcast in broadcastStore.candidateBroadcasts" :broadcast="broadcast" @click-join="onClickJoin(broadcast)">
          <ion-button fill="solid" expand="full" class="no-margin" @click="onClickJoin(broadcast)">Unisciti</ion-button>
        </BroadcastCard>
      </div>
      <ion-modal :is-open="modalOpen" css-class="modal-container">
        <ion-header class="ion-no-border pt-5">
          <ion-toolbar>
            <ion-title>Crea un broadcast</ion-title>
            <ion-buttons slot="end">
              <ion-button @click="modalOpen = false">
                <ion-icon :icon="closeOutline"></ion-icon>
              </ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="content-wrapper">
          <BroadcastForm />
        </ion-content>
        <ion-footer class="footer-height ion-no-border">
          <div class="mx-2">
            <ion-button shape="round" color="primary" expand="block" @click="onSubmitBCast"> Salva </ion-button>
          </div>
        </ion-footer>
      </ion-modal>
      <CreateNewBroadcastButton @click="modalOpen = true" />
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from "vue";
import { IonPage, IonModal, IonButton, IonHeader, IonContent, IonRefresher, IonRefresherContent, IonButtons, IonTitle, IonIcon, IonToolbar, IonFooter } from "@ionic/vue";
import { closeOutline } from "ionicons/icons";
import { onBeforeRouteUpdate } from "vue-router";
import { useBroadcastStore } from "@/store/broadcast";
import CreateNewBroadcastModal from "@/components/CreateNewBroadcastModal.vue";
import CreateNewBroadcastButton from "@/components/CreateNewBroadcastButton.vue";
import BroadcastForm from "@/components/BroadcastForm.vue";
import NoBroadcasts from "@/components/NoBroadcasts.vue";
import BroadcastCard from "@/components/BroadcastCard.vue";
import Header from "@/components/Header.vue";
import SkeletonBroadcast from "@/components/SkeletonBroadcast.vue";
import utilsFns from "@/functions/utils-fns";

const broadcastStore = useBroadcastStore();
const modalOpen = ref(false);
let refreshing = ref(false);


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
  refreshing.value = true;
  await broadcastStore.fetchCandidate()
  refreshing.value = false;
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

.content-wrapper {
  height: calc(100% - 56px - 56px - 3rem);
  overflow-y: auto;
}
</style>
