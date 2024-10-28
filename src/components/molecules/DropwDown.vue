<script setup lang="ts">
//components
import AButton from "../atoms/Button/Button.vue";
//types
interface Item {
  name: string;
}
//emits
const emit = defineEmits<{
  (e: "itemClick", item: any): void;
}>();
//props
const props = defineProps<{
  items: Item[];
}>();
//methods
const handleSelect = (item: any) => {
  emit("itemClick", item)
};
</script>

<template>
  <div class="btn-group">
    <AButton type="button" class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
      <slot />
    </AButton>
    <ul class="dropdown-menu">
      <li v-for="item in props.items" @click="handleSelect(item)">
        <a class="dropdown-item" href="#">{{ item.name }}</a>
      </li>
    </ul>
  </div>
</template>
