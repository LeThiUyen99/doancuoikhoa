import I18n from '@/lang/i18n'
export function setRules() {
  return {
    name: [
      { required: true, message: I18n.t('valid_shop_name'), trigger: 'blur' },
      { min: 3, max: 255, message: I18n.t('valid_shop_name_2'), trigger: 'blur' }
    ],
    phone: [
      { required: true, message: I18n.t('valid_phone'), trigger: 'blur' },
      { min: 10, max: 11, message: I18n.t('valid_phone_2'), trigger: 'blur' }
    ],
    user_name: [
      { required: true, message: I18n.t('valid_full_name_shop'), trigger: 'blur' },
      { min: 3, max: 255, message: I18n.t('valid_full_name_shop_2'), trigger: 'blur' }
    ],
    address: [
      { required: true, message: I18n.t('valid_address'), trigger: 'blur' }
    ]
  }
}
