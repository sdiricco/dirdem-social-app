<!-- <template>
  <ion-list lines="inset" class="overflow-auto">
    <ion-item>
      <ion-label position="stacked">Titolo</ion-label>
      <ion-input v-model="broadcastStore.tempBroadcast.content.title"></ion-input>
    </ion-item>
    <ion-item>
      <ion-label position="stacked">Contenuto</ion-label>
      <ion-input v-model="broadcastStore.tempBroadcast.content.message"></ion-input>
    </ion-item>
    <ion-item>
      <ion-label position="stacked">Data di scadenza: {{ broadcastStore.tempBroadcast.expiresAt.toISOString() }}</ion-label>
      <ion-datetime
        color="secondary"
        presentation="date-time"
        :prefer-wheel="true"
        :value="broadcastStore.tempBroadcast.expiresAt.toISOString()"
        @ion-change="onChangeDate"></ion-datetime>
    </ion-item>
    <ion-item>
      <ion-label position="stacked">Latitudine</ion-label>
      <ion-input type="number" v-model="broadcastStore.tempBroadcast.location.lat"></ion-input>
    </ion-item>
    <ion-item>
      <ion-label position="stacked">Longitudine</ion-label>
      <ion-input type="number" v-model="broadcastStore.tempBroadcast.location.lng"></ion-input>
    </ion-item>
    <ion-item>
      <ion-label position="stacked">Distanza massima</ion-label>
      <ion-input type="number" v-model="broadcastStore.tempBroadcast.maxDistanceKm"></ion-input>
    </ion-item>
    <ion-item>
      <ion-label position="stacked">Utenti Massimi</ion-label>
      <ion-input type="number" v-model="broadcastStore.tempBroadcast.maxUsers"></ion-input>
    </ion-item>
    <ion-item class="ion-margin-bottom">
      <ion-label position="stacked">Tag</ion-label>
      <ion-input v-model="broadcastStore.tempTag" placeholder="Aggingi tag" @keyup.enter="addTag" @keyup.space.prevent="addTag"> </ion-input>
      <ion-button fill="clear" slot="end" size="large" @click="addTag">
        <ion-icon :icon="addCircleOutline"></ion-icon>
      </ion-button>
    </ion-item>
    <div class="mx-2">
      <ion-chip v-for="(tag, index) in broadcastStore.tempBroadcast.tag" :key="index" :outline="true">
      <ion-label>{{ tag }}</ion-label>
      <ion-icon :icon="closeCircleOutline" @click="removeTag(index)"></ion-icon>
    </ion-chip>
    </div>

  </ion-list>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import { IonItem, IonLabel, IonInput, IonDatetime, IonList, IonTextarea, IonButton, IonGrid, IonCol, IonRow, IonChip, IonIcon } from "@ionic/vue";
import { closeCircleOutline, addCircleOutline } from "ionicons/icons";

import { useBroadcastStore } from "@/store/broadcast";
import { getCurrentPosition } from "@/functions/geolocalization";
const broadcastStore = useBroadcastStore();

function onChangeDate(evt: any) {
  const date = evt.target.value;
  broadcastStore.tempBroadcast.expiresAt = new Date(date);
}

function addTag() {
  if (broadcastStore.tempTag) {
    broadcastStore.tempBroadcast.tag.push(broadcastStore.tempTag);
    broadcastStore.tempTag = '';
  }
};

function removeTag(index: number) {
  broadcastStore.tempBroadcast.tag.splice(index, 1);
};

onMounted(async () => {
  const currentPosition = await getCurrentPosition();
  broadcastStore.tempBroadcast.location.lat = currentPosition.coords.latitude;
  broadcastStore.tempBroadcast.location.lng = currentPosition.coords.longitude;
});
</script>

<style scoped></style> -->
