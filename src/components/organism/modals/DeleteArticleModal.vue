<script setup lang="ts">
//componets
import { Button } from "@/components/atoms";
import Modal from "@/components/atoms/Modal/Modal.vue";
import DropwDown from "@/components/molecules/DropwDown.vue";
//types
import type { Article } from "@/services/article";
//utils
import { useArticleStore } from "@/stores/article";
import { ref } from "vue";
import { useRouter } from "vue-router";
//props
const props = defineProps<{
  article: Article;
}>();
//hooks
const router = useRouter()
const store = useArticleStore()
//data
const items = [
  { name: "edit", type: "edit" },
  { name: "delete", type: "delete" },
]
const ismodalOpen = ref(false);
// methods
async function itemClick(item: any) {
  if (item.type === "delete") {
    ismodalOpen.value = true;
  } else {
    router.push(`/editArticle/${props.article.slug}`)
  }
}
async function deleteModal() {
  await store.deleteArticleBySlug(props.article.slug)
}

</script>
<template>
  <DropwDown :items="items" @itemClick="itemClick">...</DropwDown>
  <Modal v-model="ismodalOpen" :title="`delete article '${props.article.title}'? `">
    <template #body> are you sure to delete this ? </template>
    <template #footer>
      <div class="d-flex gap-2">
        <Button variant="secondary" data-bs-toggle="modal"> close </Button>
        <Button variant="danger" @click="deleteModal" data-bs-toggle="modal"> YES </Button>
      </div>
    </template>
  </Modal>
</template>
