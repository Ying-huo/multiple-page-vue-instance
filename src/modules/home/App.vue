<template>
  <div id="app">
    <img src="./images/bind_warn.png">
    <img :src="xxx">
    <hello></hello>
    <div>{{xxx}}</div>
  </div>
</template>

<script>
  import Hello from '@/components/Hello'
  import './plugins/test.js'

  export default {
    name: 'app',
    components: {
      Hello
    },
    data: function() {
      return {
        xxx: './images/bind_warn.png'
      }
    },
    mounted: function () {
      // this.xxx = window.api;
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  img {
    width: 0.8rem;
    height: 0.8rem;
  }
</style>
