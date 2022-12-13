import Resource from '@/api/resource'
import request from '@/utils/request'

class RevenueResource extends Resource {
  constructor() {
    super('api/public/revenue')
  }
  revenueList(query) {
    return request({
      url: `/${this.uri}/list?${this.getVerify()}`,
      method: 'get',
      params: query
    })
  }
  getExportList(query) {
    return request({
      url: `api/public/revenue/export?${this.getVerify()}`,
      method: 'get',
      params: query
    })
  }
}

export { RevenueResource as default }
