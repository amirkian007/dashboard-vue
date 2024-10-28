
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
  try{
    const formDataas = {
      title: formData.title,
      description: formData.description,
      body: formData.body,
      tagList: formData.tagList,
    };
    loading.value = true
    await useArticleStore().updateArticle({ article: formDataas }, data.value?.slug!);
    loading.value = false
    router.push("/");
  }catch(err){
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
  <ArticleForm :loading="loading" @submit="handleSubmit" :data="data"></ArticleForm>
</template>
