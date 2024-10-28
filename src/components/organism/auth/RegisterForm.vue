<template>
  <form @submit.prevent="handleSubmit">
    <AInput
      v-model="username"
      type="text"
      label="Username"
      placeholder="Enter username"
    />
    <AInput
      v-model="password"
      type="password"
      label="Password"
      placeholder="Enter password"
    />
    <AInput
      v-model="email"
      type="email"
      label="Email"
      placeholder="Enter email"
    />
    <AButton type="submit" variant="primary" size="lg"> Register </AButton>
  </form>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import AInput from "../../atoms/InputField/InputField.vue";
import AButton from "../../atoms/Button/Button.vue";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const username = ref("");
const password = ref("");
const email = ref("");

async function handleSubmit() {
  await authStore.register(username.value, password.value, email.value);
}
</script>
