import Resource from '@/api/resource'
import request from '@/utils/request'

class BlogResource extends Resource {
  constructor() {
    super('blog')
  }
  blogList(query) {
    return request({
      url: `/${this.uri}/list?${this.getVerify()}`,
      method: 'get',
      params: query
    })
  }
  detailBlog(id) {
    return request({
      url: `/${this.uri}/detail-blog?id=${id}&${this.getVerify()}`,
      method: 'get'
    })
  }
  blogSame(id) {
    return request({
      url: `/${this.uri}/blog_same/${id}?${this.getVerify()}`,
      method: 'get'
    })
  }
  blogNew(query) {
    return request({
      url: `/${this.uri}/new_blog?${this.getVerify()}`,
      method: 'get',
      params: query
    })
  }
}

export { BlogResource as default }
