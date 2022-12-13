import Layout from '@/layout'

const reviewRouter = {
  path: '/Review',
  component: Layout,
  redirect: '/reivew/lists',
  name: 'Review',
  meta: {
    title: 'reivew_list',
    icon: 'reivew'
  },
  roles: ['Review'],
  children: [
    {
      path: 'lists',
      component: () => import('@/views/reivew/List'),
      name: 'reivew_list',
      meta: { title: 'reivew_list' }
    }
  ]
}
export default reviewRouter
