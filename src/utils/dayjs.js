import Vue from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime' 
dayjs.locale('zh-cn')


dayjs.extend(relativeTime)



// 定义一个全局过滤器 可以在任何组件模板中使用了
//使用模板过滤器 仅供模板使用
// 使用的方法 {{表达式 | 过滤器名称}}
// 表达式的结果会作为结果传入过滤器中作为value
Vue.filter('relativeTime',value => {
    return dayjs().to(dayjs(value))
})


