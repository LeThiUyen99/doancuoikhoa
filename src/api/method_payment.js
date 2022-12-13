import Resource from '@/api/resource'
import request from '@/utils/request'
class PaymentResource extends Resource {
  constructor() {
    super('api/public/method_payment')
  }
  listPayment(query) {
    return request({
      url: `/${this.uri}/list?for_cms=1&${this.getVerify()}`,
      method: 'get',
      params: query
    })
  }
}
export { PaymentResource as default }
