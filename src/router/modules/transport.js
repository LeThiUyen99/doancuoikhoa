// import i18n from '@/lang/i18n'
import Layout from '@/layout'

const transportRouter = {
  path: '/Transport',
  component: Layout,
  redirect: '/Transport/lists',
  name: 'Transport',
  meta: {
    title: 'transport_title',
    icon: 'transport'
  },
  roles: ['Transport'],
  children: [
    {
      path: 'lists',
      component: () => import('@/views/Transport/List'),
      name: 'transport_title',
      meta: { title: 'transport_title' }
    }
  ]
}
export default transportRouter
