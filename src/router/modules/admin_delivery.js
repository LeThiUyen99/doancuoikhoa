// import i18n from '@/lang/i18n'
import Layout from '@/layout'

const deliveryAdminRouter = {
  path: '/Delivery_admin',
  component: Layout,
  redirect: '/delivery_admin/lists',
  name: 'Delivery',
  meta: {
    title: 'manage_work',
    icon: 'work'
  },
  roles: ['Delivery'],
  children: [
    {
      path: 'lists',
      component: () => import('@/views/delivery_admin/List'),
      name: 'manage_work',
      meta: { title: 'manage_work' }
    }
  ]
}
export default deliveryAdminRouter
