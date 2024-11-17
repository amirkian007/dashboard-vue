<script lang="ts" setup>
//utils
import { useArticleStore } from '@/stores/article'
import { useRouter } from 'vue-router'
//components
import ArticleForm from './ArticleFormContainer.vue'
import { ref } from 'vue'
import { ArticleFormData } from './article.types'
//hooks
const router = useRouter()
//data
const loading = ref(false)
//methods
async function handleSubmit(formData: ArticleFormData) {
  try {
    const formDataas = {
      title: formData.title,
      description: formData.description,
      body: formData.body,
      tagList: formData.tagList,
    }
    // TODO: handel loading logic in store
    loading.value = true
    await useArticleStore().postArticle({ article: formDataas })
    loading.value = false
    router.push('/')
  } catch (err) {
    console.error(err)
  }
}
</script>
<template>
  <ArticleForm @submit="handleSubmit" :loading="loading"></ArticleForm>
</template>
