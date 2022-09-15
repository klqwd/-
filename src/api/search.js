import request from '@/utills/request'
/**
 * @param {*} q搜索的关键词
 * @return Promise
 */

export const getSuggestionsAPI = (q) => {
  return request({
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}

/**
 * @param{Number} page 分页页数，非必填，不填默认值1
 * @param {Number }per_page 每一页数据的数量
 * @param {String} q搜索关键词
 */

export const getResultsAPI = (page, per_page, q) => {
  return request({
    url: '/v1_0/search',
    params: {
      page,
      per_page,
      q
    }
  })
}
