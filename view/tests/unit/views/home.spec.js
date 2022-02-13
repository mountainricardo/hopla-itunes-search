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
      }
    )

  })
  
  it('has a heading', () => {
    expect(wrapper.find('h2')).toEqual({"selector": "h2"})
  })

  it('has a button', () => {
    expect(wrapper.findComponent('v-btn')).toEqual({"selector": "v-btn"})
  })

  it('Enter text and check the value of artist', ()=>{
    var textInput = wrapper.find('[data-test="artistText"]')
    textInput.setValue('oink');
    expect(wrapper.vm.artist).toBe('oink')
  })

  it('test click event emitted from search Button', () =>{
    wrapper.find('[data-test="searchButton"]').vm.$emit('click')
    expect(wrapper.find('[data-test="searchButton"]').emitted().click).toBeTruthy()
  })
});
