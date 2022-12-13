import Layout from '@/layout'

const categoriesShowRouter = {
  path: '/Categories_show',
  component: Layout,
  redirect: '/categoriesShow/lists',
  name: 'Categories_show',
  meta: {
    title: 'manage_category_2',
    icon: 'categoriesShow'
  },
  roles: ['Categories_show'],
  children: [
    {
      path: 'lists',
      component: () => import('@/views/categoriesShow/List'),
      name: 'manage_category_2',
      meta: { title: 'manage_category_2' }
    }
  ]
}
export default categoriesShowRouter
