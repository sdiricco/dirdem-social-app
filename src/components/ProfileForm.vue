<template>
  <div class="p-4">
    <div class="d-flex flex-column justify-content-center align-items-center pb-4">
      <ion-avatar class="mb-4 border">
        <img :src="avatarUrl" />
      </ion-avatar>
      <ion-card-title class="mb-4">{{ user.name }}</ion-card-title>

      <ion-button shape="round" fill="outline" color="primary" class="mb-4" @click="isOpen = true">
        <ion-icon slot="start" :icon="pencil"></ion-icon>
        Modifica Profilo
      </ion-button>
    </div>

    <ion-list>
      <ion-item lines="none">
        <ion-icon slot="start" :icon="mailOutline"></ion-icon>
        <ion-label>
          <h3>Email</h3>
          <p>{{ profileStore.email }}</p>
        </ion-label>
      </ion-item>
      <ion-item lines="none">
        <ion-icon slot="start" :icon="arrowRedoOutline"> </ion-icon>
        <ion-label>
          <h3>Broadcast in uscita</h3>
          <p>{{ profileStore?.userInfo?.bcast?.toSend || 0 }}</p>
        </ion-label>
      </ion-item>
      <ion-item lines="none">
        <ion-icon slot="start" :icon="arrowUndoOutline"> </ion-icon>
        <ion-label>
          <h3>Broadcast in entrata</h3>
          <p>{{ profileStore?.userInfo?.bcast?.toGet || 0 }}</p>
        </ion-label>
      </ion-item>
      <ion-item lines="none">
        <ion-icon slot="start" :icon="bookmarkOutline"> </ion-icon>
        <ion-label>
          <h3>Interessi</h3>
          <p>{{ profileStore?.userInfo?.tag || [] }}</p>
        </ion-label>
      </ion-item>
    </ion-list>

    <ion-modal :is-open="isOpen">
      <ion-header class="ion-no-border pt-5">
        <ion-toolbar>
          <ion-title>Modifica il profilo</ion-title>
          <ion-buttons slot="end">
            <ion-button @click="isOpen = false">
              <ion-icon :icon="closeOutline"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-list>
          <ion-item class="ion-margin-bottom">
            <ion-label position="stacked">Tag</ion-label>
            <ion-input v-model="inputText" placeholder="Aggingi tag" @keyup.enter="addTag" @keyup.space.prevent="addTag"> </ion-input>
            <ion-button fill="clear" slot="end" size="large" @click="addTag"> 
              <ion-icon :icon="addCircleOutline"></ion-icon>
            </ion-button>
          </ion-item>
          <ion-chip v-for="(tag, index) in profileStore.tempUserInfo.tag" :key="index" :outline="true">
            <ion-label>{{ tag }}</ion-label>
            <ion-icon :icon="closeCircleOutline" @click="removeTag(index)"></ion-icon>
          </ion-chip>
        </ion-list>

      </ion-content>
      <ion-footer class="footer-height ion-no-border">
        <div class="mx-2">
          <ion-button shape="round" color="primary" expand="block" @click="onClickSave"> Salva </ion-button>
        </div>
      </ion-footer>
    </ion-modal>
  </div>
</template>

<script lang="ts" setup>
import {
  IonPage,
  IonModal,
  IonTitle,
  IonButtons,
  IonInput,
  IonHeader,
  IonToolbar,
  IonContent,
  IonIcon,
  IonLabel,
  IonToggle,
  IonItem,
  IonList,
  IonCardContent,
  IonButton,
  IonCard,
  IonCardHeader,
  IonAvatar,
  IonCardTitle,
  IonCardSubtitle,
  IonFooter,
  IonChip
} from "@ionic/vue";
import {
  mailOutline,
  callOutline,
  lockClosedOutline,
  pencil,
  closeOutline,
  sendOutline,
  arrowRedoOutline,
  arrowUndoOutline,
  bookmarkOutline,
  closeCircleOutline,
  addCircleOutline
} from "ionicons/icons";
import { onMounted, reactive, ref } from "vue";
import { useProfileStore } from "@/store/profile";
import router from "@/router";

const profileStore = useProfileStore();

const inputText = ref('');

const user = reactive({
  name: "Mario Rossi",
  status: "Disponibile",
  email: "mario.rossi@example.com",
  phone: "+39 1234567890",
});

function onModifyProfile() {
  router.push("temp-profile");
}

function addTag() {
  if (inputText.value) {
    profileStore.tempUserInfo.tag.push(inputText.value);
    inputText.value = '';
  }
};

function removeTag(index: number) {
  profileStore.tempUserInfo.tag.splice(index, 1);
};

async function onClickSave() {
  await profileStore.update();
  isOpen.value = false;
  await profileStore.fetch()
}

const avatarUrl = ref(`https://robohash.org/${Math.random().toString(36).substring(7)}.png`);

const isOpen = ref(false);

onMounted(async () => {
  await profileStore.fetch();
  console.log(profileStore.userInfo);
});
</script>


<style scoped>
ion-content{
  height: calc(100% - 56px - 56px - 3rem);
  overflow-y: auto;
}
.footer-height{
  height: 56px;
}
</style>