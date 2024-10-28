<script setup lang="ts">
import { defineProps, defineEmits, onMounted, ref, useId, watch } from "vue";
// import * as bt from "bootstrap";
const props = defineProps<{ title: string; modelValue: boolean }>();

const emit = defineEmits<{
  (e: "update:modelValue", v: boolean): void;
}>();

const refasda = ref<HTMLElement | null>(null);
const refasdwaea = ref<HTMLElement | null>(null);
const myModalEl = ref<HTMLElement | null>(null);

watch(
  () => props.modelValue,
  (v) => {
    if (v) {
      showmODAL();
    }
  }
);
function showmODAL() {
  refasda.value?.click();
 
    myModalEl.value?.addEventListener('hidden.bs.modal', () => {
      emit('update:modelValue',false)
    })
}
// function hideModal() {
//   refasdwaea.value?.click();
//   emit('update:modelValue',false)
// }
const id = useId();

</script>

<template>
  <button
    ref="refasda"
    class="btn btn-primary d-none"
    :data-bs-target="`#${id}`"
    data-bs-toggle="modal"
  >
    Open second modal
  </button>

  <button
    ref="refasdwaea"
    type="button"
    class="btn-close d-none"
    data-bs-dismiss="modal"
    aria-label="Close"
  ></button>
  <Teleport to="body">
    <div
      ref="myModalEl"
      class="modal fade"
      :id="id"
      aria-hidden="true"
      aria-labelledby="exampleModalToggleLabel2"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalToggleLabel2">
              {{ props.title }}
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <slot name="body"></slot>
          </div>
          <div class="modal-footer">
            <slot name="footer"></slot>
           
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
