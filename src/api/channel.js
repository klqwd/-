import request from '@/utills/request'
/**
 * 获取用户自己的频道
 * @returns Promise
 */
export const getChannelAPI = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}

/**
 * 获取所有频道
 * @returns Promise
 */
export const getAllChannelAPI = () => {
  return request({
    url: '/v1_0/channels'
  })
}

/**
 *
 */
export const delChannelAPI = (id) => {
  return request({
    url: `/v1_0/user/channels/${id}`,
    method: 'DELETE'
  })
}

/**{string|Number} id 新增频道的id
 * {Number} seq 新增频道添加的索引值
 */
export const addChannelAPI = (id, seq) => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channel: [{ id, seq }]
    }
  })
}
