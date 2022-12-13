/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const uploaderrorRouter = {
  path: '/Error',
  component: Layout,
  redirect: '/uploaderror/lists',
  name: 'uploaderror',
  meta: {
    title: 'manage_upload_error',
    icon: 'error'
  },
  roles: ['uploaderror'],
  children: [
    {
      path: 'lists',
      component: () => import('@/views/uploaderror/List'),
      name: 'manage_upload_error',
      meta: { title: 'manage_upload_error' }
    }
  ]
}
export default uploaderrorRouter
