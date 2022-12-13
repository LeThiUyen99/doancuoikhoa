import Layout from '@/layout'

const promotionsRouter = {
  path: '/Promotions',
  component: Layout,
  redirect: '/promotions/lists',
  name: 'Promotions',
  meta: {
    title: 'manage_promotion',
    icon: 'list-promotion'
  },
  roles: ['Promotions'],
  children: [
    {
      path: 'lists',
      component: () => import('@/views/promotions/List'),
      name: 'manage_promotion',
      meta: { title: 'manage_promotion' }
    }
  ]
}
export default promotionsRouter
