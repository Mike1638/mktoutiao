<template>
  <van-button
    :icon="iscollected ? 'star' : 'star-o'"
    :class="{ collected: iscollected }"
    @click="toggle"
    :loading="isloading"
  />
</template>

<script>
import { collectArticle, uncollectArticle } from "@/api/article.js";
export default {
  name: "CollectArticle",
  model: {
    prop: "iscollected",
    event: "update-iscollected",
  },
  data() {
    return {
      isloading: false,
    };
  },
  props: {
    iscollected: {
      type: Boolean,
      required: true,
    },
    artid: {
      type: [Number, String, Object],
      required: true,
    },
  },
  methods: {
    async toggle() {
      this.loading = true;
      try {
        if (this.iscollected) {
          //取消关注
          await uncollectArticle(this.artid);
        } else {
          // 关注
          await collectArticle(this.artid);
        }
        this.$emit("update-iscollected", !this.iscollected);
        this.$toast.success(!this.iscollected ? "收藏成功" : "取消收藏");
      } catch (error) {
        this.$toast("网络异常，请重试！");
      }
      this.loading = false;
    },
  },
};
</script>

<style lang="less" scoped>
.van-button:active::before {
  opacity: 0;
}
.collected {
  .van-icon {
    color: red;
  }
}
</style>