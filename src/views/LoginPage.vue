<template>
  <ion-page>
    <LoginForm @submit="onLoginSumbit" :error="mainStore.apiErrorMessage"/>
  </ion-page>
</template>

<script lang="ts" setup>
import { IonPage } from "@ionic/vue";
import LoginForm from "@/components/LoginForm.vue";
import { useAuthStore } from "@/store/auth-store";
import { useMainStore } from "@/store/main-store";

const authStore = useAuthStore();
const mainStore = useMainStore();


const onLoginSumbit = async ({ email, password }: { email: string, password: string }) => {
    await authStore.signIn(email, password);
}
</script>

