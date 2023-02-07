import I18n from '@/lang/i18n'

export function setStateToStringDelivery(active) {
  let objectDelivery = {}
  console.log('.....................state : ', active)
  switch (active) {
    case 0:
      objectDelivery = { typeName: 'warning', textName: I18n.t('confirm_wait') }
      break
    case 1:
      objectDelivery = { typeName: 'success', textName: I18n.t('confirmation_complete') }
      break
    case 2:
      objectDelivery = { typeName: 'danger', textName: I18n.t('cancel_tour') }
  }
  return objectDelivery
}
