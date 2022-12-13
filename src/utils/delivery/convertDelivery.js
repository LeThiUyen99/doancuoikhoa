import I18n from '@/lang/i18n'

export function setStateToStringDelivery(state) {
  let objectDelivery = {}
  console.log('.....................state : ', state)
  switch (state) {
    case 0:
      objectDelivery = { typeName: 'warning', textName: I18n.t('confirm_wait') }
      break
    case 1:
      objectDelivery = { typeName: 'warning', textName: I18n.t('wait_delivery') }
      break
    case 2:
      objectDelivery = { typeName: 'success', textName: I18n.t('delivery') }
      break
    case 3:
      objectDelivery = { typeName: 'success', textName: I18n.t('delivered') }
      break
    case 4:
      objectDelivery = { typeName: 'danger', textName: I18n.t('canceled') }
      break
    case 5:
      objectDelivery = { typeName: 'danger', textName: I18n.t('return_order') }
      break
    case 6:
      objectDelivery = { typeName: 'suscess', textName: I18n.t('delivery') }
  }
  return objectDelivery
}
