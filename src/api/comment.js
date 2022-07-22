import request from "../utils/request";

export const getcomment = params => {
    return request({
        method: "GET",
        url: '/app/v1_0/comments',
        params
    })
}