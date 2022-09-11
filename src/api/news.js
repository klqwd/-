import request from '@/utills/request'

/**
 *获取文章
 @param
 */
export const getArticles = (id, timestamp) => {
  return request({
    url: '/v1_0/articles',
    params: {
      channel_id: id,
      timestamp: timestamp
    }
  })
}
