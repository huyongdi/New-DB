<template>
  <div id="va-content">
    <div class="title">
      <span class="title-b">医学大数据库</span>
      <span class="title-s">< 变异</span>
    </div>

    <div class="shadow-top">
      <input type="text" placeholder="11:119052976:C:T" @keyup.enter="toDetail" v-model="inputV">
      <span class="my-btn search-btn" @click="toDetail"><img src="../../static/img/red-con.png" alt="">搜索</span>
    </div>

  </div>
</template>


<script>
  export default {
    data: function () {
      return {
        inputV:''
      }
    },
    methods:{
      toDetail:function () {
        console.log(1111)
        this.$router.push({name:'variationD',query:{p:this.inputV}})
      }
    }
  }
</script>

<style scoped lang="less">
  #va-content {
    .shadow-top {
      margin-top: 15px;
      height: 300px;
      text-align: center;
      padding-top: 130px;
      background-color: #fff;
      input {
        width: 300px;
      }
      span {
        display: block;
        width: 96px;
        margin: 20px auto;
      }
    }
  }

</style>
