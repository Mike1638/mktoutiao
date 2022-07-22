<template>
  <van-button
    v-if="isFollowed"
    class="follow-btn"
    round
    size="small"
    @click="tagglefollow"
    :loading="isloading"
    >已关注
  </van-button>
  <van-button
    v-else
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    @click="tagglefollow"
    :loading="isloading"
    >关注
  </van-button>
</template>

<script >
import { followUser, unfollowUser } from "@/api/user.js";
export default {
  name: "FollowUser",
  model: {
    prop: "isFollowed",
    event: "update-isFollowed",
  },
  data() {
    return {
      isloading: false,
    };
  },
  props: {
    isFollowed: {
      type: Boolean,
      required: true,
    },
    userId: {
      type: [Number, String, Object],
      required: true,
    },
  },
  methods: {
    async tagglefollow() {
      this.isloading = true;
      try {
        if (this.isFollowed) {
          //取消关注
          await unfollowUser(this.userId);
        } else {
          //关注
          await followUser(this.userId);
        }
        this.$emit("update-isFollowed", !this.isFollowed);
      } catch (error) {
        console.log("error", error);
        if (error.response && error.response.status === 400) {
          this.$toast.fail("无法关注自己");
        } else {
          this.$toast.fail("网络异常，请稍后再试");
        }
      }
      this.isloading = false;
    },
  },
};
</script>

<style lang="less" scoped>
</style>
