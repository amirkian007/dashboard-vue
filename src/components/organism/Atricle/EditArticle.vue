<template>
  <ArticleForm v-if="!loading" @submit="handleSubmit" :data="data"></ArticleForm>
  <h2 v-else>Loading ...</h2>
</template>

<script lang="ts" setup>
//utils
import { useArticleStore } from '@/stores/article';
import { useRoute, useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
//componetns
import ArticleForm from './ArticleForm.vue';
//types
import { Article } from '@/services/article';
//hooks
const route = useRoute()
const router = useRouter();
const store = useArticleStore()
//data
const data = ref<Article>()
const loading = ref(true)
//methods
async function handleSubmit(formData: any) {
  const formDataas = {
    title: formData.title,
    description: formData.description,
    body: formData.body,
    tagList: formData.tagList,
  };
  await useArticleStore().updateArticle({ article: formDataas }, data.value?.slug!);
  router.push("/");
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