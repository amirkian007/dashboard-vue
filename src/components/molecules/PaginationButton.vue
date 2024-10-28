<script setup lang="ts">
import { defineProps, defineEmits, ref } from "vue";
//props
const props = defineProps<{
  currentPage: number;
  totalPages: number;
}>();
//emits
const emit = defineEmits<{
  (e: "changePage", page: number): void;
}>();
// data
const curretnPage = ref(props.currentPage);
// methods
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

<style >

.paginate-buttons{
  /* put important so it does not get overwritten */
  background-color: rgb(239, 239, 239) !important;
}
</style>
