import Layout from '@/layout'

const saleRouter = {
  path: '/Sale',
  component: Layout,
  redirect: '/sale/lists',
  name: 'Sale',
  meta: {
    title: 'manage_sale',
    icon: 'sale'
  },
  roles: ['Sale'],
  children: [
    {
      path: 'lists',
      component: () => import('@/views/sale/List'),
      name: 'manage_sale',
      meta: { title: 'manage_sale' }
    }
  ]
}
export default saleRouter
