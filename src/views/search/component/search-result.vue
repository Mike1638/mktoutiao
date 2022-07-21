<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="(value,index) in list" :key="index" :title="value.title" />
    </van-list>
  </div>
</template>

<script>
import { getsearchresult } from "@/api/search.js";
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page:1,
      per_page:20
    };
  },
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  methods: {
    async onLoad() {
      try {
        if(this.searchText ==="") return
        // 1. 请求获取数据
        const {data} =  await getsearchresult({
        page:this.page,
        per_page:this.per_page,
        q:this.searchText
        })
        console.log('data',data.data.results)
        // 2. 将数据放在数组中
        const {results} = data.data
        this.list.push(...results)
        // 3. 将本次的loading关闭
        this.loading = false;
        // 4. 判断是否还有数据
        if(results.length <= 20 ){
          this.page++
        }else{
          this.loading = true
        }
        // 5.  有 则更新获取下一个数据的页面
        // 6. 没有 则将加载状态 finished 设置为结束
        // 加载状态结束
       

        // 数据全部加载完成
        
      } catch (err) {
        this.$toast.fail('获取数据失败')
      }
    },
  },
};
</script>

<style>
</style>