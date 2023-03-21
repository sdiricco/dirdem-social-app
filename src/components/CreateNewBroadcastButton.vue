<template>
  <ion-fab slot="fixed" vertical="bottom" horizontal="end">
    <ion-fab-button @click="emit('click')">
      <ion-icon :icon="add"></ion-icon>
    </ion-fab-button>
  </ion-fab>
</template>

<script lang="ts" setup>
import { ref, defineEmits } from "vue";
import {
  IonFab,
  IonFabButton,
  IonIcon
} from "@ionic/vue";
import { add } from "ionicons/icons";
const emit = defineEmits(['click'])

</script>

<style scoped></style>
