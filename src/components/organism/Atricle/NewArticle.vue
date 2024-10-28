<template>
    <ArticleForm @submit="handleSubmit"></ArticleForm>
</template>

<script lang="ts" setup>
import { useArticleStore } from '@/stores/article';
import ArticleForm from './ArticleForm.vue';
import { useRouter } from 'vue-router';
 
const router = useRouter();

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