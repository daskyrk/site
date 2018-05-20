<template>
  <div class="app">
    <my-header>

    </my-header>

      <nuxt/>

    <my-footer>


    </my-footer>
  </div>
</template>

<script>
import myHeader from '~/components/layouts/header';
import myFooter from '~/components/layouts/footer';

export default {

  components: {
    myHeader,
    myFooter,
  }

}
</script>
