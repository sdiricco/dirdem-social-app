<template>
  <h1>Profile</h1>
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
