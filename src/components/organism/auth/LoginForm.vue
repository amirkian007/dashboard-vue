
<script lang="ts" setup>
//utils
import { useAuthStore } from "@/stores/auth";
import { ref } from "vue";
//components
import AInput from "../../atoms/InputField/InputField.vue";
import AButton from "../../atoms/Button/Button.vue";
//data
const formData = ref({
  email: "",
  password: "",
});
const errors = ref({
  email: "",
  password: "",
});
const isLoading = ref(false)
//methods
async function handleSubmit() {
  try{
    isLoading.value = true
    useAuthStore().login(formData.value.email, formData.value.password);
    isLoading.value = false
  }catch(err){
    console.error(err)
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <AInput
      v-model="formData.email"
      type="email"
      label="Email"
      placeholder="Enter your email"
      :error="errors.email"
    />
    <AInput
      v-model="formData.password"
      type="password"
      label="Password"
      placeholder="Enter your password"
      :error="errors.password"
    />
    <AButton type="submit" variant="primary" size="lg" :disabled="isLoading"> Login </AButton>
  </form>
</template>

