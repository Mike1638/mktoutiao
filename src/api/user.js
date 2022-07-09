import request from '@/utils/request.js'


// 请求登录
export const login = data=>{
   return request({
    method:'POST',
    url: '/app/v1_0/authorizations',
    data
   })
}

// 发送验证码  有一分钟限制
export const sendSms = mobile=>{
   return request({
    method:'GET',
    url: `/app/v1_0/sms/codes/${mobile}`,
    mobile
   })
}