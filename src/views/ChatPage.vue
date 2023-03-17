<template>
  <div class="chat-container">
    <div class="chat-header ion-padding">
      <ion-avatar slot="start">
      </ion-avatar>
      <ion-label>{{ otherUser.name }}</ion-label>
    </div>
    <div class="chat-messages ion-padding">
      <div v-for="message in messages" :key="message.id" class="chat-message" :class="{ 'my-message': message.senderId === user.id }">
        <ion-card>
          <ion-card-content>
            {{ message.text }}
          </ion-card-content>
        </ion-card>
      </div>
    </div>
    <form class="chat-form ion-padding">
      <ion-input type="text" placeholder="Type a message..."></ion-input>
      <ion-button expand="block" type="submit">Send</ion-button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import SearchToolbar from "@/components/SearchToolbar.vue";
import { IonContent, IonHeader, IonPage } from "@ionic/vue";
import { useMainStore } from "@/store";
import { ref } from "vue";

const messages = ref([
  {
    id: 'ndddwndwndkwd',
    text: 'my bellissimo text',
    senderId: 'senderId',
  }
])

const otherUser = ref({
  name: 'otherUser',

})

const user = ref({
  id: 'sjasjamma' 
})

const store = useMainStore();


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
