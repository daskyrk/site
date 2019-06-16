export default {
  state() {
    return {
      screenWidth: 0,
      screenHeight: 0,
      size: 'lg',
      sideOpen: false,
      pressKey: {},
    }
  },

  mutations: {
    resize(state, { screenWidth, screenHeight }) {
      state.screenWidth = screenWidth
      state.screenHeight = screenHeight
      if (screenWidth > 1680) {
        state.size = 'xl'
      } else if (screenWidth > 1440) {
        state.size = 'lg'
      } else if (screenWidth > 1366) {
        state.size = 'md'
      } else if (screenWidth > 680) {
        state.size = 'sm'
      } else {
        state.size = 'xs'
      }
    },

    toggleAppSide(state, sideOpen) {
      state.sideOpen = sideOpen
    },

    pressKey(state, e) {
      state.pressKey = e
    },

  },

}
