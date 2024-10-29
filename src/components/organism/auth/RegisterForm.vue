
<script lang="ts" setup>
//utils
import { ref } from "vue";
import { vValidateform } from "@/utils/v-validate";
import { useAuthStore } from "@/stores/auth";
//componets
import AInput from "../../atoms/InputField/InputField.vue";
import AButton from "../../atoms/Button/Button.vue";
//hooks
const authStore = useAuthStore();
//data
const username = ref("");
const password = ref("");
const email = ref("");
const isLoading = ref(false);
//methods
async function handleSubmit() {
  try{
    isLoading.value = true
    await authStore.register(username.value, password.value, email.value);
    isLoading.value = false
  }catch(err){
    console.error(err)
  }
}
</script>

<template>
  <form v-validateform @submit.prevent="handleSubmit">
    <AInput
      v-model="username"
      type="text"
      label="Username"
      placeholder="Enter username"
      error="username is not valid"
      required
    />
    <AInput
      v-model="password"
      type="password"
      label="Password"
      placeholder="Enter password"
      error="password is not valid"
      required
    />
    <AInput
      v-model="email"
      type="email"
      label="Email"
      placeholder="Enter email"
      error="email is not valid"
      required
    />
    <AButton type="submit" variant="primary" size="lg" :disabled="isLoading"> Register </AButton>
  </form>
</template>
