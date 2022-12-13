import Resource from '@/api/resource'
import request from '@/utils/request'

class ChartResource extends Resource {
  constructor() {
    super('api/public/tracking')
  }
  chartList(query) {
    return request({
      url: `/${this.uri}/list?${this.getVerify()}`,
      method: 'get',
      params: query
    })
  }
}

export { ChartResource as default }
