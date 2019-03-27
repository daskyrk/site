<template>
  <footer>
    <div class="footer-link">
      <template v-for="(item, i) in footer.data">
        {{ i === 0 ? '' : footer.split }}
        <nuxt-link 
          v-if="item.link" 
          :key="i" 
          :to="item.link"
        >
          {{ item.text }}
        </nuxt-link>
        <span 
          v-else 
          :key="i"
        >
          {{ item.text }}
        </span>
      </template>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      footer: process.env.footer,
    }
  },
}
</script>


<style lang="scss" scoped>
footer {
  display: flex;
  align-items: center;
  justify-content: center;
  height: $footer-height;
  background: $white;
  border-top: 1px solid $color-border;

  .footer-link {
    > a,
    > span {
      padding: 0 1rem;
    }
  }

  a:hover {
    color: $color-primary;
  }
}
</style>
