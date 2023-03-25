<template>
  <ion-page>
    <ion-header>
      <HeaderLarge />
    </ion-header>
    <ion-content>
      <NoBroadcasts v-if="!broadcastStore.candidateBroadcasts.length" />
      <div class="overflow-auto">
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
import { ref, onMounted } from "vue";
import { IonPage, IonModal, IonButton, IonHeader, IonContent } from "@ionic/vue";
import { add, star, mailOutline, arrowRedoOutline, closeOutline, locationOutline, timeOutline } from "ionicons/icons";
import { useAuthStore } from "@/store/auth";
import { useBroadcastStore } from "@/store/broadcast";
import BroadcastForm from "@/components/BroadcastForm.vue";
import CreateNewBroadcastModal from "@/components/CreateNewBroadcastModal.vue";
import CreateNewBroadcastButton from "@/components/CreateNewBroadcastButton.vue";
import NoBroadcasts from "@/components/NoBroadcasts.vue";
import BroadcastCard from "@/components/BroadcastCard.vue";
import HeaderLarge from "@/components/HeaderLarge.vue";
import router from "@/router";
const broadcastStore = useBroadcastStore();
const authStore = useAuthStore();
const modalOpen = ref(false);
const filter = ref("all");

async function onSubmitBCast() {
  await broadcastStore.create();
  modalOpen.value = false;
  await broadcastStore.fetchCandidate();
  await broadcastStore.fetchJoined();
  await broadcastStore.fetchInserted();
}

async function onClickJoin(bcast: any) {
  console.log("join", bcast?.id);
  await broadcastStore.join(bcast?.id);
}

onMounted(async () => {
  await broadcastStore.fetchCandidate();
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
