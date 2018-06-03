export default function({ store, redirect, route }) {
  const hasLogin = !!store.state.user.token;
  const isLoginPage = route.path === '/login';

  // 登录状态下如果在登录页，就跳到其他页面
  if (hasLogin && isLoginPage) {
    return redirect(route.query.redirectTo || '/');
  }

  // 未登录状态下不在登录页就跳转到登录页
  if (!hasLogin && !isLoginPage) {
    return redirect(`/login?redirectTo=${route.fullPath}`);
  }
}
