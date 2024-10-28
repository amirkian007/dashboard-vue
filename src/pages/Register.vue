<script setup lang="ts">
import RegisterForm from "../components/organism/auth/RegisterForm.vue";
</script>
<template>
  <div class="container">
    <div class="row justify-content-md-center">
      <div class="col-12 col-md-11 col-lg-8 col-xl-7 col-xxl-6">
        <div class="bg-white p-4 p-md-5 rounded shadow-sm">
          <h1 class="mb-4 text-center">  Register</h1>
          <RegisterForm />
          <span>have an account ? </span> <RouterLink to="/login">Login</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
