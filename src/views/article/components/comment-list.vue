<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    :error="error"
    error-text="加载失败，请点击重试"
    @load="onLoad"
  >
    <van-cell
      v-for="(item, inedx) in list"
      :key="inedx"
      :title="item.content"
    />
  </van-list>
</template>

<script>
import { getcomment } from "@/api/comment.js";
export default {
  name: "CommentList",
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 10,
      error: false,
    };
  },
  props: {
    source: {
      type: [Number, String, Object],
      required: true,
    },
  },
  created() {
    this.onLoad();
  },
  methods: {
    async onLoad() {
      // 异步更新数据
      try {
        const { data } = await getcomment({
          type: "a",
          source: this.source,
          offset: this.offset, // 1586711526
          limit: this.limit,
        });
        console.log("data", data.data.total_count);
        this.$emit("settotalcount", data.data.total_count);
        const { results } = data.data;
        this.list.push(...results);
        this.loading = false;
        if (results.length) {
          this.offset = data.data.last_id;
        } else {
          this.finished = true;
        }

        // 数据全部加载完成
      } catch (error) {
        this.error = true;
        this.loading = false;
        console.log("error", error);
      }
    },
  },
};
</script>

<style>
</style>