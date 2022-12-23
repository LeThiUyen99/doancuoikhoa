/** When your routing table is too long, you can split it into small modules **/
import Layout from '@/layout'

const tourRouter = {
  path: '/Tour',
  component: Layout,
  redirect: '/tours/lists',
  name: 'Tour',
  meta: {
    title: 'tour_manage_title',
    icon: 'trademarked'
  },
  roles: ['Tour'],
  children: [
    {
      path: 'lists',
      component: () => import('@/views/cms_view/tours/List'),
      name: 'tour_manage_title',
      meta: { title: 'tour_manage_title' }
    }
  ]
}
export default tourRouter
