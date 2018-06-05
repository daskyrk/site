export default ({ store, route }) => {
  if (route.meta) {
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
