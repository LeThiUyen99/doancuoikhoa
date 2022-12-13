import Layout from '@/layout'

const jobDailyRouter = {
  path: '/JobDaily',
  component: Layout,
  redirect: '/job_daily/lists',
  name: 'JobDaily',
  meta: {
    title: 'job_daily',
    icon: 'daily'
  },
  roles: ['JobDaily'],
  children: [
    {
      path: 'lists',
      component: () => import('@/views/job_daily/List'),
      name: 'job_daily',
      meta: { title: 'job_daily' }
    }
  ]
}
export default jobDailyRouter
