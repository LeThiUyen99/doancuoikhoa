import request from '@/utils/request'

export function uploadImgApi(data) {
  return request({
    url: 'api/public/upload',
    method: 'post',
    data
  })
}
