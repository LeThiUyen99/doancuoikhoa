import Layout from '@/layout'

const voucherRouter = {
  path: '/Voucher',
  component: Layout,
  redirect: '/voucher/lists',
  name: 'BillManage',
  meta: {
    title: 'manage_voucher',
    icon: 'voucher'
  },
  roles: ['BillManage'],
  children: [
    {
      path: 'lists',
      component: () => import('@/views/voucher/List'),
      name: 'manage_voucher',
      meta: { title: 'manage_voucher' }
    }
  ]
}
export default voucherRouter
