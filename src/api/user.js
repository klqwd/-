//user.js 划分是跟后端接口文档
import request from '../utills/request'
import store from '@/store'
/**
 * 获取搜索结果

 */

export const login = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: {
      mobile,
      code
    }
  })
}

/**
 * 发送验证码
 */
export const sendCodeAPI = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`
  })
}

/**
 * @return Promise
 */
export const getUserInfoAPI = () => {
  return request({
    url: '/v1_0/user',
    headers: {
      Authorization: `Bearer ${store.state.tokenObj.token}`
    }
  })
}
