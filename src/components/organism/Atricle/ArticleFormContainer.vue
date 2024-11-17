<script lang="ts" setup>
//utils
import { useArticleStore } from '@/stores/article'
import { onMounted, ref, watch } from 'vue'
import { ArticleFormData, ArticleFormProps } from './article.types'
import ArticleForm from './ArticleForm.vue'

//types

//props
const props = withDefaults(defineProps<ArticleFormProps>(), {
  data: () =>
    ({
      title: '',
      description: '',
      body: '',
      tagList: [],
    }) as ArticleFormData,
  loading: false,
})
//hooks
const articleStore = useArticleStore()
//data
const defaultForm = { ...props.data }
const formData = ref(defaultForm)
//emits
const emit = defineEmits<{
  (e: 'submit', data: ArticleFormData): void
}>()
//methods
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
  <ArticleForm
    @submit="handleSubmit"
    v-model="formData"
    :loading="props.loading"
    :computedTags="articleStore.tags"
  />
</template>
