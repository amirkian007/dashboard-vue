//utils
import api from "@/services/api";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useToast } from "vue-toastification";
//types
import type { articlePost } from "@/services/article";
//hooks
const toast = useToast();

export const useArticleStore = defineStore("table", () => {
  //data
  const data = ref<any>([]);
  const isLoading = ref(false);
  const currentPage = ref(1);
  const totalPages = ref(1);
  const tags = ref<string[]>([]);

  //methods
  const fetchData = async (page: number = 1) => {
    isLoading.value = true;
    try {
      const response = await api.article.getArticles(page);
      data.value = response.articles;
      // the backend does no provide a pagination so we hard code it...
      totalPages.value = 5;
      currentPage.value = page;
    } catch (error) {
      console.error("Error :", error);
    } finally {
      isLoading.value = false;
    }
  };

  async function getTags() {
    const response = await api.article.getTags();
    tags.value = response.tags;
  }

  async function postArticle(dpayload: articlePost) {
    try {
      const response = await api.article.postArticle(dpayload);
      toast.success("article posted!");
      data.value = [response.article, ...data.value];
    } catch (error) {
      console.error("Error :", error);
    }
  }
  async function getArticle(slug: string) {
    const response = await api.article.getArticleBySlug(slug);
    return response;
  }
  async function updateArticle(dpayload: articlePost, slug: string) {
    try {
      const response = await api.article.editArticle(dpayload, slug);
      toast.success("article Updated!");
      return response;
    } catch (error) {
      console.error("Error :", error);
    }
  }
  async function deleteArticleBySlug(slug: string) {
    try {
      const response = await api.article.deleteArticleBySlug(slug);
      toast.success("article Deleted!");
      fetchData(currentPage.value);
      return response;
    } catch (error) {
      console.error("Error :", error);
    }
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
    getArticle,
  };
});
