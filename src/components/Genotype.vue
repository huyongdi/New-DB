<template>
  <div id="genoType-content">
    <loading v-show="loading"></loading>
    <div class="title">
      <span class="title-b">医学大数据库</span>
      <span class="title-s">< 表型分析</span>
    </div>

    <div class="content shadow-top">
      <div class="shadow-title">输入HPO表型</div>
      <div class="check-content">
        <div class="single">
          <span class="red">*</span>
          <input type="text" placeholder="与表型相关基因(逗号隔开)" @keyup="mustKeyUp" v-model="input0">
          <div class="out-in">
            <span class="check out-check"></span>
            <span>关联子表型</span>
          </div>
          <div class="out-in">
            <span class="out-check check"></span>
            <span>扩展orphanet信息</span>
          </div>
        </div>
        <div class="single">
          <input class="left-input" type="text" placeholder="同时去除表型相关基因(选填)" @keyup="mayBKeyUp" v-model="input1">
          <div class="out-in">
            <span class="out-check check"></span>
            <span>关联子表型</span>
          </div>
          <div class="out-in">
            <span class="out-check check"></span>
            <span>扩展orphanet信息</span>
          </div>
        </div>
      </div>
      <span class="my-btn search-btn"><img src="../../static/img/red-con.png" alt="">搜索</span>
    </div>
  </div>
</template>

<script>
  export default {
    data:function () {
      return{
        loading:'',
        input0:'',
        input1:''
      }
    },
    mounted:function () {
      this.baseInit();
    },
    methods:{
      baseInit:function () {
        $(".out-in").on("click",function () {
          const _check = $(this).find('.check');
          if(_check.hasClass('out-check')){
            _check.removeClass('out-check').addClass('in-check');
          }else{
            _check.removeClass('in-check').addClass('out-check');
          }
        })
      },
      mayBKeyUp:function () {

      },
      mustKeyUp:function () {
        this.loading = true;
        const _vue = this;
        this.myAxios({
          url:'knowledge/phenomini/?query=' + _vue.input0,
          type: 'get'
        }).then(function (resp) {
          _vue.loading = false;
          const results = resp.data;
          console.log(results);
          $.each(results, function (i, value) {

          });
        }).catch(function (error) {
          _vue.catchFun(error)
        });
      }
    }
  }
</script>

<style scoped lang="less">
  #genoType-content {
    .content {
    min-height: 450px;
      margin-top: 25px;
      background-color: #fff;
      .check-content {
        width: 590px;
        margin: 40px auto;
        >div{
          margin-bottom: 26px;
          .left-input{
            margin-left: 16px;
          }
          .red {
            font-family: "FZXH1JW";
            color: rgb(238, 83, 63);
            font-size: 18px;
            float: left;
            margin-top: 5px;
            margin-right: 8px;
          }
          input{
            width: 285px;
          }
          .out-in{
            display: inline-block;
            margin-left: 15px;
            cursor: pointer;
            .check{
              display: inline-block;
              width: 15px;
              height: 15px;
              background-size: 15px 15px;
              margin-bottom: -3px;
            }
            .out-check{
              background: url("../../static/img/all-2.png") 43px 0;
            }
            .in-check{
              background: url("../../static/img/all-2.png") 15px 0;
            }
          }
        }

      }
      .search-btn{
        display: block;
        width: 95px;
        margin: 50px auto;
      }
    }
  }
</style>
