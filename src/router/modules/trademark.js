/** When your routing table is too long, you can split it into small modules **/
import Layout from '@/layout'

const trademarkRouter = {
  path: '/Trademarks',
  component: Layout,
  redirect: '/trademarks/lists',
  name: 'Trademarks',
  meta: {
    title: 'tradermark_manage_title',
    icon: 'trademarked'
  },
  roles: ['Trademarks'],
  children: [
    {
      path: 'lists',
      component: () => import('@/views/trademarks/List'),
      name: 'tradermark_manage_title',
      meta: { title: 'tradermark_manage_title' }
    }
  ]
}
export default trademarkRouter
