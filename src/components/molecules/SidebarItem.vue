<template>
  <RouterLink :to="props.to">
    <div class="sidebar-item  text-bg-primary p-3 d-flex align-items-center">
      <span class="sidebar-label">{{ props.label }}</span>
    </div>
  </RouterLink>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
// props
const props = defineProps<{
  label: string;
  to: string;
}>();

</script>

<style scoped>
.sidebar-item {
  cursor: pointer;
}
</style>