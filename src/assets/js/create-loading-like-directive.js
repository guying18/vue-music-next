import { createApp } from 'vue'
import { addClass, removeClass } from '@/assets/js/dom.js'

const relativeCls = 'g-relative'

export default function createLoadingLikeDirective (Comp) {
  return {
    // el： 指令绑定到的元素
    mounted (el, binding) {
      // app 对象的根组件为 Comp 组件
      const app = createApp(Comp)
      // vue 支持多实例，此实例挂载到动态创建的 div 元素上
      // 动态创建的 div 元素并没有挂载到 body 上，因此也不是实质上的 DOM 层的挂载
      // 此处 Comp 组件创建的实例是要挂载在 el 上的
      const instance = app.mount(document.createElement('div'))
      const name = Comp.name
      if (!el[name]) {
        el[name] = {}
      }
      // 使用此技巧使 instance 保留在 el[name] 对象上，防止作用在同一个元素上发生覆盖
      el[name].instance = instance
      const title = binding.arg
      if (typeof title !== 'undefined') {
        instance.setTitle(title)
      }

      if (binding.value) {
        append(el)
      }
    },
    updated (el, binding) {
      const title = binding.arg
      const name = Comp.name
      if (typeof title !== 'undefined') {
        el[name].instance.setTitle(title)
      }
      if (binding.value !== binding.oldValue) {
        binding.value ? append(el) : remove(el)
      }
    }
  }
  function append (el) {
    const name = Comp.name
    const style = getComputedStyle(el)
    // debugger
    if (['absolute', 'fixed', 'relative'].indexOf(style.position) === -1) {
      addClass(el, relativeCls)
    }
    el.appendChild(el[name].instance.$el)
  }

  function remove (el) {
    const name = Comp.name
    removeClass(el, relativeCls)
    el.removeChild(el[name].instance.$el)
  }
}
