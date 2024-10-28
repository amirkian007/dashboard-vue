<script setup lang="ts">
import LoginForm from '../components/organism/auth/LoginForm.vue';
</script>

<template>
  <div class="container">
    <div class="row justify-content-md-center">
      <div class="col-12 col-md-11 col-lg-8 col-xl-7 col-xxl-6">
        <div class="bg-white p-4 p-md-5 rounded shadow-sm">
          <h1 class="mb-4 text-center">  Login</h1>
          <LoginForm />
          <span>dont have an account ? </span> <RouterLink to="/register">Register</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

