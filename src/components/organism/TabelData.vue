<script setup lang="ts">
//utils
import { useArticleStore } from '@/stores/article'
import { computed, onMounted, ref } from 'vue'
//components
import PaginationControls from '../molecules/PaginationButton.vue'
import DeleteArticleModal from './modals/DeleteArticleModal.vue'
import { Article } from '@/services/article'
//hooks
const tableStore = useArticleStore()
//computed
const tableData = computed(() => tableStore.data)
const currentPage = computed(() => tableStore.currentPage)
const totalPages = computed(() => tableStore.totalPages)
const isLoading = computed(() => tableStore.isLoading)
const headers = computed(() => {
  return tableStore?.data[0] ? Object.keys(dataAdaptor(tableData.value)[0]) : []
})
//methods
const fetchData = (page: number) => {
  tableStore.fetchData(page)
}
//lifecycle
onMounted(() => {
  fetchData(1)
})
//methods
function dataAdaptor(data: Article[]) {
  return data.map((item, index) => {
    return {
      '#': index + 1,
      title: item.title,
      author: item.author.username,
      tags: item.tagList.join(', '),
      excerpt: item.description,
      created: new Date(item.createdAt).toDateString(),
    }
  })
}
</script>

<template>
  <div v-if="headers.length">
    <h2 v-if="isLoading">Loading ...</h2>
    <div v-else class="table-responsive">
      <table class="table table table-hover">
        <thead class="thead-dark">
          <tr>
            <th
              class="text-bg-secondary"
              v-for="(header, index) in headers"
              :key="index"
            >
              {{ header }}
            </th>
            <th class="text-bg-secondary"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in dataAdaptor(tableData)">
            <td v-for="(value, key) in row" :key="key">{{ value }}</td>
            <td>
              <DeleteArticleModal :article="tableData[index]" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <PaginationControls
      :currentPage="currentPage"
      :totalPages="totalPages"
      @changePage="fetchData"
    />
  </div>
  <h2 v-else>NO data</h2>
</template>

<style>
.table-responsive {
  min-height: 200px;
}
</style>
