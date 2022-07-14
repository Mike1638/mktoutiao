<template>
  <div class="my-container">
    <div class="header notlogin" v-if="!user">
      <div class="mybcgwrp" @click="$router.push('/login')">
        <img src="~@/assets/mobile.png" alt="" />
        <span class="text"> 登录/注册 </span>
      </div>
    </div>
    <div class="header login" v-else>
      <div class="login-container">
        <div class="left">
          <van-image
            :src="userinfo.photo"
            round
            width="80"
            height="80"
            fit="cover"
          />
          <span class="text">{{ userinfo.name }}</span>
        </div>
        <div class="right">
          <van-button round size="small">编辑资料</van-button>
        </div>
      </div>
      <div>
        <ul class="chooseitem">
          <li>
            <span class="number">{{ userinfo.art_count }}</span>
            <span class="text">头条</span>
          </li>
          <li>
            <span class="number">{{ userinfo.follow_count }}</span>
            <span class="text">关注</span>
          </li>
          <li>
            <span class="number">{{ userinfo.fans_count }}</span>
            <span class="text">粉丝</span>
          </li>
          <li>
            <span class="number">{{ userinfo.like_count }}</span>
            <span class="text">获赞</span>
          </li>
        </ul>
      </div>
    </div>
    <div>
      <van-grid :column-num="2">
        <van-grid-item icon="photo-o" text="历史">
          <i slot="icon">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-shouji"></use>
            </svg>
          </i>
        </van-grid-item>
        <van-grid-item icon="photo-o" text="收藏">
          <i slot="icon">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-shouji"></use>
            </svg>
          </i>
        </van-grid-item>
      </van-grid>
    </div>
    <van-cell-group>
      <van-cell title="消息通知" is-link to="index" />
      <van-cell title="小爱同学" is-link to="index" />
    </van-cell-group>
    <van-button plain block class="quit" v-if="user" @click="onquit"
      >退出登录</van-button
    >
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getinfo } from "@/api/user.js";
export default {
  data(){
    return {
      userinfo: {},
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  created() {
    if (this.user) {
    console.log('this.uesr',this.user )
      this.loadgetinfo();
    }
  },
  methods: {
    onquit() {
      this.$dialog
        .confirm({
          title: "退出登录",
          message: "确认退出登录吗？",
        })
        .then(() => {
          this.$store.commit("setUser", null);
        })
        .catch(() => {
          // on cancel
        });
    },
    async loadgetinfo() {
      try {
        const {data} = await getinfo();
        console.log("dataxxx", data);
        this.userinfo = data.data;
      } catch (err) {
        this.$toast("获取数据失败，请稍后重试");
      }
    },
  },
};
</script>

<style scoped lang="less">
.header {
  background: url("~@/assets/banner.png");
  background-image: cover;
  &.notlogin {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 361px;
    .mybcgwrp {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      img {
        height: 132px;
        width: 132px;
      }
      span {
        padding-top: 20px;
        font-size: 28px;
        color: white;
      }
    }
  }
  &.login {
    padding: 30px 10px;
    .login-container {
      padding: 20px 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        justify-content: center;
        align-items: center;
        .text {
          padding-left: 10px;
          font-size: 33px;
          color: white;
        }
      }
    }
    .chooseitem {
      padding-top: 30px;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      li {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: white;
        .number {
          font-size: 36px;
        }
        .text {
          font-size: 23px;
        }
      }
    }
  }
}
.quit {
  margin-top: 20px;
  border-radius: 20px;
}
</style>