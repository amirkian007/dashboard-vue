<script lang="ts" setup>
//utils
import { defineProps, defineEmits, computed } from "vue";
import { vHighlight } from "../../../utils/v-validate";
//types
import type { inputProps } from "./input.types";
//props
const props = withDefaults(defineProps<inputProps>(), {
  type: "text",
  label: "",
  placeholder: "",
  size: "",
  disabled: false,
  required: false,
  error: "",
});
//emits
const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "enter", ev: KeyboardEvent): void;
}>();
//computed
const inputId = computed(
  () => props.label?.replace(/\s+/g, "-").toLowerCase() || "input"
);
const sizeClass = computed(() =>
  props.size ? `form-control-${props.size}` : ""
);
//methods
function handleInput(event: Event) {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
}
function onEnter(e: KeyboardEvent) {
  emit("enter", e);
}
</script>

<template>
  <div class="mb-3 text-start">
    <label v-if="label" :for="inputId" class="form-label">{{ label }}</label>
    <input
      :id="inputId"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :class="`form-control ${sizeClass}`"
      :disabled="disabled"
      @input="handleInput"
      @keydown.enter="onEnter"
      :required="props.required"
      v-highlight
    />
    <div class="invalid-feedback error-message d-none text-danger">
      {{ error }}
    </div>
  </div>
</template>

<style scoped>
.input-blured:invalid {
  border-color: red;
}
.input-blured:invalid ~ .error-message {
  display: block !important;
}
.form-label:has(+ .input-blured:invalid) {
  color: red;
}
</style>
