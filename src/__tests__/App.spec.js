import { mount } from '@vue/test-utils'
import App from '../App.vue'

describe('Portfolio page', () => {
  it('renders required sections', () => {
    const wrapper = mount(App)

    expect(wrapper.find('#hero').exists()).toBe(true)
    expect(wrapper.find('#about').exists()).toBe(true)
    expect(wrapper.find('#portfolio').exists()).toBe(true)
    expect(wrapper.find('#skills').exists()).toBe(true)
    expect(wrapper.find('#footer').exists()).toBe(true)
  })

  it('shows exactly two project cards', () => {
    const wrapper = mount(App)

    expect(wrapper.findAll('#portfolio article')).toHaveLength(2)
  })
})
