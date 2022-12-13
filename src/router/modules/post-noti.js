import Layout from '@/layout'

const PostNotiRouter = {
  path: '/PushNotificaiton',
  component: Layout,
  redirect: '/post-noti/lists',
  name: 'post-noti',
  meta: {
    title: 'Shoot-noti',
    icon: 'shoot'
  },
  roles: ['post-noti'],
  children: [
    {
      path: 'lists',
      component: () => import('@/views/post-noti/List'),
      name: 'manage_point',
      meta: { title: 'Shoot-noti' }
    }
  ]
}
export default PostNotiRouter
