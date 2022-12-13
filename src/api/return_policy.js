import Resource from '@/api/resource'
import request from '@/utils/request'

class ReturnPolicyResource
  extends Resource {
  constructor() {
    super('api/public/return_policy_date')
  }
  returnPolicyList(query) {
    return request({
      url: `/${this.uri}/list?${this.getVerify()}`,
      method: 'get',
      params: query
    })
  }

  //   data: {return_count_date,shop_id,status}
  storeReturnPolicy(resource) {
    return request({
      url: `/${this.uri}/create?${this.getVerify()}`,
      method: 'post',
      data: resource
    })
  }
  updateReturnPolicy(resource) {
    return request({
      url: `/${this.uri}/update?${this.getVerify()}`,
      method: 'post',
      data: resource
    })
  }
  deleteReturnPolicy(id) {
    return request({
      url: `/${this.uri}/delete?id=${id}&${this.getVerify()}`,
      method: 'get'
    })
  }
}

export { ReturnPolicyResource as default }
