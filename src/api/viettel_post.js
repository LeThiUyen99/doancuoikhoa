import Resource from '@/api/resource'
import request from '@/utils/request'
class TransportVTResource extends Resource {
  constructor() {
    super('api/public/viettel_post')
  }
  /**
   * @method post
   * @param body {golfer_address,
        method_payment_id,
        products}
   * golfer_address là địa chỉ của khách
   * method_payment_id - là mã phương thức thanh toán
   * products : danh sách các san pham - dạng array
   */
  transportVT(body) {
    return request({
      url: `/${this.uri}/get_price_all_service_for_cms?${this.getVerify()}`,
      method: 'post',
      data: body
    })
  }
}
export { TransportVTResource as default }
