<template>
  <li id="product-li">

    <div class="spinner" v-show="loading">
      <div class="bounce1"></div>
      <div class="bounce2"></div>
      <div class="bounce3"></div>
    </div>

    <div class="father" id="product-father">
      <span class="img task-product"></span>
      <span>产品</span>
      <i class="triangle"></i>
      <img src="../../../static/img/under-left-1.png" alt="">
    </div>
    <div @click.stop="" class="children" style="display: none">
      <div class="one-content" v-for="list in resultsF">
        <div class="panel-f" href="">
          <span :data-id="list.id" @click="showChildren">{{list.name}}</span>
          <img src="../../../static/img/under-left-1.png" alt="">
        </div>
        <ul class="panel-c" style="display: none">
          <li v-for="listC in list.allC" @click="toProduct" :data-id="listC.id">
            <span class="img" ></span>{{listC.name}}
          </li>
        </ul>
      </div>


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
      return {
        resultsF: [],
        loading:''
      }
    },
    mounted: function () {
      const _vue = this;
      _vue.loading=true;
      this.myAxios({
        method: 'get',
        url: 'product/panel/?ctg=true'
      }).then(function (resp) {
        $.each(resp.data.results, function (i, data) {
          data.allC = [];
        });
        _vue.resultsF = resp.data.results;
        _vue.loading = false
      }).catch(function (error) {
        _vue.catchFun(error)
      });
    },
    methods: {
      showChildren: function (event) {
        const _vue = this;
        const _this = $(event.target);
        const _panelC = _this.parent().next();
        const _oneContent = _this.parent().parent();
        if (_this.hasClass('active')) {
          _this.removeClass('active');
          _panelC.removeClass('active');
          _oneContent.removeClass('active');
          _panelC.slideToggle();
          return;
        }
        _this.addClass('active');
        _panelC.addClass('active');
        _oneContent.addClass('active');
        const fId = $(event.target).data('id');
        $.each(_vue.resultsF, function (i, data) {
          if (data.id == fId) {
            if (data.allC.length == 0) {
              _vue.loading = true;
              _vue.myAxios({
                method: 'get',
                url: 'product/panel/?category=' + fId
              }).then(function (resp) {
                $.each(_vue.resultsF, function (i, data) {
                  if (data.id == fId) {
                    console.log(data);
                    console.log(resp.data.results);
                    data.allC = resp.data.results
                  }
                });
                _panelC.slideToggle();
                _vue.loading = false;
              }).catch(function (error) {
                _vue.catchFun(error)
              });
            } else {
              _panelC.slideToggle();
            }
          }
        });
      },
      toProduct: function (event) {
        const _this = $(event.target);
        const id = _this.data('id');
        _this.parent().find(".active").removeClass("active");
        _this.addClass('active');
        this.$router.push({path: '/product', query: {'sId': id}})
      }
    }
  }
</script>

<style scoped lang="less">
  @in: rgb(220, 238, 249);
  .transform-deg (@deg: 180deg) {
    transform: rotate(@deg);
    -ms-transform: rotate(@deg); /* IE 9 */
    -moz-transform: rotate(@deg); /* Firefox */
    -webkit-transform: rotate(@deg); /* Safari 和 Chrome */
    -o-transform: rotate(@deg); /* Opera */
  }

  #product-li {
    position: relative;
    .children {
      .panel-f {
        height: 25px;
        line-height: 25px;
        margin-left: 20px;
        padding-left: 2px;
        margin-right: 12px;
        font-size: 13px;
        &:hover {
          color: #0e7dc3;
          /*background-color: @in*/;
        }
        span.active {
          color: #0e7dc3;
        }
        img {
          float: right;
          margin: 10px 21px 0 0;
        }
      }
      .panel-c {
        padding-left: 0;
        margin-left: 25px;
        margin-right: 12px;
        font-size: 13px;
        li {
          > .img {
            display: inline-block;
            width: 4px;
            height: 4px;
            margin: 0 6px 2px 0;
            border-radius: 50%;
            background-color: #333;
          }
          &:hover {
            color: #0e7dc3;
          }
        }
        li.active {
          color: #0e7dc3;
        }
      }
    }

    .spinner {
      z-index: 10000;
      position: absolute;
      width: 150px;
      left: 30px;
      text-align: center;
      div {
        width: 20px;
        height: 20px;
        background-color: #258dc1;
        border-radius: 100%;
        display: inline-block;
        -webkit-animation: bounceDelay 1.4s infinite ease-in-out;
        animation: bounceDelay 1.4s infinite ease-in-out;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
      }
      .bounce1 {
        -webkit-animation-delay: -0.32s;
        animation-delay: -0.32s;
      }
      .bounce2 {
        -webkit-animation-delay: -0.16s;
        animation-delay: -0.16s;
      }
    }

  }

  /*避免抖动*/
  .one-content.active {
    .panel-f {
      border-bottom: 1px dotted rgb(211, 211, 211);
      img {
        .transform-deg
      }
    }
    .panel-c {
      border-bottom: 1px dotted rgb(211, 211, 211);
    }
  }

  #product-li.active {
    #product-father {
      > img {
        .transform-deg
      }
    }

  }

</style>
