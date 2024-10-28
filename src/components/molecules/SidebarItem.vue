
<script lang="ts" setup>
import { defineProps } from 'vue';
// props
const props = defineProps<{
  label: string;
  to: string;
}>();

</script>

<template>
  <RouterLink :to="props.to">
    <div class="sidebar-item hover-bg text-bg-primary p-3 d-flex align-items-center">
      <span class="sidebar-label">{{ props.label }}</span>
    </div>
  </RouterLink>
</template>

<style scoped lang="scss">
.sidebar-item {
  cursor: pointer;
  transition: all .3s;
  &:hover {
    background-color: #ffffff34 !important; 
    // background-color: var(--bs-primary); 
  }

}
.hover-bg {
  
}
</style>