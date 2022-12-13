import Resource from '@/api/resource'
import request from '@/utils/request'

class DashboardResource extends Resource {
  constructor() {
    super('api/public/tracking')
  }
  dashboardList(query) {
    return request({
      url: `/${this.uri}/dashboard?${this.getVerify()}`,
      method: 'get',
      params: query
    })
  }
  dashboardDetail(query) {
    return request({
      url: `/${this.uri}/detail?${this.getVerify()}`,
      method: 'get',
      params: query
    })
  }
  chartDetail(query) {
    return request({
      url: `/${this.uri}/chart_detail?${this.getVerify()}`,
      method: 'get',
      params: query
    })
  }
  getExportList(query) {
    return request({
      url: `/${this.uri}/exports?${this.getVerify()}`,
      method: 'get',
      params: query
    })
  }
}

export { DashboardResource as default }
