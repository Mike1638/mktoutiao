<template>
  <van-button
    :icon="isliked === 1 ? 'good-job' : 'good-job-o'"
    :class="{ liked: isliked === 1 }"
    @click="toggle"
    :loading="isloading"
  />
</template>

<script>
import { likeArticle, unlikeArticle } from "@/api/article.js";
export default {
  name: "LikeArticle",
  model: {
    prop: "isliked",
    event: "update-isliked",
  },
  data() {
    return {
      isloading: false,
    };
  },
  props: {
    isliked: {
      type: Number,
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
        if (this.isliked === 1) {
          //取消关注
          await unlikeArticle(this.artid);
          this.$emit("update-isliked", -1);
        } else {
          // 关注
          await likeArticle(this.artid);
          this.$emit("update-isliked", 1);
        }
        this.$toast.success(this.isliked === -1 ? "点赞成功" : "取消点赞");
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
.liked {
  .van-icon {
    color: red;
  }
}
</style>