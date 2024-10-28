import api from "@/services/api";
import { Article, articlePost } from "@/services/article";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useArticleStore = defineStore("table", () => {
  const data = ref<any>([]);
  const isLoading = ref(false);
  const currentPage = ref(1);
  const totalPages = ref(1);
  const tags = ref<string[]>([]);

  const fetchData = async (page: number = 1) => {
    isLoading.value = true;
    try {
      const response = await api.article.getArticles(page);
      data.value = response.articles;  
      totalPages.value = 5;
      currentPage.value = page;
    } catch (error) {
      console.error("Error :", error);
    } finally {
      isLoading.value = false;
    }
  };

  async function getTags(){
    const response = await api.article.getTags();
    tags.value = response.tags
  }

  async function postArticle(dpayload:articlePost){
    const response = await api.article.postArticle(dpayload);
    data.value = [response.article,...data.value]
  }
  async function getArticle(slug:string){
    const response = await api.article.getArticleBySlug(slug);
    return response
  }
  async function updateArticle(dpayload:articlePost,slug:string){
    const response = await api.article.editArticle(dpayload,slug);
    return response
  }
  async function deleteArticleBySlug(slug:string) {
    const response = await api.article.deleteArticleBySlug(slug);
    fetchData(currentPage.value)
    return response
  }

  return {
    data,
    isLoading,
    updateArticle,
    deleteArticleBySlug,
    currentPage,
    totalPages,
    fetchData,
    getTags,
    tags,
    postArticle,
    getArticle
  };
});
