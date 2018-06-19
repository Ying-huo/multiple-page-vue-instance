<template>
  <div class="hello">
    <p>Hello world!</p>
    <img :src="msg">
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: './images/head_def.png'
    }
  }
}
</script>

<style scoped>
img {
  width: 4rem;
  height: 4rem;
}
</style>
