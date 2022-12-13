/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const productRouter = {
  path: '/Product',
  component: Layout,
  redirect: '/product/lists',
  name: 'Product',
  meta: {
    title: 'Product',
    icon: 'product'
  },
  roles: ['Product'],
  children: [
    {
      path: 'lists',
      component: () => import('@/views/products/List'),
      name: 'manage_product',
      meta: { title: 'manage_product' }
    }
  ]
}
export default productRouter
