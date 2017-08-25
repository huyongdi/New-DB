<template>
  <li id="product-li">
    <div class="father" id="product-father">
      <span class="img task-product"></span>
      <span>产品</span>
      <i class="triangle"></i>
      <img src="../../../static/img/under-left-1.png" alt="">
    </div>
    <div @click.stop="" class="children">
      <div class="block" href="">心血管系统遗传性疾病</div>
      <!--<router-link to="/taskM/foo/reportSe" data-code='taskM-reportSe' class="block">-->
        <!--在线报告查询-->
      <!--</router-link>-->
      <!--<router-link to='/taskM/foo/reportSt' data-code="taskM-reportSt" class="block">-->
        <!--报告统计-->
      <!--</router-link>-->
    </div>
  </li>
</template>

<script>
  export default {
    data: function () {
      return {}
    },
    mounted: function () {
      const _vue = this;
      this.myAxios({
        method: 'get',
        url: 'product/panel/'
      }).then(function (resp) {
        _vue.subpanelDisease = resp.data.subpaneldisease;
        _vue.$axios({
          method: 'get',
          url: resp.data.panel
        }).then(function (resp_panel) {
          _vue.panels = resp_panel.data.results;
          _vue.isFirst = 1;
        })
      }).catch(function (error) {
        _vue.catchFun(error)
      });
    }
  }
</script>

<style scoped lang="less">
  #product-li{
    #product-father{

    }
  }

  /*避免抖动*/
  #product-li.active{
    #product-father{
      img{
        margin-right: 19px;
      }
    }
  }

</style>
