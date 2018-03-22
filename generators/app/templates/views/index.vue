<template>
  <div>
    <p class="demo">{{ msg }}</p>
  </div>
</template>

<script>
export default {
  name: 'IndexView',
  data() {
    return {
      msg: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. In, voluptas!',
    }
  },
}
</script>

<style scoped lang="sass">
  .demo
    color: red
</style>
