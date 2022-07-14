<template>
  <div class="channel-wrap">
    <van-cell-group :border="false">
      <van-cell title="我的频道">
        <div slot="default">
          <van-button round size="small" @click="isEdit = !isEdit">{{!isEdit ? '编辑':'完成'}}</van-button>
        </div>
      </van-cell>
    </van-cell-group>
    <van-grid :gutter="8">
      <van-grid-item class="my-channel" v-for="(value,index) in mychannel" :key="index" @click="ontagglechannel(value,index)">
        <div slot="icon" v-if="isEdit && isnochangechannel.indexOf(value.id) === -1">
          <van-icon name="close" />
        </div>
       <span slot="text" class="van-grid-item__text" :class="{active : active === index}">{{value.name}}</span>
      </van-grid-item>
    </van-grid>
    <van-cell-group :border="false">
      <van-cell title="频道推荐">
      </van-cell>
    </van-cell-group>
    <van-grid :gutter="8">
      <van-grid-item  class="edit-channel" v-for="(value,index) in recommendchannel" :key="index" :text="value.name"  icon="plus" @click="addmychannel(value)"/>
    </van-grid>
   
  </div>
</template>

<script>
import {getAllchannel,addUserchannel,deleteUserchannel} from  '@/api/allchannel.js';
import { mapState } from "vuex";
import { setItem } from '@/utils/storage';
export default {
  name: "channeledit",
  data(){
    return{
      allchannel:[],
      isEdit:false,
      isnochangechannel:[0]
    }
  },
  computed:{
     ...mapState(["user"]),
     recommendchannel(){
     return this.allchannel.filter(channel=>{ return !this.mychannel.find(item=>item.name === channel.name)})
     }
  },
  props:{
    mychannel:{
      type:Array,
      required:true
    },
    active:{
      type:Number,
      required:true
    }
  },
  created(){
   this.getloadAllchannel()
   console.log(this.user) 
  },
  methods:{
    async getloadAllchannel(){
      try{
         const {data} = await getAllchannel() 
         this.allchannel = data.data.channels     
      }catch(err){
         this.$toast.fail('获取信息失败')
      }
    },
    async addmychannel(channel){
      this.mychannel.push(channel)
      console.log(this.$store.state.user) 
      console.log(this.user) 
      // 对 我的频道 进行数据持久化处理
      if(this.user){ 
        // 已登录
      console.log('已登录')
         try{
           await addUserchannel({
            id:channel.id,
            seq:this.mychannel.length
            })
         }catch(err){
          this.$toast.fail('添加失败，请稍后再试')
         }
      }else{ 
        // 未登录
      console.log(this.$store.state.user)
        console.log('未登录')
        setItem('TOUTIAO_CHANNELS',this.mychannel)
      }
    },
    async deletemychannel(channel){
       try{
        if(this.user){
          // 已登录删除
           await deleteUserchannel(channel)     
       }else{
          // 未登录删除
          setItem('TOUTIAO_CHANNELS',this.mychannel)
        }  
       }catch(err){
        this.$toast.fail('删除失败，请稍后再试')
       }
    },
    ontagglechannel(channel,index){
      if(this.isnochangechannel.indexOf(channel.id) !== -1){
        return
      }
      if(this.isEdit){
        // true  移除channel
        if(index<=this.active){
          this.$emit('update-active',this.active-1,true)
        }
        this.mychannel.splice(index,1)
        this.deletemychannel(channel)
      }else{
        //false  跳转
       this.$emit('update-active' ,index,false)
      }
    }
     
  },


};
</script >

<style scoped lang="less">
.channel-wrap {
  padding: 85px 0;
  .van-cell__title{
    font-size: 32px;
  }
  .van-button{
    width: 104px;
    height: 48px;
    font-size: 26px;  
    color: #f85959;
    line-height: 48px;
    border: 1px solid #f85959;
  }
:deep(.my-channel){
    .van-grid-item__content{
      position: relative;
      width: 160px;
      height: 84px;
      .van-grid-item__icon-wrapper{
      position: none;
     }
    }
    .van-icon-close{
      position: absolute;
      right: -95px;
      top: -35px;
      font-size: 32px;
      z-index: 10;
    }
    .van-grid-item__text{
      font-size: 28px;
      margin-top: 0;
      &.active{
        color: #f85959;
      }
    }
   
  }
:deep(.edit-channel){
    .van-grid-item__content{
      white-space: nowrap;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      width: 160px;
      height: 84px;
   .van-grid-item__icon{
      font-size: 28px;
      padding-right: 6px;
    }
    .van-grid-item__text{
      font-size: 28px;
      margin-top: 0;
    }
    }
  }
}
</style>