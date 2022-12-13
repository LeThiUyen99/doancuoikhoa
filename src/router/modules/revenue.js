import Layout from '@/layout'

const revenueRouter = {
  path: '/Revenue',
  component: Layout,
  redirect: '/revenue/lists',
  name: 'Revenue',
  meta: {
    title: 'revenue_list',
    icon: 'revenue'
  },
  roles: ['Revenue'],
  children: [
    {
      path: 'lists',
      component: () => import('@/views/revenue/List'),
      name: 'revenue_list',
      meta: { title: 'revenue_list' }
    }
  ]
}
export default revenueRouter
