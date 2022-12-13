import I18n from '@/lang/i18n'
export function setRulesProduct() {
  return {
    product_code: [
      { required: true, message: I18n.t('valid_code'), trigger: 'blur' }
    ],
    product_name: [
      { required: true, message: I18n.t('input_name_product'), trigger: 'blur' },
      { min: 3, max: 255, message: I18n.t('valid_name_product_2'), trigger: 'blur' }
    ],
    price_buy: [
      { required: true, message: I18n.t('valid_price'), trigger: 'blur' }
    ],
    price: [
      { required: true, message: I18n.t('valid_price'), trigger: 'blur' }
    ],
    count: [
      { required: true, message: I18n.t('inpur_quantily'), trigger: 'blur' }
    ],
    shop_id: [
      { required: true, message: I18n.t('valid_shop'), trigger: 'blur' }
    ]
  }
}
export function setRules() {
  return {
    method_payment_id: [
      { required: true, message: I18n.t('error_select_method_payment'), trigger: 'blur' }
    ],
    fullname: [
      { required: true, message: I18n.t('valid_name'), trigger: 'blur' },
      { min: 3, max: 255, message: I18n.t('valid_name_2'), trigger: 'blur' }
    ],
    phone_golfer: [
      { required: true, message: I18n.t('valid_phone'), trigger: 'blur' },
      { max: 10, message: I18n.t('valid_phone_2'), trigger: 'blur' }
    ],
    golfer_address: [
      { required: true, message: I18n.t('valid_address'), trigger: 'blur' },
      { max: 10, message: I18n.t('valid_address_2'), trigger: 'blur' }
    ],
    time_order_id: [
      { required: true, message: I18n.t('valid_time_order'), trigger: 'blur' }
    ],
    transfer_id: [
      { required: true, message: I18n.t('valid_transportation'), trigger: 'blur' }
    ],
    transport_title: [
      { required: true, message: I18n.t('valid_transport_title'), trigger: 'blur' }
    ],
    salary_ship: [
      { required: true, message: I18n.t('valid_price'), trigger: 'blur' }
    ]
  }
}
