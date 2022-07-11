<template>
  <div class="login-container">
    <div class="page-nav">
      <van-nav-bar class="page-nav-bar" title="登录" >
         <van-icon  slot="left" name="cross"  color="#1e1e1e" @click="$router.back()"/>
      </van-nav-bar>
    </div>
    <div>
      <van-form ref="loginForm"  @submit="onSubmit">
        <van-field name="mobile" v-model="user.mobile" placeholder="请输入手机号"  type="number" maxlength="11" :rules="xx.mobile">
          <i class="login-icon" slot="left-icon">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-shouji"></use>
            </svg>
          </i>
        </van-field>
        <van-field name="code" v-model="user.code"  placeholder="请输入验证码" type="number" maxlength="6" :rules="xx.code">
          <i class="login-icon" slot="left-icon">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-yanzhengyanzhengma"></use>
            </svg>
          </i>
          <template #button>
            <van-count-down v-if="isCountDownShow" :time="1000 * 60"  format="ss s"  @finish="isCountDownShow = false"/>
            <van-button v-else class="login-sub" round  size="small" type="default" native-type="button"  @click="onSendSms" >发送验证码</van-button>
          </template>
        </van-field>
        <div class="login-btn-wrap" >
          <van-button block type="info" native-type="submit" class="login-btn">登录</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import {login,sendSms} from '@/api/user.js'
export default {
  name: "login",
  data(){
    return{
      user:{
        mobile:'',
        code:''
      },
      xx:{
        mobile:[{
          required:true,
          message:'请输入手机号'
        }],
        code:[{
          required:true,
          message:'请输入验证码'
        }]
      },
      isCountDownShow : false
    }
  },
  methods:{
    async onSubmit(){
      //获取表单值
       const  user = this.user
      // todo  表单的验证

      // 提交表单请求登录
        this.$toast.loading({
            message: '加载中...',
            forbidClick: true,  // 禁止背景点击
            duration: 2000   //  toast持续的时间
        });
      try{
        const res = await login(user)
        console.log('res',res)
        // token
        this.$store.commit('setUser', res.data.data)
        this.$toast.success('登录成功')
        this.$router.back()
      }catch(err) {
        if(err.response.status == 400){
        this.$toast.fail('请输入正确的手机号和验证码')
        }else{
        this.$toast.fail('登录失败，请稍后重试')
        }
      }
      // 根据请求响应结果处理后续操作
    },
    async onSendSms(){
      // 校验手机号
      console.log('xxx')
      try{
        await  this.$refs.loginForm.validate('mobile')
      }catch(err){
        return  console.log('err',err)
      }
      // 显示验证码 显示倒计时
      this.isCountDownShow = true
     // 请求发送验证码
      try{
        const res =  await sendSms(this.user.mobile)
        this.$toast('发送成功')
         console.log('res',res)
      }catch(err){
        this.isCountDownShow = false
        if(err.response.status == 429){
          this.$toast('发送太频繁了，请稍后重试')
        }else{
          this.$toast('发送失败，请稍后重试')
        }
      } 
    } 
        
  }
};
</script>

<style lang="less" scoped>
.login-container {
  .login-icon {
    font-size: 37px;
  }
  .login-sub{
    width:152px;
    height: 46px;
    line-height: 46px;
    background: #ededed;
    font-size: 22px;
  }
  .login-btn-wrap{
   padding:53px 33px;
   .login-btn{
    background-color: #56a1ef ;
    border: none;
   }
  }
}
</style>