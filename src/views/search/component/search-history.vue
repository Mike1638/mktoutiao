<template>
  <div class="search-history">
      <van-cell title="历史记录">
       <div v-if="isDeleteshow">
        <span class="delete" @click="$emit('clearhistory')">全部删除</span>
        <span class="finish"  @click="isDeleteshow = false">完成</span>
       </div>
        <van-icon  v-else  name="delete" @click="isDeleteshow = !isDeleteshow"/>
      </van-cell>
      <van-cell v-for="(value,index) in searchhistoryList" :key="index" :title="value" @click="$emit('search',value)">
        <div >
            <van-icon slot="right-icon" name="close" v-if="isDeleteshow"  @click.stop="deletehistoryitem(value,index)"/>
        </div>
      </van-cell>
  </div>
</template>

<script>
export default {
  data(){
    return{
      isDeleteshow:false
    }
  },
  props:{
    searchhistoryList:{
      type:Array,
      required:true
    }
  },
  methods:{
    deletehistoryitem(value,index){
      console.log('index',index)
      this.searchhistoryList.splice(index,1)
    },
  }
}
</script>

<style scoped lang="less">
.search-history{
  .van-cell__value{
    overflow: visible;
  }
  .delete{
    position: absolute;
    right: 60px;
    top:0;
   }
   .finish{
    position: absolute;
    right: -15px;
    top:0;
    z-index: 2;
   }
}
</style>