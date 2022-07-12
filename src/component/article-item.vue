<template>
    <van-cell class="article-wrap">
      <div slot="title" class="title van-multi-ellipsis--l2">{{ article.title }}</div>
      <div slot="label" class="label-wrap">
        <div  v-if="article.cover.type === 3" class="img-cover">
          <div v-for="(img,inedx) in article.cover.images" :key="inedx" class="img-cover-item">
            <van-image
            class="img-cover-img" 
            slot="default"
            fit="cover" 
            :src="img"
            />
          </div>
        </div>
        <div class="label-info-wrap">
          <span slot="title">{{ article.aut_name }}</span>
          <span slot="title">{{ article.comm_count }}评论</span>
          <span slot="title">{{ article.pubdate | relativeTime }}</span>
        </div>
      </div>
      <van-image
        v-if="article.cover.type === 1"
        slot="default"
        class="right-img"
        fit="cover"
        :src="article.cover.images[0]"
      />
    </van-cell>  
</template>

<script>
export default {
  name: "Articleitem",
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped lang="less">
.article-wrap{
  .title{
    font-size: 32px;
    color:#3a3a3a;
  }
  .van-cell__value{
    flex:unset;
    width: 232px;
    height: 146px;
    .right-img{
      width: 232px;
      height: 146px;
      padding-left: 25px;
    }
  }
  .label-wrap{
    .label-info-wrap{
      span{
        font-size: 22px;
        margin-right:25px;
      }
    }
    .img-cover{
    display: flex;
    padding:30px 0;
    .img-cover-item{
     flex:1;
     height:146px;
     &:not(:last-child){
      padding-right:4px;
     }
    .img-cover-img{
      width: 100%;
      height: 146px;
    }
    }
  }
  }
  
} 
</style>