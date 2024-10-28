
<script lang="ts" setup>
import { defineProps, defineEmits, useId } from "vue";
//types
import { CheckBoxProps } from "./CheckBox.types";
//props
const props = defineProps<CheckBoxProps>();
//emits
const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();
//hooks
const id = useId()

// methods
function handleChange(event: Event) {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.checked);
}


</script>

<template>
  <div class="form-check form-check-inline text-start ">
    <input
      :id="id"
      type="checkbox"
      :checked="props.modelValue"
      class="form-check-input"
      @change="handleChange"
    />
    <label :for="id" class="form-check-label">
      {{ label}}
    </label>
  </div>
</template>
