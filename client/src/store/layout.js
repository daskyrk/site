export default {
  state() {
    return {
      screenWidth: 0,
      screenHeight: 0,
      size: 'lg',
    }
  },

  mutations: {
    resize(state, { screenWidth, screenHeight }) {
      state.screenWidth = screenWidth
      state.screenHeight = screenHeight
      if (screenWidth > 1440) {
        state.size = 'layout-xlg'
      } else if (screenWidth > 1280) {
        state.size = 'layout-lg'
      } else if (screenWidth > 680) {
        state.size = 'layout-md'
      } else {
        state.size = 'layout-sm'
      }
    },

  },

}
