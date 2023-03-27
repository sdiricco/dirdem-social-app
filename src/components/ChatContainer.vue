<template>
  <div class="chat-container">
    <div class="chat-header ion-padding border">
      <div>{{ `bcastId: ${messageStore.bcastId}` }}</div>
    </div>
    <div class="chat-messages ion-padding" ref="chatContainer">
      <div
        v-for="message in messageStore.messages"
        class="chat-message mb-2 bg-light"
        :class="{ 'my-message': message.userId === messageStore.getUserId || message.user_id === messageStore.getUserId }">
        <div class="content border rounded">
          <ion-card-content>
            {{ message.content }}
          </ion-card-content>
        </div>
      </div>
    </div>
    <div class="chat-form border-top">
      <ion-item lines="none">
        <ion-input type="text" placeholder="Type a message..." v-model="messageStore.tempMessage"></ion-input>
        <ion-button fill="clear" @click="messageStore.sendMessage">
          <ion-icon :icon="send"></ion-icon>
        </ion-button>
      </ion-item>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IonInput, IonButton, IonCardContent, IonItem, IonIcon } from "@ionic/vue";
import { send } from "ionicons/icons";

import { useMessageStore } from "@/store/message";
import { ref, onMounted, onUpdated, watch } from "vue";
const messageStore = useMessageStore();

const chatContainer = ref<HTMLDivElement | null>(null);

function scrollToBottom() {
  if (chatContainer.value) {
    setTimeout(() => {
      chatContainer.value!.scrollTop = chatContainer.value!.scrollHeight;
    }, 100);
  }
}

onUpdated(() => {
  scrollToBottom();
});

watch(
  () => messageStore.messages,
  (newValue, oldValue) => {
    scrollToBottom();
  },
  { deep: true }
);

onMounted(async () => {
  scrollToBottom();
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
  display: flex;
  flex-direction: column;
}

.chat-message {
  width: 80%;
}

.chat-message.my-message {
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
