<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App'
};
</script>

<style lang="less" scoped>
#app {
  width: 100vw;
  height: 100vh;
  // background-color: #253241;
  background: linear-gradient(to bottom, #16222A, #3A6073);
}
</style>
