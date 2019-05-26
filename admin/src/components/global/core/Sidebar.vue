<template>
  <v-navigation-drawer
    id="admin-app-drawer"
    v-model="inputValue"
    app
    dark
    floating
    persistent
    mobile-break-point="991"
    width="260"
  >
    <v-img
      :src="image"
      height="100%"
    >
      <v-list
        class="fill-height"
        column
      >
        <v-list-tile avatar>
          <v-list-tile-avatar color="white">
            <v-img
              :src="logo"
              height="34"
              contain
            />
          </v-list-tile-avatar>
          <v-list-tile-title class="title">
            博客后台
          </v-list-tile-title>
        </v-list-tile>
        <v-divider />
        <v-list-tile v-if="responsive">
          <v-text-field
            class="purple-input search-input"
            label="Search..."
            color="purple"
          />
        </v-list-tile>
        <v-list-tile
          v-for="(link, i) in menus"
          :key="i"
          :to="link.to"
          :active-class="color"
          avatar
          class="v-list-item"
        >
          <v-list-tile-action>
            <v-icon>
              {{ link.icon }}
            </v-icon>
          </v-list-tile-action>
          <v-list-tile-title v-text="link.text" />
        </v-list-tile>
        <!-- <v-list-tile
          disabled
          active-class="primary"
          class="v-list-item v-list__tile--bottom"
          to="/upgrade"
        >
          <v-list-tile-action>
            <v-icon>mdi-package-up</v-icon>
          </v-list-tile-action>
          <v-list-tile-title class="font-weight-light">
            Setting
          </v-list-tile-title>
        </v-list-tile> -->
      </v-list>
    </v-img>
  </v-navigation-drawer>
</template>

<script>
// Utilities
import { mapMutations, mapState } from 'vuex'

export default {
  data() {
    return {
      logo: '/img/logo.png',
      menus: this.$getConfig('menus'),
      responsive: false,
    }
  },
  computed: {
    ...mapState('app', ['image', 'color']),
    inputValue: {
      get() {
        return this.$store.state.app.drawer
      },
      set(val) {
        this.setDrawer(val)
      },
    },
    // items() {
    //   return this.$t('Layout.View.items')
    // },
  },
  mounted() {
    this.onResponsiveInverted()
    window.addEventListener('resize', this.onResponsiveInverted)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResponsiveInverted)
  },
  methods: {
    ...mapMutations('app', ['setDrawer', 'toggleDrawer']),
    onResponsiveInverted() {
      if (window.innerWidth < 991) {
        this.responsive = true
      } else {
        this.responsive = false
      }
    },
  },
}
</script>

<style lang="scss">
#admin-app-drawer {
  .v-list__tile {
    border-radius: 4px;

    // &--bottom {
    //   margin-top: auto;
    //   margin-bottom: 17px;
    // }
  }

  .v-image__image--contain {
    top: 9px;
    height: 60%;
  }

  .search-input {
    margin-bottom: 30px !important;
    padding-right: 15px;
    padding-left: 15px;
  }
}
</style>
