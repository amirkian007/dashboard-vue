<script lang="ts" setup>
// utils
import Sidebar from "@/components/organism/Sidebar.vue";
import { RouterView } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { onMounted, ref } from "vue";
//hooks
const store = useAuthStore();
//components
import Header from "../molecules/Header.vue";
//data
const isMenuOpen = ref(false)
//lifecycle
onMounted(() => {
  store.setUser();
});
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
