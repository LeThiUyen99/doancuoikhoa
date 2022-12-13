import Layout from '@/layout'

const pointRouter = {
  path: '/Point',
  component: Layout,
  redirect: '/point/lists',
  name: 'Point',
  meta: {
    title: 'manage_point',
    icon: 'point'
  },
  roles: ['Point'],
  children: [
    {
      path: 'lists',
      component: () => import('@/views/Point/List'),
      name: 'manage_point',
      meta: { title: 'manage_point' }
    }
  ]
}
export default pointRouter
