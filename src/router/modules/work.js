import Layout from '@/layout'

const workRouter = {
  path: '/BillManage',
  component: Layout,
  redirect: '/work/lists',
  name: 'BillManage',
  meta: {
    title: 'manage_work',
    icon: 'work'
  },
  roles: ['BillManage'],
  children: [
    {
      path: 'lists',
      component: () => import('@/views/work/List'),
      name: 'manage_work',
      meta: { title: 'manage_work' }
    }
  ]
}
export default workRouter
