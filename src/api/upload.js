import request from '@/utils/request'

export function uploadApi(data) {
  return request({
    url: 'api/public/post',
    method: 'post',
    data
  })
}
