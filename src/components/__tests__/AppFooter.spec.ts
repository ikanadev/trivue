import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import AppFooter from '../AppFooter.vue'

describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(AppFooter, { props: { msg: 'Hello Vitest' } })
    expect(wrapper.text()).toContain('Made by')
  })
})
