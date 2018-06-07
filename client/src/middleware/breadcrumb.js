export default ({ store, route }) => {
  if (route.meta) {
    // TODO: 这里某一级时展开的时，会漏掉一个层级，例如编辑文章页的上一级“文章管理”就没有
    const breadcrumb = route.matched.reduce((list, item, index) => {
      const meta = route.meta[index];
      return list.concat([
        {
          title: meta ? meta.breadcrumb : item.name,
          url: item.path,
        },
      ]);
    }, []);

    store.commit('SET_BREADCRUMB', breadcrumb);
  }
};
