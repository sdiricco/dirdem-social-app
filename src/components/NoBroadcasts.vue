<template>
  <div class="d-flex align-items-center justify-content-center h-100 p-4">
    <ion-text color="primary text-center">
      <h3>Nessun broadcast disponibile nelle vicinanze</h3>
      <ion-icon size="large" :icon="banOutline"></ion-icon>
      <p class="mt-4">Crea un nuovo broadcast o cambia i parametri di ricerca</p>
    </ion-text>
  </div>
</template>

<script lang="ts" setup>
import { IonText, IonIcon } from "@ionic/vue";
import { banOutline } from "ionicons/icons";
</script>
