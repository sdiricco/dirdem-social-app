<!-- <template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-item-divider color="dark">
        <ion-label>User</ion-label>
      </ion-item-divider>
      <ion-list class="ion-padding">
        <ion-item>
          <ion-label>User</ion-label>
          <ion-select interface="action-sheet" placeholder="Select a user" v-model="selectedUser">
            <ion-select-option :value="user" v-for="user in users">{{ user.email }}</ion-select-option>
          </ion-select>
        </ion-item>
        <ion-item>
          <ion-label>Id: {{ selectedUser?.id }}</ion-label>
        </ion-item>
        <ion-item>
          <ion-label>email: {{ selectedUser?.email }}</ion-label>
        </ion-item>
      </ion-list>

      <ion-item-divider color="dark">
        <ion-label>Broadcasts</ion-label>
      </ion-item-divider>
      <ion-list class="ion-padding">
        <ion-item class="overflow-auto">
          <ion-button @click="getAllBroadcasts" fill="outline">Get All broadcasts</ion-button>
          <ion-button @click="getAllBroadcasts" fill="outline">Get Candidate Broadcast</ion-button>
        </ion-item>
        <ion-item class="mb-4">
          <ion-label>Broadcasts: {{ broadcasts.length }}</ion-label>
        </ion-item>
        <ion-accordion-group class="border">
          <ion-accordion :value="String(idx)" v-for="broadcast, idx in broadcasts">
            <ion-item slot="header">
              <ion-label>Title: {{ broadcast.content.title }}</ion-label>
            </ion-item>
            <div class="ion-padding overflow-auto" slot="content">
              <code>
                <div class="text-nowrap">Title: {{ broadcast.content.title }}</div>
                <div class="text-nowrap">Message: {{ broadcast.content.message }}</div>
                <div class="text-nowrap">ExpiresAt: {{ broadcast.expiresAt }}</div>
                <div class="text-nowrap">Location: {{ broadcast.location }}</div>
                <div class="text-nowrap">MaxDistanceKm: {{ broadcast.maxDistanceKm }}</div>
                <div class="text-nowrap">MaxUsers: {{ broadcast.maxUsers }}</div>
                <div class="text-nowrap">tag: {{ broadcast.tag }}</div>
              </code>
            </div>
          </ion-accordion>
        </ion-accordion-group>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive } from "vue";
import {
  IonAccordion,
  IonAccordionGroup,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonContent,
  IonItemGroup,
  IonItemDivider,
  IonHeader,
  IonModal,
  IonToolbar,
  IonButtons,
  IonFab,
  IonFabButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonTitle,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonCardSubtitle,
  IonList,
  IonFooter,
  IonSegment,
  IonSegmentButton,
} from "@ionic/vue";
import { add, star, mailOutline, arrowRedoOutline, closeOutline, locationOutline, timeOutline } from "ionicons/icons";
import { useAuthStore } from "@/store/auth";
import { useBroadcastStore } from "@/store/broadcast";
import BroadcastForm from "@/components/BroadcastForm.vue";
import { createClient } from "@supabase/supabase-js";

import client from "@/api/client";
import { supabaseUrl, supabaseKey, supabaseAdminKey } from "@/constants";
import api from "@/api/api";
import { IBcast } from "@/interfaces/bcast";
import { Console } from "console";
const clientAdmin = createClient(supabaseUrl, supabaseAdminKey);
const broadcastStore = useBroadcastStore();
const authStore = useAuthStore();
const modalOpen = ref(false);
const filter = ref("all");

async function onSubmitBCast() {
  await broadcastStore.create();
}

let users = ref([]);

let selectedUser = ref(null);
let broadcasts = ref([]);

async function listUsers() {
  const response = await clientAdmin.auth.admin.listUsers();
  users.value = response.data.users;
  console.log(users);
}

async function getAllBroadcasts() {
  broadcasts.value = await client.bcast.getAll() as any;
  console.log(broadcasts);
}

onMounted(async () => {
  await listUsers();
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
</style> -->
