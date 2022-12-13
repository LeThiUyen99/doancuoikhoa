import Layout from '@/layout'

const discountRouter = {
  path: '/Discount',
  component: Layout,
  redirect: '/discount/lists',
  name: 'Discount',
  meta: {
    title: 'manage_discount',
    icon: 'discount'
  },
  roles: ['Discount'],
  children: [
    {
      path: 'lists',
      component: () => import('@/views/discount/List'),
      name: 'manage_discount',
      meta: { title: 'manage_discount' }
    }
  ]
}
export default discountRouter
