<script lang="ts" setup>
//componets
import { Button, InputField } from '@/components/atoms'
import TextArea from '@/components/atoms/VtextArea/TextArea.vue'
import TagList from '@/components/molecules/TagList.vue'
//utils
import { useArticleStore } from '@/stores/article'
import { computed, onMounted, ref, watch } from 'vue'
import { vValidateform } from '@/utils/v-validate'
import { ArticleFormData, ArticleFormProps } from './article.types'
//types

//props
const props = withDefaults(defineProps<ArticleFormProps>(), {
  data: {
    //@ts-ignore
    title: '',
    description: '',
    body: '',
    tagList: [],
  },
  loading: false,
})
//hooks
const articleStore = useArticleStore()
//data
const tags = ref<string[]>([])
const selctedTag = ref('')
const defaultForm = { ...props.data }
const formData = ref(defaultForm)

//emits
const emit = defineEmits<{
  (e: 'submit', data: ArticleFormData): void
}>()
//computeds
const computeedTags = computed(() => {
  return [...articleStore.tags, ...tags.value]
})
//methods
function onTagEnter(ev: KeyboardEvent) {
  ev.preventDefault()
  const tag = selctedTag.value
  tags.value = [...tags.value, tag]
  formData.value.tagList = [...formData.value.tagList, tag]
  selctedTag.value = ''
}
async function handleSubmit() {
  const formDataas: ArticleFormData = {
    title: formData.value.title,
    description: formData.value.description,
    body: formData.value.body,
    tagList: formData.value.tagList,
  }
  emit('submit', formDataas)
}
function resetForm(data: typeof props.data) {
  formData.value = data
}
//lifecycle
onMounted(() => {
  articleStore.getTags()
  resetForm(defaultForm)
})
//watchers
watch(
  () => props.data,
  v => {
    resetForm(v)
  },
)
</script>

<template>
  <form v-validateform @submit.prevent="handleSubmit">
    <div class="row">
      <div class="col-lg-9 col-md-12 col-sm-12 col-xs-12">
        <InputField
          v-model="formData.title"
          type="text"
          label="title"
          placeholder="Enter your title"
          error="title is required"
          required
        />
        <InputField
          v-model="formData.description"
          type="text"
          label="discription"
          placeholder="discription"
          error="discription is required"
          required
        />
        <TextArea
          label="body"
          placeholder="Enter your body"
          v-model="formData.body"
          error="body is required"
          required
        />
      </div>
      <div
        class="col-lg-3 col-md-12 col-sm-12 col-xs-12 d-flex flex-column mb-3"
      >
        <InputField
          v-model="selctedTag"
          type="text"
          label="Tags"
          placeholder="Enter Tag"
          @enter="onTagEnter"
        />
        <TagList v-model="formData.tagList" :tags="computeedTags" />
      </div>
    </div>
    <div class="d-flex">
      <Button
        type="submit"
        variant="primary"
        size="lg"
        :block="false"
        :disabled="props.loading"
      >
        Submit
      </Button>
    </div>
  </form>
</template>
