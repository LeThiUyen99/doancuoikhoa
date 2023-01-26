import Resource from '@/api/resource'
import request from '@/utils/request'

class ListTourResource extends Resource {
  constructor() {
    super('list_tour')
  }
  tourList(query) {
    return request({
      url: `/${this.uri}/list?${this.getVerify()}`,
      method: 'get',
      params: query
    })
  }
  detail(id) {
    return request({
      url: `/${this.uri}/detail?id=${id}&${this.getVerify()}`,
      method: 'get'
    })
  }
}

export { ListTourResource as default }
