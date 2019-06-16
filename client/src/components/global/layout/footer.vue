<template>
  <footer class="default-footer">
    <div class="footer-container">
      <div class="footer-col copy-right">
        <p>
          Made by
          <nuxt-link to="/about">
            daskyrk
          </nuxt-link>
          with ❤️ © 2019
        </p>
        <p>Powered by Nuxt</p>
        <p>大概存活了 {{ footer.startTime | toNow }}</p>
      </div>

      <div class="footer-col friend-link">
        <p>友链：</p>
        <p
          v-for="friend in footer.friends"
          :key="friend.name"
        >
          <nuxt-link :to="friend.link">
            {{ friend.name }}
          </nuxt-link>
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      footer: this.$getConfig('footer'),
    }
  },
}
</script>


<style lang="scss" scoped>
.default-footer {
  padding: 2rem 0;
  background: $c-white;
  border-top: 1px solid $c-platinum;

  .footer-container {
    display: flex;
    width: 100%;
    max-width: 960px;
    height: 100%;
    margin: 0 auto;
    padding: 0 5rem;
    color: $color-text-sub;
    font-size: 13px;
  }

  p {
    margin-bottom: $p4;
  }

  .footer-col {
    flex: 1;
    padding: 0 2rem;
  }

  .copy-right {
    margin: 0;
    line-height: 20px;

    a {
      color: inherit;
    }
  }

  .friend-link {
    > a,
    > span {
      padding: 0 1rem;
    }
  }

  a:hover {
    color: $color-active-red;
  }
}

@include sm-width() {
  .default-footer {
    .footer-container {
      width: 90%;
      padding: 0;
    }

    .footer-col {
      padding: 0;
      text-align: right;

      &:not(:first-child) {
        display: none;
      }
    }
  }
}
</style>
