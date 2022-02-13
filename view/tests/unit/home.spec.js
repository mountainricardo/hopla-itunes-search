import { createLocalVue, mount } from "@vue/test-utils"
import Home from "@/views/Home.vue"
import Vuetify from 'vuetify'
// jest.mock('axios')

describe("Home", () => {
  let vuetify
  let localVue
  let wrapper

  beforeEach(() => {
    localVue = createLocalVue()
    vuetify = new Vuetify()
    wrapper = mount(
      Home,
      {
        localVue,
        vuetify,
        // attachToDocument: true
      }
    )

  })
  
  // it('is a Vue instance', () => {
  //   expect(wrapper.isVueInstance()).toBeTruthy()
  // })

  it('has a heading', () => {
    expect(wrapper.findComponent('h2')).toEqual({"selector": "h2"})
    // expect(wrapper.contains('h2')).toBe(true)
  })

  it('has a button', () => {
    expect(wrapper.findComponent('v-btn')).toEqual({"selector": "v-btn"})
  })

  // it('submits form when a button is clicked', () => {
  //   // const wrapper = mountFunction()
  //   wrapper.find('v-btn').trigger('submit')
  //   expect(wrapper.vm.submitted).toBe(true)
  // })  

});
