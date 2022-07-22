import request from '@/utils/request.js'


// 请求登录
export const login = data => {
   return request({
      method: 'POST',
      url: '/app/v1_0/authorizations',
      data
   })
}

// 发送验证码  有一分钟限制
export const sendSms = mobile => {
   return request({
      method: 'GET',
      url: `/app/v1_0/sms/codes/${mobile}`,
      mobile
   })
}

export const getinfo = () => {
   return request({
      mothed: 'GET',
      url: '/app/v1_0/user',
   })
}

export const getUserchannels = () => {
   return request({
      mothed: "GET",
      url: '/app/v1_0/user/channels'
   })
}


export const followUser = target => {
   console.log('followUser')
   return request({
      mothed: "POST",
      url: '/app/v1_0/user/followings',
      data: {
         target
      }
   })
}
export const unfollowUser = target => {
   console.log('unfollowUser')
   return request({
      mothed: "DELETE",
      url: `/app/v1_0/user/followings/${target}`,
   })
}
