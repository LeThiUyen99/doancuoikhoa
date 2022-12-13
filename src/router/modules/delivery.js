// import i18n from '@/lang/i18n'
import Layout from '@/layout'

const deliveryRouter = {
  path: '/Delivery',
  component: Layout,
  redirect: '/delivery/lists',
  name: 'Delivery',
  meta: {
    title: 'manage_delivery',
    icon: 'orders'
  },
  roles: ['Delivery'],
  children: [
    {
      path: 'lists',
      component: () => import('@/views/delivery/List'),
      name: 'manage_delivery',
      meta: { title: 'manage_delivery' }
    }
  ]
}
export default deliveryRouter
