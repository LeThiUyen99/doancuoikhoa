
import Resource from '@/api/resource'
import request from '@/utils/request'

class NotificationResource extends Resource {
  constructor() {
    super('api/public/notification')
  }
  confirm(resource) {
    return request({
      url: `/${this.uri}/push?${this.getVerify()}`,
      method: 'post',
      data: resource
    })
  }
  showHistory(query) {
    return request({
      url: `/${this.uri}/list?${this.getVerify()}`,
      method: 'get',
      params: query
    })
  }
}

export { NotificationResource as default }
