import Resource from '@/api/resource'
import request from '@/utils/request'

class DeliveryResource extends Resource {
  constructor() {
    super('api/public/delivery')
  }
  DeliveryList(query) {
    return request({
      url: `/${this.uri}/admin_list?${this.getVerify()}`,
      method: 'get',
      params: query
    })
  }
  DeliveryAdminList(query) {
    return request({
      url: `/${this.uri}/manager_list?${this.getVerify()}`,
      method: 'get',
      params: query
    })
  }
  storeDelivery(resource) {
    return request({
      url: `/${this.uri}/create?${this.getVerify()}`,
      method: 'post',
      data: resource
    })
  }
  updateDelivery(resource) {
    return request({
      url: `/${this.uri}/update?${this.getVerify()}`,
      method: 'post',
      data: resource
    })
  }
  updateConfirmPaid(resource) {
    return request({
      url: `/${this.uri}/confirm_paid?${this.getVerify()}`,
      method: 'post',
      data: resource
    })
  }
  onGetDeliveryDetail(id) {
    return request({
      url: `/${this.uri}/detail/${id}?${this.getVerify()}`,
      method: 'get'
    })
  }
  onFinishDelivery(body) {
    return request({
      url: `/${this.uri}/finish_delivery?${this.getVerify()}`,
      method: 'post',
      data: body
    })
  }
  /**
   * export đơn hàng
   * @param body {from_date,to_date}
   * @method POST
   * @returns {AxiosPromise}
   */
  exportDelivery(body) {
    return request({
      url: `/${this.uri}/export_delivery?${this.getVerify()}`,
      method: 'post',
      data: body
    })
  }
  /**
   * update ghi chu
   * @param body {id,shop_noted}
   * @method POST
   * @returns {AxiosPromise}
   */
  updateNote(body) {
    return request({
      url: `/${this.uri}/update_shop_noted?${this.getVerify()}`,
      method: 'post',
      data: body
    })
  }

  /**
   * lấy danh sách thời gian giao hàng
   * @method get
   */
  timeOrder() {
    return request({
      url: `${this.uri}/get_ship_cods_time?${this.getVerify()}`,
      method: 'get'
    })
  }

  /**
   * Lay thong tin golfer
   * @param {*} golfer_id
   */
  get_golfer_info(golfer_id) {
    return request({
      url: `/${this.uri}/get_golfer_info?golfer_id=${golfer_id}&${this.getVerify()}`,
      method: 'get'
    })
  }

  /**
   * Tao don hang tu cms
   * @method POST
   * @body { orders, golfer, method_payment, address, cod_ship, note }
   * trong do: orders làm mảng thông tin các sản phẩm muốn tạo đơn
   * golfer là thông tin khách hàng mua
   * method_payment là thông tin về phương thức thanh toán dạng object
   * address là địa chỉ khách nhận hàng dạng object
   * cod_ship là kiểu vận chuyển
   * note là ghi chú nếu có
   */
  create_bill(body) {
    return request({
      url: `/${this.uri}/create_from_cms?${this.getVerify()}`,
      method: 'post',
      data: body
    })
  }
  listDeliverySale(query) {
    return request({
      url: `${this.uri}/list_delivery_waiting_sale?${this.getVerify()}`,
      method: 'get',
      params: query
    })
  }
  /**
   * Update nhan vien sale cho don
   * @param {Object} body {sale_id,delivery_id}
   * @returns
   */
  updateTelesale(body) {
    return request({
      url: `${this.uri}/update_user_sale?${this.getVerify()}`,
      method: 'post',
      data: body
    })
  }
  listDaily(query) {
    return request({
      url: `${this.uri}/get_work_daily?${this.getVerify()}`,
      method: 'get',
      params: query
    })
  }

  /**
   * Tìm kiếm đơn hàng
   * @param {Object} body {keyword,type,state,page,limit}
   * method get
   * @returns
   */
  searchDelivery(query) {
    return request({
      url: `${this.uri}/search_delivery?${this.getVerify()}`,
      method: 'get',
      params: query
    })
  }
  /**
   * lay ds bang user
   * @param {Object} body {golfer_id, page, limit}
   * method get
   * @returns
   */
  userDelivery(query) {
    return request({
      url: `${this.uri}/statistical_delivery_user?${this.getVerify()}`,
      method: 'get',
      params: query
    })
  }

  updateCalled(data) {
    return request({
      url: `${this.uri}/update_called?${this.getVerify()}`,
      method: 'post',
      data: data
    })
  }
  create_bill_offline(body) {
    return request({
      url: `/${this.uri}/create_from_cms_offline?${this.getVerify()}`,
      method: 'post',
      data: body
    })
  }
  returnDelivery(id) {
    return request({
      url: `/${this.uri}/returns?id=${id}&${this.getVerify()}`,
      method: 'get'
    })
  }
  /**
   * tìm kiếm delivery
   * @param {Object} params: { id, phone, vga, date_create, date_complete,sale, state }
   * method get
   * @returns
   */
  deliverySearchFilter(query) {
    return request({
      url: `/${this.uri}/search_filter?${this.getVerify()}`,
      method: 'get',
      params: query
    })
  }
  addressList(shop_id) {
    return request({
      url: `api/public/shop_address/list?shop_id=${shop_id}&${this.getVerify()}`,
      method: 'get'
    })
  }
  changeAddress(delivery_id, shop_address_id) {
    return request({
      url: `/${this.uri}/change_address_shop_delivery?delivery_id=${delivery_id}&shop_address_id=${shop_address_id}&${this.getVerify()}`,
      method: 'get'
    })
  }
  /**
   * thêm địa chỉ shop
   * @param {Object} body: {address, shop_id, city, district, township, name,
    city_viettel_post_code, city_viettel_post_id,
    district_viettel_post_code, district_viettel_post_id,
    township_viettel_post_code, township_viettel_post_id}
   * method post
   * @returns
   */
  createAddressShop(body) {
    return request({
      url: `api/public/shop_address/create?${this.getVerify()}`,
      method: 'post',
      data: body
    })
  }
  /**
   * đổi thông tin nhận hàng
   * @param: {delivery_id: Mã đơn golfer_address_id: id địa chỉ nhận hàng}
   * method get
   * @returns
   */
  changeGolferAddress(delivery_id, golfer_address_id) {
    return request({
      url: `/${this.uri}/change_address_golfer_delivery?delivery_id=${delivery_id}&golfer_address_id=${golfer_address_id}&${this.getVerify()}`,
      method: 'get'
    })
  }
  /**
   * thêm địa chỉ shop
   * @param {Object} body: {delivery_id, address, shop_id, city, district, township, name,
    city_viettel_post_code, city_viettel_post_id,
    district_viettel_post_code, district_viettel_post_id,
    township_viettel_post_code, township_viettel_post_id}
   * method post
   * @returns
   */
  createShopAddress(body) {
    return request({
      url: `api/public/shop_address/create_and_update_delivery?${this.getVerify()}`,
      method: 'post',
      data: body
    })
  }
  // đơn vị vận chuyển
  listTransfer() {
    return request({
      url: `api/public/method_payment/list_transfer_cod?${this.getVerify()}`,
      method: 'get'
    })
  }
  /**
   * Api cập nhật mã vận đơn cho đơn hàng
   * @param {Object} body: { bill_code, trans_code, delivery_id }
bill_code là mã vận đơn mới, trans_code là code của đơn vị vận chuyển, delivery_id là id của đơn hàng
   * method post
   * @returns
   */
  updateTranport(body) {
    return request({
      url: `/${this.uri}/update_trans_bill?${this.getVerify()}`,
      method: 'post',
      data: body
    })
  }
  /**
   * Api thêm thông tin khách hàng
   * @param {Object} data: {golfer_id,weight,height,interests,noted}
   * method post
   * @returns
   */
  pushInfoBuyer(body) {
    return request({
      url: `api/public/customer/push_info?${this.getVerify()}`,
      method: 'post',
      data: body
    })
  }
  /**
   * Api cập nhật thông tin khách hàng
   * @param {Object} data: {id,weight,height,interests,noted}
   * method post
   * @returns
   */
  updateInfoBuyer(body) {
    return request({
      url: `api/public/customer/update?${this.getVerify()}`,
      method: 'post',
      data: body
    })
  }
  /**
   * Api ds thông tin khách hàng
   * @param {Object} data: {page=1&number=10}
   * method get
   * @returns
   */
  listInfoBuyer(query) {
    return request({
      url: `api/public/customer/list?${this.getVerify()}`,
      method: 'get',
      params: query
    })
  }
  deleteInfoBuyer(id) {
    return request({
      url: `api/public/customer/delete?id=${id}&${this.getVerify()}`,
      method: 'get'
    })
  }
  /**
   * Api xóa địa chỉ
   * @param id
   * method get
   * @returns
   */
  deleteAddress(id) {
    return request({
      url: `api/public/golfer_address/delete/${id}?${this.getVerify()}`,
      method: 'get'
    })
  }

  /**
   * thêm địa chỉ lấy hàng
   * @param {Object} body: {
   *   	address, //địa chỉ cụ thể(ví dụ 20 Võ chí công)
   *     golfer_id, //mã vga của khách
   *     city, //tên tỉnh
   *     district, //tên huyện
   *     township, //tên xã
   *     name, //tên người nhận hàng
   *     phone, //sdt người nhận hàng
   *     city_viettel_post_code, //ma tỉnh theo viettel
   *     city_viettel_post_id, //id tỉnh
   *     district_viettel_post_code, //mã huyện
   *     district_viettel_post_id, //id huyện
   *     township_viettel_post_code, //mã xã
   *     township_viettel_post_id //id xã
   *   }
   * method post
   * @returns
   */
  createGolferAddress(body) {
    return request({
      url: `api/public/golfer_address/create?${this.getVerify()}`,
      method: 'post',
      data: body
    })
  }
  /**
   * Api cập nhật địa chỉ
   * @param {Object} data: {
   *     name, // tên người nhận hàng hoặc tên shop
   *     address, //địa chỉ nhận hàng cụ thể, ví dụ 20 Võ chí Công
   *     city, //tên tỉnh/thành phố
   *     is_default, // mặc định chọn default là 0
   *     id, //id của địa chỉ
   *     district, //tên huyện
   *     township, //tên xã/phường
   *     phone, // sdt liên hệ lấy hàng
   *     city_viettel_post_code, //mã tỉnh
   *     city_viettel_post_id, // id của tỉnh
   *     district_viettel_post_code, // mã huyện
   *     district_viettel_post_id, // mã huyện
   *     township_viettel_post_code, // mã xã/phường
   *     township_viettel_post_id // id của xã phường
   * }
   * method post
   * @returns
   */
  updateAddress(body) {
    return request({
      url: `api/public/golfer_address/update?${this.getVerify()}`,
      method: 'post',
      data: body
    })
  }
  /**
   * Api cập nhật địa chỉ lấy hàng
   * @param {Object} data: {
   *  	address, //địa chỉ cụ thể(ví dụ 20 Võ chí công)
   *     golfer_id, //mã vga của khách
   *     city, //tên tỉnh
   *     district, //tên huyện
   *     township, //tên xã
   *     name, //tên người nhận hàng
   *     phone, //sdt người nhận hàng
   *     city_viettel_post_code, //ma tỉnh theo viettel
   *     city_viettel_post_id, //id tỉnh
   *     district_viettel_post_code, //mã huyện
   *     district_viettel_post_id, //id huyện
   *     township_viettel_post_code, //mã xã
   *     township_viettel_post_id //id xã
   * }
   * method post
   * @returns
   */
  updateGolferAddress(body) {
    return request({
      url: `api/public/golfer_address/update?${this.getVerify()}`,
      method: 'post',
      data: body
    })
  }
  /**
   * danh sách địa chỉ lấy hàng
   * @param: {page, limit, golfer_id}
   * method get
   * @returns
   */
  addressGolferList(query) {
    return request({
      url: `api/public/golfer_address/list?${this.getVerify()}`,
      method: 'get',
      params: query
    })
  }
}

export { DeliveryResource as default }
