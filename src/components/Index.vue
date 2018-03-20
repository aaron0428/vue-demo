<template>
  <div class="index">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
// import "../static/js/demo-1.js"
// import "../static/js/EasePack.min.js"
// import "../static/js/html5.js"
// import "../static/js/rAF.js"
export default {
  name: 'Index',
  data () {
    return {
      msg: 'Welcome to Your Home Page'
    }
  }
}

</script>

<style scoped>
@import "../static/style/component.css";
@import "../static/style/demo.css";
@import "../static/style/normalize.css";
</style>
