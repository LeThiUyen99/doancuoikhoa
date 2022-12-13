/** When your routing table is too long, you can split it into small modules **/
import Layout from '@/layout'

const categoryRouter = {
  path: '/Categories',
  component: Layout,
  redirect: '/categories/lists',
  name: 'Category',
  meta: {
    title: 'manage_category',
    icon: 'list'
  },
  roles: ['Category'],
  children: [
    {
      path: 'lists',
      component: () => import('@/views/categories/List'),
      name: 'manage_category',
      meta: { title: 'manage_category' }
    }
  ]
}
export default categoryRouter
