<template>
  <div>
    <van-cell>
      <div slot="title">{{ article.title }}</div>
      <div slot="label">
        <div  v-show="article.cover.type === 3" class="img-cover">
          <div class="img-cover-img" v-for="(img,inedx) in article.cover.images" :key="inedx">
            <van-image
              width="100"
              height="100"
              :src="img"
            />
          </div>
        </div>
        <span slot="title">{{ article.aut_name }}</span>
        <span slot="title">{{ article.comm_count }}</span>
        <span slot="title">{{ article.pubdate }}</span>
      </div>
      <van-image
        v-show="article.cover.type === 1"
        width="100"
        height="100"
        :src="article.cover.images[0]"
      />
    </van-cell>
  </div>
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
</style>