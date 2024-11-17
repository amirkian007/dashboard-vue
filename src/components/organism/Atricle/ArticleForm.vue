<script lang="ts" setup>
import { Button, InputField } from '@/components/atoms'
import TextArea from '@/components/atoms/VtextArea/TextArea.vue'
import TagList from '@/components/molecules/TagList.vue'
import { ArticleFormData } from './article.types'
import { computed, ref } from 'vue'
import { vValidateform } from '@/utils/v-validate'

const selectedTag = ref('')
const props = defineProps<{
  modelValue: ArticleFormData
  computedTags: string[]
  loading: boolean
}>()
const tags = ref<string[]>([])

const emit = defineEmits<{
  (e: 'update:modelValue', value: ArticleFormData): void
  (e: 'submit'): void
}>()

const formData = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value),
})
const computeedTags = computed(() => {
  return [...props.computedTags, ...tags.value]
})
function onTagEnter(ev: KeyboardEvent) {
  ev.preventDefault()
  const tag = selectedTag.value
  tags.value = [...tags.value, tag]
  formData.value.tagList = [...formData.value.tagList, tag]
  selectedTag.value = ''
}

function onSubmit() {
  emit('submit')
}
</script>

<template>
  <form @submit.prevent="onSubmit" v-validateform>
    <div class="row">
      <div class="col-lg-9 col-md-12 col-sm-12 col-xs-12">
        <InputField
          v-model="formData.title"
          type="text"
          label="Title"
          placeholder="Enter your title"
          error="Title is required"
          required
        />
        <InputField
          v-model="formData.description"
          type="text"
          label="Description"
          placeholder="Enter your description"
          error="Description is required"
          required
        />
        <TextArea
          label="Body"
          placeholder="Enter your body"
          v-model="formData.body"
          error="Body is required"
          required
        />
      </div>
      <div
        class="col-lg-3 col-md-12 col-sm-12 col-xs-12 d-flex flex-column mb-3"
      >
        <InputField
          v-model="selectedTag"
          type="text"
          label="Tags"
          placeholder="Enter Tag"
          @keydown.enter.prevent="onTagEnter"
        />
        <TagList v-model="formData.tagList" :tags="computeedTags" />
      </div>
    </div>
    <div class="d-flex">
      <Button
        type="submit"
        variant="primary"
        size="lg"
        :disabled="loading"
        :block="false"
      >
        Submit
      </Button>
    </div>
  </form>
</template>
