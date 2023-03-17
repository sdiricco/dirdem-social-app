<template>
  <div class="chat-container">
    <div class="chat-header ion-padding border">
      <div>{{ otherUser.name }}</div>
      <div>{{ `bcastId: ${messageStore.bcastId}` }}</div>
    </div>
    <div class="chat-messages ion-padding">
      <div v-for="message in messageStore.messages" class="chat-message" :class="{ 'my-message': message.userId === messageStore.getUserId }">
        <ion-card>
          <ion-card-content>
            {{ message.content }}
          </ion-card-content>
        </ion-card>
      </div>
    </div>
    <div class="chat-form ion-padding border">
      <ion-input type="text" placeholder="Type a message..." v-model="messageStore.tempMessage"></ion-input>
      <ion-button expand="block" @click="messageStore.sendMessage">Send</ion-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import SearchToolbar from "@/components/SearchToolbar.vue";
import { IonContent, IonHeader, IonPage, IonInput, IonButton, IonCard, IonCardContent } from "@ionic/vue";
import { useMessageStore } from "@/store/message";
import { ref, onMounted, onBeforeUnmount } from "vue";
import client from "@/api/client";

const messageStore = useMessageStore();

const otherUser = ref({
  name: "otherUser",
});

const user = ref({
  id: "sjasjamma",
});

onMounted(async () => {
  await messageStore.fetchMessages();
  if (!messageStore.getUserId) {
    return;
  }
  console.log("[Listen messages]");

  client.message.onInsert(messageStore.bcastId, (payload) => {
    console.log("New message", payload);
  });
});
</script>

<style scoped>
.chat-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.chat-header ion-avatar {
  margin-right: 12px;
}

.chat-header ion-label {
  font-size: 18px;
  font-weight: bold;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
}

.chat-message {
  margin-bottom: 8px;
}

.my-message ion-card {
  --background: #03a9f4;
  color: #fff;
  align-self: flex-end;
}

.chat-form ion-input {
  flex: 1;
  margin-right: 8px;
}

.chat-form ion-button {
  width: 100px;
}
</style>
