<script setup lang="ts">
//componets
import { Button } from '@/components/atoms'
import Modal from '@/components/atoms/Modal/Modal.vue'
import DropwDown, { DropItem } from '@/components/molecules/DropwDown.vue'
//types
import type { Article } from '@/services/article'
//utils
import { ref } from 'vue'
//props
const props = defineProps<{
  article: Article
}>()

const emit = defineEmits<{
  (e: 'edit', slug: string): void
  (e: 'delete', slug: string): void
}>()

//data
interface DorpDowenItems {
  name: string
  type: string
}
const items: DorpDowenItems[] = [
  { name: 'edit', type: 'edit' },
  { name: 'delete', type: 'delete' },
]
const ismodalOpen = ref(false)
// methods
async function itemClick(item: DorpDowenItems) {
  if (item.type === 'delete') {
    ismodalOpen.value = true
  } else {
    emit('edit', props.article.slug)
  }
}
async function deleteModal() {
  emit('delete', props.article.slug)
}
</script>

<template>
  <DropwDown :items="items" @itemClick="itemClick">...</DropwDown>
  <Modal
    v-model="ismodalOpen"
    :title="`delete article '${props.article.title}'? `"
  >
    <template #body> are you sure to delete this ? </template>
    <template #footer>
      <div class="d-flex gap-2">
        <Button variant="secondary" data-bs-toggle="modal"> close </Button>
        <Button variant="danger" @click="deleteModal" data-bs-toggle="modal">
          YES
        </Button>
      </div>
    </template>
  </Modal>
</template>
