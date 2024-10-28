<template>
  <ArticleForm v-if="!loading" @submit="handleSubmit" :data="data"></ArticleForm>
  <h2 v-else>Loading ...</h2>
</template>

<script lang="ts" setup>
import { useArticleStore } from '@/stores/article';
import ArticleForm from './ArticleForm.vue';
import { useRoute, useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import { Article } from '@/services/article';

const data = ref<Article>()
const loading = ref(true)

const route = useRoute()
const router = useRouter();
const store = useArticleStore()

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
onMounted(() => {
  getArticle()
})
</script>