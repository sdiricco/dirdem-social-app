<template>
  <ion-page>
    <NoBroadcasts v-if="!broadcastStore.candidateBroadcasts.length" />
    <div class="overflow-auto h-100">
      <BroadcastCard v-for="broadcast in broadcastStore.joinedBroadcasts" :broadcast="broadcast" @click-join="onClickJoin(broadcast)" />
    </div>
    <ion-modal :is-open="modalOpen">
      <CreateNewBroadcastModal @cancel="modalOpen = false" @save="onSubmitBCast" />
    </ion-modal>
    <CreateNewBroadcastButton @click="modalOpen = true" />
  </ion-page>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { IonPage, IonModal } from "@ionic/vue";
import { add, star, mailOutline, arrowRedoOutline, closeOutline, locationOutline, timeOutline } from "ionicons/icons";
import { useAuthStore } from "@/store/auth";
import { useBroadcastStore } from "@/store/broadcast";
import BroadcastForm from "@/components/BroadcastForm.vue";
import CreateNewBroadcastModal from "@/components/CreateNewBroadcastModal.vue";
import CreateNewBroadcastButton from "@/components/CreateNewBroadcastButton.vue";
import NoBroadcasts from "@/components/NoBroadcasts.vue";
import BroadcastCard from "@/components/BroadcastCard.vue";
const broadcastStore = useBroadcastStore();
const authStore = useAuthStore();
const modalOpen = ref(false);
const filter = ref("all");

async function onSubmitBCast() {
  await broadcastStore.create();
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
