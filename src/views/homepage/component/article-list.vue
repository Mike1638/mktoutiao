<template>
  <div>
    <van-pull-refresh v-model="isrefreshLoading" @refresh="onRefresh" :success-text="refreshtext"
      success-duration="1500">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" :error.sync="error"
        error-text="请求失败，点击重新加载" @load="onLoad">
        <Articleitem v-for="(article, inedx) in articles" :key="inedx" :article="article"></Articleitem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticle } from '@/api/article.js'
import Articleitem from '@/components/article-item.vue'
export default {
  name: "Articlelist",
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  components: { Articleitem },
  data() {
    return {
      list: [],// 存贮数据
      loading: false, // 
      finished: false, //
      error: false,
      isrefreshLoading: false,
      refreshtext: '刷新成功',
      articles: [],
      timestamp: 0
    };
  },
  methods: {
    async onLoad() {
      console.log(' ccc')
      try {
        const { data } = await getArticle({
          channel_id: this.channel.id,
          timestamp: this.timestamp === 0 ? 1556789000003 : this.timestamp,
          with_top: 1
        })
        const { results } = data.data
        this.articles.push(...results)
        this.loading = false;
        if (results.length) {
          this.timestamp = data.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (err) {
        console.log('err', err)
        this.error = true
        this.loading = false
      }
    },
    async onRefresh() {
      try {
        console.log('xx')
        const { data } = await getArticle({
          channel_id: this.channel.id,
          timestamp: this.timestamp === 0 ? 1556789000003 : this.timestamp,
          with_top: 1
        })
        this.timestamp = data.data.pre_timestamp
        const { results } = data.data
        console.log('results', results)
        this.articles.unshift(...results)
        this.isrefreshLoading = false
        this.refreshtext = `刷新成功，共获取${results.length}条数据`
      } catch (err) {
        this.refreshtext = `刷新失败,请重试`
        this.isrefreshLoading = false
      }
    }
  },
};
</script>

<style lang="less" scoped>
.van-list {
  height: 79vh;
  overflow-y: auto;
}
</style>