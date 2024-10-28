<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import PaginationControls from "../molecules/PaginationButton.vue";
import { useArticleStore } from "@/stores/article";
import DeleteArticleModal from "./modals/DeleteArticleModal.vue";

const tableStore = useArticleStore();
const tableData = computed(() => tableStore.data);
const currentPage = computed(() => tableStore.currentPage);
const totalPages = computed(() => tableStore.totalPages);
const isLoading = computed(() => tableStore.isLoading);
const headers = computed(() => {
  return tableStore?.data[0] ? Object.keys(dataAdaptor(tableData.value)[0]) : [];
});

const fetchData = (page: number) => {
  tableStore.fetchData(page);
};

onMounted(() => {
  fetchData(1);
});

function dataAdaptor(data: any) {
  return data.map((item: any, index: any) => {
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
  <div>
    <h2 v-if="isLoading">Loading ...</h2>
    <div v-else class="table-responsive">
      <table class="table table table-hover">
        <thead class="thead-dark ">
          <tr>
            <th class="text-bg-secondary" v-for="(header, index) in headers" :key="index">
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
    <PaginationControls :currentPage="currentPage" :totalPages="totalPages" @changePage="fetchData" />
  </div>
</template>
