import Layout from '@/layout'

const customerRouter = {
  path: '/Customer',
  component: Layout,
  redirect: '/customer/lists',
  name: 'Customer',
  meta: {
    title: 'manage_customer',
    icon: 'customer'
  },
  roles: ['Customer'],
  children: [
    {
      path: 'lists',
      component: () => import('@/views/customer/List'),
      name: 'manage_customer',
      meta: { title: 'manage_customer' }
    }
  ]
}
export default customerRouter
