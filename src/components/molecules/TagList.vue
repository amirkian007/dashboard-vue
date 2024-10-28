<script lang="ts" setup>
import { defineProps, defineEmits, computed } from "vue";
// components
import CheckBox from "../atoms/CheckBox/CheckBox.vue";
import { Sorter } from "@/utils/sortAlph";
// props
const props = defineProps<{ tags: string[]; modelValue: string[] }>();
//data
const sorter = new Sorter('asc')
// emits
const emit = defineEmits<{
  (e: "update:modelValue", value: string[]): void;
}>();
// computed
const selectedTags = computed({
  get: () => props.modelValue,
  set: (value: string[]) => emit("update:modelValue", value),
});
const tagsSorted = computed(()=>{
  return sorter.sort(props.tags)
})
//methids
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
      v-for="tag in tagsSorted"
      :key="tag"
      :label="tag"
      :modelValue="selectedTags.includes(tag)"
      @update:modelValue="(checked:any) => toggleTagSelection(tag, checked)"
    />
  </div>
</template>
