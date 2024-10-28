
<script lang="ts" setup>
import { defineProps, defineEmits, useId } from "vue";
import { CheckBoxProps } from "./CheckBox.types";

const props = defineProps<CheckBoxProps>();

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();

function handleChange(event: Event) {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.checked);
}

const id = useId()

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
