<script lang="ts" setup>
import { defineProps, defineEmits, computed } from "vue";
import { vValidateinput } from "../../../utils/v-validate";
// types
import { TextareaProps } from "./TextArea.types";
//props
const props = withDefaults(defineProps<TextareaProps>(), {
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
}>();
//computed
const textareaId = computed(
  () => props.label?.replace(/\s+/g, "-").toLowerCase() || "textarea"
);
const sizeClass = computed(() =>
  props.size ? `form-control-${props.size}` : ""
);
//methods
function handleInput(event: Event) {
  const target = event.target as HTMLTextAreaElement;
  emit("update:modelValue", target.value);
}
</script>

<template>
  <div class="mb-3 text-start">
    <label v-if="label" :for="textareaId" class="form-label">{{ label }}</label>
    <textarea :id="textareaId" :value="modelValue" :placeholder="placeholder" :class="`form-control ${sizeClass}`"
      :disabled="disabled" @input="handleInput" rows="4" 
      v-validateinput
      :required="props.required"
      ></textarea>
      <div class="invalid-feedback error-message d-none text-danger">
        {{ error }}
      </div>
  </div>
</template>
<style lang="scss">
 @import url('@/styles/invalidFormControll.scss');
</style>
