<template>
  <div>
    My broadcasts {{  }}
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import {} from "@ionic/vue";
import {} from "ionicons/icons";
import { useBroadcastStore } from "@/store/broadcast";
const broadcastStore = useBroadcastStore();

onMounted(async () => {
  await broadcastStore.fetchMyBroadcasts();
});
</script>

