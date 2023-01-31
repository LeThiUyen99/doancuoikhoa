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
  categoryList(cate_id) {
    return request({
      url: `/${this.uri}/category?cate_id=${cate_id}&${this.getVerify()}`,
      method: 'get'
    })
  }
  postComment(resource) {
    return request({
      url: `/comment/create?${this.getVerify()}`,
      method: 'post',
      data: resource
    })
  }
  commentList(query) {
    return request({
      url: `/${this.uri}/list_comment?${this.getVerify()}`,
      method: 'get',
      params: query
    })
  }
}

export { ListTourResource as default }
