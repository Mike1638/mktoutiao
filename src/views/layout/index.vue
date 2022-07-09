<template>
  <div>
    <router-view />
    <van-tabbar route>
      <van-tabbar-item to="/" >
       <i slot="icon">
          <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-shouji"></use>
          </svg>
       </i>
       <span>首页</span>
      </van-tabbar-item>
      <van-tabbar-item to="/qa">
       <i slot="icon">
          <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-shouji"></use>
          </svg>
       </i>
       <span>问答</span>
      </van-tabbar-item>
      <van-tabbar-item to="/video">
       <i slot="icon">
          <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-shouji"></use>
          </svg>
       </i>
       <span>视频</span>
      </van-tabbar-item>
      <van-tabbar-item to="/my">
       <i slot="icon">
          <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-shouji"></use>
          </svg>
       </i>
       <span>我的</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {};
</script>

<style scoped  lang="less">
</style>