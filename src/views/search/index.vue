<template>
  <div>
    <form action="/">
      <van-search
        v-model="searchtext"
        show-action
        background="#1378e5"
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultshow = false"
      />
    </form>
    <SearchResult  v-if="isResultshow"  :search-text="searchtext"/>
    <SearchSuggestion v-else-if="searchtext" :search-text="searchtext" @search="onSearch"/>
    <SearchHistory :searchhistoryList="searchhistoryList" v-else @clearhistory="searchhistoryList= []" @search="onSearch"/> 
  </div>
</template>

<script>
import SearchHistory from "./component/search-history.vue";
import SearchResult from "./component/search-result.vue";
import SearchSuggestion from "./component/search-suggestion.vue";
export default {
  name: "search",
  data(){
    return{
       searchtext:'',
       isResultshow:false,
       searchhistoryList:[]
    }
  },
  methods:{
    onSearch(val){
      this.searchtext = val

      // 搜索记录不能重复  最近的搜索记录要放在前面
      const index = this.searchhistoryList.indexOf(val) 
      if( index !== -1){
        this.searchhistoryList.splice(index,1)
      }
      this.searchhistoryList.unshift(val)
      //
      this.isResultshow =true
    },
    onCancel(){
      this.$router.back()
    }
  },
  components: { SearchHistory, SearchResult, SearchSuggestion },
};
</script>

<style>
</style>