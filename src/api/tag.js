import Resource from '@/api/resource'
import request from '@/utils/request'

class TagResource extends Resource {
  constructor() {
    super('api/public/tags')
  }
  tagList(query) {
    return request({
      url: `/${this.uri}/list?${this.getVerify()}`,
      method: 'get',
      params: query
    })
  }
  storeTag(resource) {
    return request({
      url: `/${this.uri}/create?${this.getVerify()}`,
      method: 'post',
      data: resource
    })
  }
  updateTag(resource) {
    return request({
      url: `/${this.uri}/update?${this.getVerify()}`,
      method: 'post',
      data: resource
    })
  }
  deleteTag(id) {
    return request({
      url: `/${this.uri}/delete/${id}?${this.getVerify()}`,
      method: 'get'
    })
  }
  tagListOption(query) {
    return request({
      url: `/${this.uri}/list_option?${this.getVerify()}`,
      method: 'get',
      params: query
    })
  }
}

export { TagResource as default }
