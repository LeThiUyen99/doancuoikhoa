import Resource from '@/api/resource'
import request from '@/utils/request'

class ActivityResource extends Resource {
  constructor() {
    super('api/public/activity')
  }
  activityList(query) {
    return request({
      url: `/${this.uri}/list?${this.getVerify()}`,
      method: 'get',
      params: query
    })
  }
}

export { ActivityResource as default }
