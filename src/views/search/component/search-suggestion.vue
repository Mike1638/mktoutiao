<template>
  <div class="search-suggestion">
    <van-cell icon="search" v-for="(value,index) in searchsuggestion" :key="index" @click="$emit('search',value)">
       <div slot="title" class="title-sug" v-html="highlight(value)"></div>
    </van-cell>
</div>
</template>

<script>
import {getsearchsuggestion} from "@/api/search.js"
import {debounce} from "lodash"
export default {
  data(){
    return{
      searchsuggestion:[]
    }
  },
  props:{
    searchText:{
      type:String,
      required:true
    }
  },
  methods:{
    async getloadsearchsuggestion(q){
      try{
       const {data}  = await getsearchsuggestion(q)
       this.searchsuggestion = data.data.options
      }catch(err){
         this.$toast.fail('获取失败')
      }
    },
    highlight(value){
      const lighword = `<span class="active">${this.searchText}</span>`
      const reg = new RegExp(this.searchText,'gi') 
      return value.replace(reg,lighword)
    }
  },
  watch:{
   searchText: {
      handler: debounce(
        function(val, oldVal){
        this.getloadsearchsuggestion(val)
      },250
      ) ,
     immediate: true
    }
  }
}
</script>

<style scoped lang="less">
.search-suggestion{
:deep(.title-sug){
    .active{
      color:red;
    }
  }
}

</style>