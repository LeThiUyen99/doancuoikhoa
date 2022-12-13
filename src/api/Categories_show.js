import Resource from '@/api/resource'
import request from '@/utils/request'

class CategoryShowResource extends Resource {
  constructor() {
    super('api/public/category_show')
  }
  categoriesShowList(query) {
    return request({
      url: `/${this.uri}/list?${this.getVerify()}`,
      method: 'get',
      params: query
    })
  }
  storeCategoriesShow(resource) {
    return request({
      url: `/${this.uri}/create?${this.getVerify()}`,
      method: 'post',
      data: resource
    })
  }
  deleteCategoriesShow(body) {
    return request({
      url: `/${this.uri}/delete?${this.getVerify()}`,
      method: 'post',
      data: body
    })
  }
  updateCategoriesShow(body) {
    return request({
      url: `/${this.uri}/update?${this.getVerify()}`,
      method: 'post',
      data: body
    })
  }
  productList(id, query) {
    return request({
      url: `/${this.uri}/list_products_cms?id=${id}&${this.getVerify()}`,
      method: 'get',
      params: query
    })
  }

  /**
   * @method post
   * @param body {id,product_id}
   * id là id của danh mục
   * product_id là id sản phẩm
   */
  deleteProduct(body) {
    return request({
      url: `/${this.uri}/remove_product?${this.getVerify()}`,
      method: 'post',
      data: body
    })
  }

  /**
   * @method POST
   * @param body  {products,id}
   * id la ma category show muon them san pham
   * product_ids la mang cac id san pham
   * @returns {AxiosPromise}
   */
  addProduct(body) {
    return request({
      url: `/${this.uri}/add_products?${this.getVerify()}`,
      method: 'post',
      data: body
    })
  }

  /**
   * them nhanh san pham vao category show
   * @param body {id,shop_id,category_id,tradermark_id,tag_id}
   * @method POST
   * @returns {AxiosPromise}
   */
  addProductFast(body) {
    return request({
      url: `/${this.uri}/add_products_fast?${this.getVerify()}`,
      method: 'post',
      data: body
    })
  }
  detailCategoriesShow(id) {
    return request({
      url: `/${this.uri}/detail?id=${id}&${this.getVerify()}`,
      method: 'get'
    })
  }
}

export { CategoryShowResource as default }
