<script setup lang="ts">
import { defineProps, defineEmits, ref } from "vue";

const props = defineProps<{
  currentPage: number;
  totalPages: number;
}>();

const emit = defineEmits<{
  (e: "changePage", page: number): void;
}>();

const curretnPage = ref(props.currentPage);

function emits(n: number) {
  emit("changePage", n);
}
</script>

<template>
  <div class="d-flex justify-content-center my-3">
    <vue-awesome-paginate
      :total-items="3"
      :items-per-page="1"
      :max-pages-shown="1"
      v-model="curretnPage"
      @click="emits"
    />
  </div>
</template>
