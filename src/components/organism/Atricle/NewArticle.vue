<template>
    <ArticleForm @submit="handleSubmit"></ArticleForm>
</template>

<script lang="ts" setup>
//utils
import { useArticleStore } from '@/stores/article';
import { useRouter } from 'vue-router';
//components
import ArticleForm from './ArticleForm.vue';
//hooks
const router = useRouter();
//methods
async function handleSubmit(formData:any) {
  const formDataas = {
    title: formData.title,
    description: formData.description,
    body: formData.body,
    tagList: formData.tagList,
  };
  await useArticleStore().postArticle({ article: formDataas });
  router.push("/");
}

</script>