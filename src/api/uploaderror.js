import Resource from '@/api/resource'
import request from '@/utils/request'

class UploadErrorResource extends Resource {
  constructor() {
    super('api/public/product_import_error')
  }
  UploadErrorList(query) {
    return request({
      url: `/${this.uri}/list?${this.getVerify()}`,
      method: 'get',
      params: query
    })
  }
  deleteUploadError() {
    return request({
      url: `/${this.uri}/delete?${this.getVerify()}`,
      method: 'get'
    })
  }
}

export { UploadErrorResource as default }
