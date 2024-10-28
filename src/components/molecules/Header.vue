<script lang="ts" setup>
import { useAuthStore } from "@/stores/auth";
import { Button } from "../atoms";
const store = useAuthStore();

const props = withDefaults(defineProps<{ modelValue: boolean }>(), {
  modelValue: false,
});

const emit = defineEmits<{
  (e: "update:modelValue", v: any): void;
}>();
function modelValuClick() {

  setTimeout(() => {

    emit('update:modelValue', true)
  });
}

</script>

<template>
  <header class="py-3 px-4 text-bg-secondary">
    <div class="row d-flex align-items-center ">
      <div class="col-lg-3 d-flex justify-content-between">
        <h2>Dahsboard Vue 3</h2>
        <Button variant="outline-dark" class="d-block   d-lg-none" @click="modelValuClick" :block="false">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" height="32px" id="Layer_1"
            style="enable-background: new 0 0 32 32" version="1.1" viewBox="0 0 32 32" width="32px"
            xml:space="preserve">

            <path
              d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z" />

          </svg>
        </Button>
      </div>
      <div class="col-lg-3">
        <h5>Welcome {{ store.username }}</h5>
      </div>
      <div class="col-lg-6 d-flex justify-content-end">
        <Button @click="store.logout" variant="outline-primary" :block="false">Log out</Button>
      </div>
    </div>
  </header>
</template>
