<script setup lang="ts">
import { defineProps, defineEmits, ref, useId, watch } from "vue";
//types
import { ModalProps } from "./Modal.types";
// import * as bt from "bootstrap";

//props
const props = defineProps<ModalProps>();
//emits
const emit = defineEmits<{
  (e: "update:modelValue", v: boolean): void;
}>();
//hooks
const id = useId();
//data
const openModalBtn = ref<HTMLElement | null>(null);
const closeModalBtn = ref<HTMLElement | null>(null);
const myModalEl = ref<HTMLElement | null>(null);
//watchers
watch(
  () => props.modelValue,
  (v) => {
    if (v) {
      showmODAL();
    }
  }
);
// methods
function showmODAL() {
  openModalBtn.value?.click();

  myModalEl.value?.addEventListener("hidden.bs.modal", () => {
    emit("update:modelValue", false);
  });
}


</script>

<template>
  <button
    ref="openModalBtn"
    class="btn btn-primary d-none"
    :data-bs-target="`#${id}`"
    data-bs-toggle="modal"
  ></button>

  <button
    ref="closeModalBtn"
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
