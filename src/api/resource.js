import request from '@/utils/request'
import { getAcountInfo } from '@/utils/auth'
const account = getAcountInfo()
const version_cms = 1

/**
 * Simple RESTful resource class
 */
class Resource {
  constructor(uri) {
    this.uri = uri
  }

  getVerify() {
    if (account && account.id) {
      // return `uid=${account.id}&token=${getToken()}&cms=${version_cms}`
      return `uid=${account.id}&cms=${version_cms}`
    } else {
      return `cms=${version_cms}`
    }
  }

  list(query) {
    return request({
      url: '/' + this.uri,
      method: 'get',
      params: query
    })
  }
  get(id) {
    return request({
      url: '/' + this.uri + '/' + id,
      method: 'get'
    })
  }
  store(resource) {
    return request({
      url: '/' + this.uri,
      method: 'post',
      data: resource
    })
  }
  update(id, resource) {
    return request({
      url: '/' + this.uri + '/' + id,
      method: 'put',
      data: resource
    })
  }
  destroy(id) {
    return request({
      url: '/' + this.uri + '/' + id,
      method: 'delete'
    })
  }
}

export { Resource as default }
