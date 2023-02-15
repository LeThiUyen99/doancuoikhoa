import Resource from '@/api/resource'
import request from '@/utils/request'

class MessageResource extends Resource {
  constructor() {
    super('message')
  }

  list_message(query) {
    return request({
      url: `/${this.uri}/list`,
      method: 'get',
      params: query
    })
  }

  list_room(query) {
    return request({
      url: `/${this.uri}/rooms`,
      method: 'get',
      params: query
    })
  }
}

export { MessageResource as default }
