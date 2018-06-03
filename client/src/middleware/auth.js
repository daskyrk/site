
export default function ({ store, redirect, route }) {

  if (!store.state.token) {
    return redirect(`/login?backTo=${route.fullPath}`);
  }
}