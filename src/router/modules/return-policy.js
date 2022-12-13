import Layout from '@/layout'

const returnPolicyRouter = {
  path: '/ReturnPolicy',
  component: Layout,
  redirect: '/return_policy/lists',
  name: 'ReturnPolicy',
  meta: {
    title: 'return_policy_list',
    icon: 'ReturnPolicy'
  },
  roles: ['ReturnPolicy'],
  children: [
    {
      path: 'lists',
      component: () => import('@/views/return_policy/List'),
      name: 'return_policy_list',
      meta: { title: 'return_policy_list' }
    }
  ]
}
export default returnPolicyRouter
