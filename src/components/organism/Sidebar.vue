<script lang="ts" setup>
// components
import { onMounted, onUnmounted, ref } from "vue";
import SidebarItem from "../molecules/SidebarItem.vue";
// props
const props = withDefaults(defineProps<{ modelValue: boolean }>(), {
  modelValue: false,
});
//emits
const emit = defineEmits<{
  (e: "update:modelValue", v: any): void;
}>();
//data
const isResponsive = ref(true);
//methods
function closeItem() {
  if (props.modelValue) {
    emit("update:modelValue", false);
  }
}
function windowResizerListner(){
  isResponsive.value = innerWidth < 992;
};
//lifecycle
onMounted(() => {
  windowResizerListner()
  window.addEventListener("resize", windowResizerListner);
});
onUnmounted(() => {
  window.removeEventListener("resize", windowResizerListner);
});
</script>

<template>
  <nav
    class="sidebar bg-primary h-100 pt-1"
    v-click-outside="closeItem"
    :class="{ 'responisve-mode': isResponsive, 'menu-open': props.modelValue }"
  >
    <h4 class="m-3">Post</h4>
    <SidebarItem @click="closeItem" label="All Articles" to="/" />
    <SidebarItem @click="closeItem" label="New Article" to="/newArticle" />
  </nav>
</template>

<style scoped>
.sidebar {
  width: 250px;
  transition: all 0.3s;
}

.responisve-mode {
  position: fixed;
  left: -100%;
  top: 0;
}

.menu-open {
  left: 0%;
}
</style>
