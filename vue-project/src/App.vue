<template>
  <div id="app">
    <div class="nav">
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/richTextEditor">RichTextEditor</router-link></li>
      </ul>
    </div>
    <div class="view">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
}
.nav {
  padding: 30px;
  line-height: 40px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
