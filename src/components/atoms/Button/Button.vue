<script lang="ts" setup>
//utils
import { defineProps, defineEmits } from 'vue'
// types
import type { buttonProps } from './Button.types.ts'
//props
const props = withDefaults(defineProps<buttonProps>(), {
  variant: 'primary',
  size: '',
  disabled: false,
  block: true,
})
//emits
const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()
//methods
function handleClick(event: MouseEvent) {
  emit('click', event)
}
</script>
<template>
  <button
    :class="`btn btn-${props.variant} btn-${props.size} ${props.block && 'block'}`"
    :disabled="props.disabled"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<style scoped>
.block {
  width: 100%;
}
</style>
