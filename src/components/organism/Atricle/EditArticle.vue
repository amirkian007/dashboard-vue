<script lang="ts" setup>
//utils
import { useArticleStore } from '@/stores/article'
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
//componetns
import ArticleFormContainer from './ArticleFormContainer.vue'
//types
import { Article } from '@/services/article'
import { ArticleFormData } from './article.types'
//hooks
const route = useRoute()
const router = useRouter()
const store = useArticleStore()
//data
const data = ref<Article>()
const loading = ref(true)
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
    await useArticleStore().updateArticle(
      { article: formDataas },
      data.value?.slug!,
    )
    loading.value = false
    router.push('/')
  } catch (err) {
    console.error(err)
  }
}
async function getArticle() {
  const article = await store.getArticle(route.params.slug as unknown as string)
  data.value = article.article
  loading.value = false
}
//lifecycle
onMounted(() => {
  getArticle()
})
</script>

<template>
  <ArticleFormContainer
    :loading="loading"
    @submit="handleSubmit"
    :data="data"
  ></ArticleFormContainer>
</template>
