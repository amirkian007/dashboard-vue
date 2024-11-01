<script lang="ts" setup>
import BaseButton from './Button.vue'
import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap/scss/bootstrap.scss'

function initState() {
  return {
    disabled: false,
    color: undefined,
    size: undefined,
  }
}
</script>

<template>
  <Story
    title="BaseButton"
    :layout="{
      type: 'grid',
      width: 200,
    }"
  >
    <Variant title="small button" :init-state="initState">
      <template #default="{ state }">
        <BaseButton
          :disabled="state.disabled"
          variant="danger"
          :size="state.size"
        >
          Click me
        </BaseButton>
      </template>

      <template #controls="{ state }">
        <HstCheckbox v-model="state.disabled" title="Disabled" />
        <HstSelect
          v-model="state.color"
          title="Color"
          :options="[
            { value: undefined, label: 'Default' },
            { value: 'green', label: 'Green' },
            { value: 'red', label: 'Red' },
          ]"
        />
        <HstSelect
          v-model="state.size"
          title="Size"
          :options="[
            { value: undefined, label: 'Default' },
            { value: 'sm', label: 'Small' },
            { value: 'lg', label: 'Big' },
          ]"
        />
      </template>
    </Variant>

    <Variant title="big button" icon-color="#F43F5E">
      <BaseButton type="submit" variant="primary" size="lg"> Login </BaseButton>
    </Variant>
  </Story>
</template>
