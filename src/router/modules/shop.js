/** When your routing table is too long, you can split it into small modules **/
import Layout from '@/layout'

const shopRouter = {
  path: '/Shop',
  component: Layout,
  redirect: '/shop/lists',
  name: 'Shop',
  meta: {
    title: 'manage_shop',
    icon: 'shop'
  },
  roles: ['Shop'],
  children: [
    {
      path: 'lists',
      component: () => import('@/views/shop/List'),
      name: 'manage_shop',
      meta: { title: 'manage_shop' }
    }
  ]
}
export default shopRouter
