<script setup lang="ts" generic="T extends DropItem">
//components
import AButton from '../atoms/Button/Button.vue'
//types
export interface DropItem {
  name: string
  [key: string]: any
}
//emits
const emit = defineEmits<{
  (e: 'itemClick', item: T): void
}>()
//props
const props = defineProps<{
  items: T[]
}>()
//methods
const handleSelect = (item: T) => {
  emit('itemClick', item)
}
</script>

<template>
  <div class="btn-group">
    <AButton
      type="button"
      class="dropdown-toggle"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <slot />
    </AButton>
    <ul class="dropdown-menu">
      <li v-for="item in props.items" @click="handleSelect(item)">
        <a class="dropdown-item" href="#">{{ item.name }}</a>
      </li>
    </ul>
  </div>
</template>
