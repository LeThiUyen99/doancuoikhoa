import Layout from '@/layout'

const documentRouter = {
  path: '/Document',
  component: Layout,
  redirect: '/document/lists',
  name: 'Document',
  meta: {
    title: 'document',
    icon: 'document'
  },
  roles: ['Document'],
  children: [
    {
      path: 'lists',
      component: () => import('@/views/document/List'),
      name: 'document',
      meta: { title: 'document' }
    }
  ]
}
export default documentRouter
