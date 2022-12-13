import I18n from '@/lang/i18n'
export function setRules() {
  return {
    name: [
      { required: true, message: I18n.t('input_name_product'), trigger: 'blur' },
      { min: 3, max: 255, message: I18n.t('input_name_product_2'), trigger: 'blur' }
    ],
    cost: [
      { required: true, message: I18n.t('input_name_cost'), trigger: 'blur' }
    ],
    // desc: [
    //   { required: true, message: 'Vui lòng nhập mô tả', trigger: 'blur' },
    //   { min: 10, message: 'Mô tả phải nhập ít nhất 10 ký tự', trigger: 'blur' }
    // ],
    product_code: [
      { required: true, message: I18n.t('valid_vga'), trigger: 'blur' }
    ],
    price: [
      { required: true, message: I18n.t('valid_price'), trigger: 'blur' }
    ],
    listImage: [
      { required: true, message: I18n.t('valid_image'), trigger: 'blur' }
    ],
    category_id: [
      { required: true, message: I18n.t('valid_cate'), trigger: 'blur' }
    ],
    shop_id: [
      { required: true, message: I18n.t('valid_shop'), trigger: 'blur' }
    ],
    trademark_id: [
      { required: true, message: I18n.t('valid_trade'), trigger: 'blur' }
    ],
    weight: [
      { required: true, message: I18n.t('valid_weight'), trigger: 'blur' }
    ],
    product_tags: [
      { required: true, message: I18n.t('valid_tag'), trigger: 'blur' },
      { validator: checkTagIds, trigger: 'blur' }
    ]
  }
}

function checkTagIds(rule, value, callback) {
  console.log(value, 123123)
  if (value.length === 0) {
    return callback(new Error(I18n.t('valid_tag')))
  } else {
    callback()
  }
}
