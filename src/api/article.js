import request from "../utils/request"
export const getArticle = params => {
    return request({
        method: 'GET',
        url: '/app/v1_1/articles',
        params
    })
}

export const getArticlebyId = articleID => {
    return request({
        method: 'GET',
        url: `/app/v1_0/articles/${articleID}`,
    })
}


export const collectArticle = target => {
    return request({
        method: 'POST',
        url: '/app/v1_0/article/collections',
        data: {
            target
        }
    })
}

export const uncollectArticle = target => {
    return request({
        method: 'DELETE',
        url: `/app/v1_0/article/collections/${target}`,
    })
}

export const likeArticle = target => {
    return request({
        method: 'POST',
        url: '/app/v1_0/article/likings',
        data: {
            target
        }
    })
}

export const unlikeArticle = target => {
    return request({
        method: 'DELETE',
        url: `/app/v1_0/article/likings/${target}`,
    })
}