import Resource from '@/api/resource'
import request from '@/utils/request'

class ReviewResource extends Resource {
  constructor() {
    super('api/public/review')
  }
  reviewList(query) {
    return request({
      url: `/${this.uri}/list?${this.getVerify()}`,
      method: 'get',
      params: query
    })
  }
}

export { ReviewResource as default }
