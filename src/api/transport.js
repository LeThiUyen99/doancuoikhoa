import Resource from '@/api/resource'
import request from '@/utils/request'

class TransportResource extends Resource {
  constructor() {
    super('api/public/cod')
  }
  /**
   * lấy danh sách đơn vị vận chuyển
   * @method GET
   * @returns {AxiosPromise}
   */
  listTransport(query) {
    return request({
      url: `/${this.uri}/list_transport?${this.getVerify()}`,
      method: 'get',
      params: query
    })
  }

  /**
   * update trạng thái đơn vị vận chuyển
   * @param body {id,active}
   * id là mã đơn vị vận chuyển
   * active là trạng thái hoạt động ( 0 là tắt, 1 là bật)
   * @method POST
   * @returns {AxiosPromise}
   */
  changeState(body) {
    return request({
      url: `/${this.uri}/change_state?${this.getVerify()}`,
      method: 'post',
      data: body
    })
  }
}
export { TransportResource as default }
