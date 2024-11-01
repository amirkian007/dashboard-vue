import { mount } from '@vue/test-utils'
import { test, expect } from 'vitest'
import Button from './Button.vue'

test('displays message', () => {
  const wrapper = mount(Button, {
    slots: {
      default: 'Main Content',
    },
  })

  expect(wrapper.text()).toContain('Main Content')
})

test('test size', async () => {
  const wrapper = mount(Button, {
    props: {
      size: 'lg',
    },
  })
  await wrapper.classes()
  expect(wrapper.classes()).includes('btn-lg')
})
