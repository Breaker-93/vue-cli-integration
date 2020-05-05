import router from '@router'
import { getToken } from '@assets/js/auth'

// 不重定向白名单
const whiteList = ['/login', '/test']

router.beforeEach((to, from, next) => {
  if (getToken()) {
    // 拥有访问权限
    if (to.path === '/login') {
      // 访问登录页时，重定向至首页（已具备访问权限）
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    // 不具有访问权限
    if (whiteList.indexOf(to.path) !== -1) {
      // 访问的页面在白名单中，无权限也可直接访问
      next()
    } else {
      // 访问的页面不在白名单中，全部重定向至登录页
      next(`/login?redirect=${encodeURIComponent(window.location.href)}`)
    }
  }
})

router.afterEach(() => {
  // 路由导航结束后的操作...
})

export default router
