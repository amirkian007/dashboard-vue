<script lang="ts" setup>
import { defineProps, defineEmits, computed } from "vue";
import CheckBox from "../atoms/CheckBox/CheckBox.vue";

const props = defineProps<{ tags: string[]; modelValue: string[] }>();
const emit = defineEmits<{
  (e: "update:modelValue", value: string[]): void;
}>();

const selectedTags = computed({
  get: () => props.modelValue,
  set: (value: string[]) => emit("update:modelValue", value),
});

function toggleTagSelection(tagId: string, isChecked: boolean) {
  if (isChecked) {
    selectedTags.value = [...selectedTags.value, tagId];
  } else {
    selectedTags.value = selectedTags.value.filter((id) => id !== tagId);
  }
}
</script>

<template>
  <div class="d-flex flex-column border border-1 p-3 rounded flex-grow-1">
    <CheckBox
      v-for="tag in props.tags"
      :key="tag"
      :label="tag"
      :modelValue="selectedTags.includes(tag)"
      @update:modelValue="(checked:any) => toggleTagSelection(tag, checked)"
    />
  </div>
</template>
