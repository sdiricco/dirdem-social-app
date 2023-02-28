<template>
  <h1>Profilo</h1>
  <p>Location: {{ profileStore.userInfo?.location }}</p>
  <p>Tag: {{ profileStore.userInfo?.tag }}</p>
</template>

<script lang="ts" setup>
import { useProfileStore } from "@/store/profile";
import { onMounted } from "vue";
const profileStore = useProfileStore();

onMounted(async () => {
  await profileStore.fetch();
})
</script>
