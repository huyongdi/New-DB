<template>
  <div id="genoType-content">
    <loading v-show="loading"></loading>
    <div class="title">
      <span class="title-b">医学大数据库</span>
      <span class="title-s">< 变异</span>
    </div>
    <span class="my-btn search-btn"><img src="../../static/img/red-con.png" alt="">搜索</span>
  </div>
</template>

<script>
  export default {
    data:function () {
      return{
        loading:''
      }
    }
  }
</script>

<style scoped lang="less">

</style>
