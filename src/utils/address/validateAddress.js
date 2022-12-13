import I18n from '@/lang/i18n'
export function setRules() {
  return {
    golfer_id: [
      { required: true, message: I18n.t('valid_vga'), trigger: 'blur' }
    ],
    name: [
      { required: true, message: I18n.t('valid_name'), trigger: 'blur' },
      { min: 3, max: 255, message: I18n.t('valid_name_2'), trigger: 'blur' }
    ],
    specific_address: [
      { required: true, message: I18n.t('valid_address'), trigger: 'blur' },
      { min: 3, max: 255, message: I18n.t('valid_address_2'), trigger: 'blur' }
    ],
    phone: [
      { required: true, message: I18n.t('valid_phone'), trigger: 'blur' },
      { min: 10, max: 11, message: I18n.t('valid_phone_2'), trigger: 'blur' }
    ]
  }
}
