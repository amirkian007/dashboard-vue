<script lang="ts" setup>
import Sidebar from "@/components/organism/Sidebar.vue";
import { RouterView } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { onMounted, ref } from "vue";
import Header from "../molecules/Header.vue";
const store = useAuthStore();
onMounted(() => {
  store.setUser();
});
const isMenuOpen = ref(false)
</script>

<template>
      <Header v-model="isMenuOpen" />
  <div class="row vh-100">
    <div class="col-lg-3 col-md-12 col-sm-12 col-xs-12">
      <Sidebar v-model="isMenuOpen"></Sidebar>
    </div>
    <div class="col-lg-9 col-md-12 col-sm-12 col-xs-12 px-4">
      <main class="vh-100">
        <div class="text-center">
          <RouterView></RouterView>
        </div>
      </main>
    </div>
  </div>
</template>
