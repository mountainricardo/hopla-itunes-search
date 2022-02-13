// import { shallowMount } from "@vue/test-utils";
// import HelloWorld from "@/components/HelloWorld.vue";

// describe("HelloWorld.vue", () => {
//   it("renders props.msg when passed", () => {
//     const msg = "new message";
//     const wrapper = shallowMount(HelloWorld, {
//       propsData: { msg },
//     });
//     expect(wrapper.text()).toMatch(msg);
//   });
// });
import { mount } from '@vue/test-utils'
import Home from "@/views/Home.vue";

describe("Home", () => {
  const wrapper = mount(Home)
  const vm = wrapper.vm

  console.log(wrapper)

  // it('renders the correct markup', () => {
  //   // expect(wrapper.html()).toContain('<span class="count">0</span>')
  //   // expect(wrapper.html()).toContain(`<h2 class="headline font-weight-bold mb-3" style="color: blue">
  //   //       Search ITunes for Music Albums
  //   //     </h2>`)
  // })

  // it's also easy to check for the existence of elements
  it('has a button', () => {
    expect(wrapper.findComponent('h2')).toEqual({"selector": "h2"})
  })
  it('has a button', () => {
    expect(wrapper.findComponent('v-btn')).toEqual({"selector": "v-btn"})
  })

  
  // it("renders props.msg when passed", () => {
  //   const msg = "new message";
  //   const wrapper = shallowMount(HelloWorld, {
  //     propsData: { msg },
  //   });
  //   expect(wrapper.text()).toMatch(msg);
  // });
});
