<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";
import type {buttonProps} from './Button.types.ts'

const props = withDefaults(defineProps<buttonProps>(),{
  variant: "primary",
  size: "",
  disabled: false,
  block: true,
})

const emit = defineEmits<{
  (e: "click", event: MouseEvent): void;
}>();

function handleClick(event: MouseEvent) {
  emit("click", event);
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
