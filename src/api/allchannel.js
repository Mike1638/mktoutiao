import request from '@/utils/request.js'

export const getAllchannel = ()=>{
    return request({
        method:'GET',
        url:'/app/v1_0/channels'
    })
}


export const addUserchannel = channel=>{
    return request({
        method:'PATCH',
        url:'/app/v1_0/user/channels',
        data:{
            channels:[channel]
        }
    })
}


export const deleteUserchannel = channel=>{
    return request({
        method:'DELETE',
        url:`/app/v1_0/user/channels/${channel.id}`
    })
}