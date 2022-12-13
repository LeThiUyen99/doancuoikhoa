
import Layout from '@/layout'

const accountRouter = {
  path: '/Account',
  component: Layout,
  redirect: '/account/lists',
  name: 'Account',
  meta: {
    title: 'manage_account',
    icon: 'account'
  },
  roles: ['Account'],
  children: [
    {
      path: 'lists',
      component: () => import('@/views/account/List'),
      name: 'manage_account',
      meta: { title: 'manage_account' }
    }
  ]
}
export default accountRouter
