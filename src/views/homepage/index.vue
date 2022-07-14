<template>
  <div class="home-container">
    <div class="page-nav">
      <van-nav-bar class="page-nav-bar" fixed>
        <van-button slot="title"  round icon="search" size="small" class="page-nav-bar-but">搜索</van-button>
      </van-nav-bar>
    </div>
    <van-tabs v-model="active" animated swipeable class="channel-tabs">
      <van-tab  v-for="channel in userchannels"  :title="channel.name" :key="channel.id" >
      <Articlelist :channel="channel"></Articlelist>
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="iconright" @click="isshowchannelchange = true">
        <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-yuedu"></use>
          </svg>
      </div>
    </van-tabs>
    <van-popup
      v-model="isshowchannelchange"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '100%' }"
    >
    <Channeledit :mychannel="userchannels" :active="active" @update-active="changeactive"></Channeledit> 
    </van-popup>
  </div>
</template>

<script>
import { getUserchannels } from '@/api/user'
import Articlelist from './component/article-list.vue'
import Channeledit from './component/channel-edit.vue'
import { mapState } from 'vuex'
import { getItem } from '../../utils/storage'
export default {
    data() {
        return {
            active: 0,
            userchannels: [],
            isshowchannelchange : false
        };
    },
    computed: {
    ...mapState(["user"]),
    },
    components: {Articlelist,Channeledit},
    created() {
        this.loadgetuserchannels();
        console.log('this.user',this.user)
    },
    methods: {
        async loadgetuserchannels() {
            try {
              if(this.user){
                //登录
                const { data } = await getUserchannels();
                this.userchannels = data.data.channels;
                 console.log('userchannels',this.userchannels )
                }else{
                // 未登录
                  const localChannels =  getItem('TOUTIAO_CHANNELS')
                  if(localChannels){
                     this.userchannels = localChannels
                  }else{
                    //  获取默认的频道列表
                      const { data } = await getUserchannels();
                      this.userchannels = data.data.channels;
                  }
                } 
            }
            catch (err) {
                this.$toast.fail("获取频道失败");
            }
        },
        changeactive(index,close = true){
          this.active = index
          this.isshowchannelchange = close
        }
    },
}
</script>


<style scoped lang="less">
.home-container{
  padding-bottom: 100px;
  padding-top: 174px;
}
.page-nav{
  .van-nav-bar__title{
    max-width: unset;
    margin-bottom: 5px;
  }
  .page-nav-bar-but{
    width: 555px;
    height: 60px;
    border: none;
    background-color: #3082dd;
    .van-icon {
      color:black;
    }
  }
}
:deep(.channel-tabs){
  .van-tabs__wrap{
    position: fixed;
    top: 92px;
    z-index: 1;
    left: 0;
    right: 0;
    height: 82px;
  }
  .van-tab{
    min-width: 200px;
    border-right: 1px solid #edeff3;
    font-size: 30px;
    color: #777777;
  }
  .van-tabs__nav{
    padding-bottom: 0;
  } 
  .van-tab--active{
    color: #333333;
  }
  .van-tabs__line{
    bottom: 8px;
    width: 31px !important;
    height: 6px;
    background-color: #3296fa;
  }
  .placeholder{
    flex-shrink: 0;
    width: 66px;
    height: 82px;
  }
  .iconright{
    height: 82px;
    font-size: 33px;
    position: fixed;
    right:0;
    background-color: #fff;
    opacity: 0.9;
    svg{
      width: 66px;
      height: 82px;
      font-size: 33px;
    }
    &:before{
      content:"";
      position: absolute;
      left: 0;
      width: 2px;
      height: 100%;
      background-image: url(~@/assets/gradient-gray-line.png);
      background-size: contain;
    }
  }
}
</style>