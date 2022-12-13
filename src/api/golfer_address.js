import Resource from '@/api/resource'
import request from '@/utils/request'
class GolferAddressResource extends Resource {
  constructor() {
    super('api/public/golfer_address')
  }
  listGolferAddress(golfer_id) {
    return request({
      url: `/${this.uri}/list?golfer_id=${golfer_id}&${this.getVerify()}`,
      method: 'get'
    })
  }
  /**
   * @method post
   * @param body {address, golfer_id, city, district, township, name, phone, is_default,
    city_viettel_post_code,city_viettel_post_id,
    district_viettel_post_code,district_viettel_post_id,
    township_viettel_post_code,township_viettel_post_id}
   */
  createAddress(body) {
    return request({
      url: `/${this.uri}/create?${this.getVerify()}`,
      method: 'post',
      data: body
    })
  }
  /**
   * @method post
   * @param body {id,phone,name}
   */
  updateInfoGolfer(body) {
    return request({
      url: `/${this.uri}/update_v2?${this.getVerify()}`,
      method: 'post',
      data: body
    })
  }
}
export { GolferAddressResource as default }
