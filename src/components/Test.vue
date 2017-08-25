<template>
  <div id="va-content">
  <button @click="toDetail">123</button>
  </div>
</template>


<script>
  export default {
    data: function () {
      return {
        inputV:''
      }
    },
    created:function () {
      console.log(...[1, 2, 3])
    },
    methods:{
      toDetail:function () {
        store.commit('increment')

        console.log(store.state.count) // -> 1
      }
    }
  }
</script>

<style scoped lang="less">


</style>
