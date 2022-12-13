import I18n from '@/lang/i18n'
export function setRules() {
  return {
    phone: [
      { required: true, message: I18n.t('valid_phone'), trigger: 'blur' },
      { max: 10, message: I18n.t('valid_phone_2'), trigger: 'blur' }
    ],
    email: [
      { required: true, message: I18n.t('valid_mail'), trigger: 'blur' }
    ],
    password: [
      { required: true, message: I18n.t('valid_pass'), trigger: 'blur' },
      { min: 6, message: I18n.t('valid_pass_2'), trigger: 'blur' }
    ]
  }
}
