import Resource from '@/api/resource'
import request from '@/utils/request'

class PointResource extends Resource {
  constructor() {
    super('api/public/point')
  }
  pointList(query) {
    return request({
      url: `/${this.uri}/list_bonus_point?${this.getVerify()}`,
      method: 'get',
      params: query
    })
  }
  pointInfo(query) {
    return request({
      url: `/${this.uri}/get_point_info?${this.getVerify()}`,
      method: 'get',
      data: query
    })
  }
  updatePoint(percent_point, id) {
    return request({
      url: `/${this.uri}/update_point?${this.getVerify()}`,
      method: 'post',
      data: { percent_point, id }
    })
  }
  storePoint(golfer_id, point, delivery_id, name_promotion, noted) {
    return request({
      url: `/${this.uri}/create_refund_point?${this.getVerify()}`,
      method: 'post',
      data: { golfer_id, point, delivery_id, name_promotion, noted }
    })
  }
}

export { PointResource as default }
