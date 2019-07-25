<template>
  <div id="app">
    一个例子2
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  data() {
    return {}
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
html,
body {
  height: 100%;
}
/* 修复css边距合并带来的问题 */
body {
  position: absolute;
  width: 100%;
  overflow: hidden;
}
#app {
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow: hidden;
}
</style>
