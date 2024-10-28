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
    <AButton type="submit" variant="primary" size="lg"> Login </AButton>
  </form>
</template>

<script lang="ts" setup>
import { useAuthStore } from "@/stores/auth";
import { ref } from "vue";
import AInput from "../../atoms/InputField/InputField.vue";
import AButton from "../../atoms/Button/Button.vue";

const formData = ref({
  email: "",
  password: "",
});

const errors = ref({
  email: "",
  password: "",
});

function handleSubmit() {
    useAuthStore().login(formData.value.email, formData.value.password);
}
</script>
