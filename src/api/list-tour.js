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
  tourSame(id) {
    return request({
      url: `/${this.uri}/tour_same/${id}?${this.getVerify()}`,
      method: 'get'
    })
  }
  hotTour(query) {
    return request({
      url: `/${this.uri}/tour_hot?${this.getVerify()}`,
      method: 'get',
      params: query
    })
  }

  cateList(query) {
    return request({
      url: `/${this.uri}/list_cate?${this.getVerify()}`,
      method: 'get',
      params: query
    })
  }
  getCountryList(query) {
    return request({
      url: `/tour/country?${this.getVerify()}`,
      method: 'get',
      params: query
    })
  }
  storeBookTour(resource) {
    return request({
      url: `/book_tour/create?${this.getVerify()}`,
      method: 'post',
      data: resource
    })
  }
}

export { ListTourResource as default }
