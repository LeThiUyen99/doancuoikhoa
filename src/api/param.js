import Resource from '@/api/resource'
import request from '@/utils/request'

class ParamResource extends Resource {
  constructor() {
    super('api/public/first_second')
  }
  ParamList(query) {
    return request({
      url: `/${this.uri}/list?${this.getVerify()}`,
      method: 'get',
      params: query
    })
  }
  storeParam(resource) {
    return request({
      url: `/${this.uri}/create?${this.getVerify()}`,
      method: 'post',
      data: resource
    })
  }
  deleteParam(id) {
    return request({
      url: `/${this.uri}/delete/${id}?${this.getVerify()}`,
      method: 'get'
    })
  }
}

export { ParamResource as default }
