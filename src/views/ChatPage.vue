<template>
  <div class="chat-container" >
    <div class="chat-header ion-padding border">
      <div>{{ `bcastId: ${messageStore.bcastId}` }}</div>
    </div>
    <div class="chat-messages ion-padding" ref="chatContainer">
      <div v-for="message in messageStore.messages" class="chat-message mb-2 bg-light" :class="{ 'my-message': message.userId === messageStore.getUserId }">
        <div class="content border rounded">
          <ion-card-content>
            {{ message.content }}
          </ion-card-content>
        </div>
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
import { ref, onMounted, onBeforeUnmount, onUpdated, nextTick, watch } from "vue";

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

watch(() => messageStore.messages, (newValue, oldValue) => {
  scrollToBottom();
}, {deep:true});

onMounted(async () => {
  await messageStore.fetchMessages();
  if (!messageStore.getUserId) {
    return;
  }
  messageStore.listenMessages();
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

.chat-message.my-message{
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
