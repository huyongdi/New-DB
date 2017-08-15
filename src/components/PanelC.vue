<template>
  <div id="panel-c">
    <loading v-show="loading"></loading>
    <div class="title">
      <span class="title-b">医学大数据库</span>
      <span class="title-s">< Panel协作</span>
    </div>

    <span class="my-btn init" @click="init"><img src="../../static/img/red-refresh.png" alt="">初始化基因列表</span>

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
#panel-c{
  .init{
    width: 140px;
    margin-top: 15px;
  }
}
</style>
