import Resource from '@/api/resource'
import request from '@/utils/request'

class ProductResource extends Resource {
  constructor() {
    super('api/public/product')
  }
  listProduct(query) {
    return request({
      url: `/${this.uri}/list_cms?${this.getVerify()}`,
      method: 'get',
      params: query
    })
  }
  DetailProduct(id) {
    return request({
      url: `/${this.uri}/detail_cms/${id}?${this.getVerify()}`,
      method: 'get'
    })
  }
  Detail(id) {
    return request({
      url: `/${this.uri}/detail_cms_v1?id=${id}&${this.getVerify()}`,
      method: 'get'
    })
  }
  storeProduct(resource) {
    return request({
      url: `/${this.uri}/create?${this.getVerify()}`,
      method: 'post',
      data: resource
    })
  }
  updateProduct(resource) {
    console.log('..................update product: ', JSON.stringify(resource))
    return request({
      url: `/${this.uri}/update_cms?${this.getVerify()}`,
      method: 'post',
      data: resource
    })
  }
  deleteProduct(id) {
    return request({
      url: `/${this.uri}/delete/${id}?${this.getVerify()}`,
      method: 'get'
    })
  }
  deleteParam(id) {
    return request({
      url: `/${this.uri}/delete_params_cms?${this.getVerify()}`,
      method: 'post',
      data: { id }
    })
  }
  importFileProduct(data) {
    return request({
      url: `/${this.uri}/save?${this.getVerify()}`,
      method: 'post',
      data
    })
  }
  statusProduct(id) {
    return request({
      url: `/${this.uri}/status/${id}?${this.getVerify()}`,
      method: 'get'
    })
  }
  sortProduct(data) {
    const query = Object.keys(data).map(key => `${key}=${data[key]}`).join('&')
    console.log('..................... quey sort data,', `${this.uri}/sort_type?${query}`)
    return request({
      url: `/${this.uri}/sort_type?${query}&${this.getVerify()}`,
      method: 'get'
    })
  }
  getExportList(query) {
    return request({
      url: `/${this.uri}/export_data?${this.getVerify()}`,
      method: 'get',
      params: query
    })
  }
  createQuantity(resource) {
    return request({
      url: `/${this.uri}/create_quantity?${this.getVerify()}`,
      method: 'post',
      data: resource
    })
  }
  updateQuantity(resource) {
    return request({
      url: `/${this.uri}/update_quantity?${this.getVerify()}`,
      method: 'post',
      data: resource
    })
  }
  getProduct(product_id, shop_id) {
    return request({
      url: `/${this.uri}/get_product_info?product_id=${product_id}&shop_id=${shop_id}&${this.getVerify()}`,
      method: 'get'
    })
  }
  checkProduct(params_id, count) {
    return request({
      url: `${this.uri}/check_count_number?params_id=${params_id}&count=${count}&${this.getVerify()}`,
      method: 'get'
    })
  }
  /**
   * Cap nhat lai link chinh sach doi tra
   * @param {*} data
   * @returns
   */
  updateReturnPolicyLink(data) {
    return request({
      url: `${this.uri}/update_return_policy?${this.getVerify()}`,
      method: 'post',
      data: data
    })
  }
  // api cập nhật số lượng tồn kho
  // method: POST
  // body: {path_exel}
  importFileInventory(body) {
    return request({
      url: `/${this.uri}/update_quantity_from_excel?${this.getVerify()}`,
      method: 'post',
      data: body
    })
  }
}

export { ProductResource as default }
