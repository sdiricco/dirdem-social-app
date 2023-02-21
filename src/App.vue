<template>
  <ion-app>
    <ion-menu content-id="main-content">
      <sider-bar></sider-bar>
    </ion-menu>
    <ion-page id="main-content">
      <ion-router-outlet />
    </ion-page>
  </ion-app>
</template>

<script lang="ts" setup>
import { IonApp, IonRouterOutlet, IonPage, IonMenu } from "@ionic/vue";
import  SiderBar from './components/SideBar.vue'
import { onMounted } from "vue";
import { useStore } from "@/store/main";


const store = useStore();
onMounted(async () => {
  await store.loadApp();
  store.$subscribe(async (_mutations, state) => {
    await store.savePreferences(state.preferences);
  });
});
</script>

<style>
@import './main.css'
</style>
