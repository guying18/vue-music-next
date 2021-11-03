import { createApp } from 'vue'
import Loading from './loading.vue'
import { addClass, removeClass } from '@/assets/js/dom.js'

const relativeCls = 'g-relative'

const loadingDirective = {
  // el： 指令绑定到的元素
  mounted (el, binding) {
    // app 对象的根组件为 Loading 组件
    const app = createApp(Loading)
    // vue 支持多实例，此实例挂载到动态创建的 div 元素上
    // 动态创建的 div 元素并没有挂载到 body 上，因此也不是实质上的 DOM 层的挂载
    // 此处 Loading 组件创建的实例是要挂载在 el 上的
    const instance = app.mount(document.createElement('div'))
    // 使用此技巧使 instance 保留在 el对象 上，以便其他生命周期可以使用
    el.instance = instance
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
    if (typeof title !== 'undefined') {
      el.instance.setTitle(title)
    }
    if (binding.value !== binding.oldValue) {
      binding.value ? append(el) : remove(el)
    }
  }
}

function append (el) {
  const style = getComputedStyle(el)
  // debugger
  if (['absolute', 'fixed', 'relative'].indexOf(style.position) === -1) {
    addClass(el, relativeCls)
  }
  el.appendChild(el.instance.$el)
}

function remove (el) {
  removeClass(el, relativeCls)
  el.removeChild(el.instance.$el)
}

export default loadingDirective
