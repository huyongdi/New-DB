<template>
  <div class="shadow" id="home-content">
    <div class="title">
      医学大数据库
    </div>
    <div class="content">
      <div class="row topRow">
        <div class="col-md-4">
          <img src="../../static/img/home-1.png" alt="">
          <div class="right">
            <div class="right-title">基因</div>
            <div class="remark">整合基因、疾病与有效标记数据库</div>
          </div>
        </div>
        <div class="col-md-4">
          <img src="../../static/img/home-2.png" alt="">
          <div class="right">
            <div class="right-title">疾病</div>
            <div class="remark">收录了~余种人类常见遗传性疾病、先天性畸形疾病等性状</div>
          </div>
        </div>
        <div class="col-md-4">
          <img src="../../static/img/home-6.png" alt="">
          <div class="right">
            <div class="right-title">产品</div>
            <div class="remark">基因诊断模块设计与标记筛选</div>
          </div>
        </div>
      </div>

      <div class="row topRow">
        <div class="col-md-4">
          <img src="../../static/img/home-5.png" alt="">
          <div class="right">
            <div class="right-title">表型分析</div>
            <div class="remark">对表型的分类、管理、注释、检索等</div>
          </div>
        </div>
        <div class="col-md-4">
          <img src="../../static/img/home-4.png" alt="">
          <div class="right">
            <div class="right-title">HPOBOX</div>
            <div class="remark">中文HPO数据库</div>
          </div>
        </div>
        <div class="col-md-4">
          <img src="../../static/img/home-2.png" alt="">
          <div class="right">
            <div class="right-title">变异</div>
            <div class="remark">变异位点标记筛选</div>
          </div>
        </div>
      </div>

      <div class="row search-content">
        <input type="text" placeholder="选择搜索项">
        <div class="remove-input">
          <span class="search" @click="search"><img src="../../static/img/home-7.png"></span>
          <img src="../../static/img/home-9.png" alt="">
          <span class="select" @click.stop="select"><img src="../../static/img/home-8.png"></span>

          <div class="select-div hide" id="select-div" @click.stop="">
            <img src="../../static/img/home-10.png" alt="">
            <ul class="shadow my-ul">
              <li @click="addIn">基因</li>
              <li @click="addIn">产品</li>
              <!--<li>疾病</li>-->
            </ul>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    created: function () {
      $("#app:not('#select-div')").on("click", function () {
        $("#select-div").addClass('hide')
      })
    },
    methods: {
      search: function () {

      },
      select: function () {
        this.switchHide('select-div')
      },
      addIn: function (event) {
        const _this = $(event.target);
        _this.parent().find('.in').removeClass("in");
        _this.addClass('in');
        $(this).addClass('hide')
      }
    }
  }
</script>

<style scoped lang="less">
  .shadow#home-content {
    background: #fff;
    margin-top: 20px;
    .title {
      height: 60px;
      line-height: 60px;
      color: rgb(67, 67, 67);
      font-size: 16px;
      padding-left: 40px;
      border-bottom: 1px solid rgb(221, 221, 221);
    }
    .content {
      padding: 0 90px;
      .row.search-content {
        text-align: center;
        margin-top: 140px;
        margin-bottom: 70px;
        input {
          width: 250px;
        }
        .remove-input {
          position: relative;
          display: inline-block;
          border-radius: 3px;
          margin-left: -7px;
          height: 28px;
          vertical-align: top;
          background: linear-gradient(to bottom, #f46554, #ea533f);
          >img{
            height: 27px;
          }
          .search {
            cursor: pointer;
            display: inline-block;
            width: 35px;
            &:active {
              background: linear-gradient(to bottom, #ea533f, #f46544);
              border-radius: 3px 0 0 3px;
            }
            img {
              margin-left: 5px;
              margin-top: 2px;
            }
          }
          .select {
            cursor: pointer;
            display: inline-block;
            width: 24px;
            height: 24px;
            &:active {
              background: linear-gradient(to bottom, #ea533f, #f46544);
              border-radius: 0 3px 3px 0;
            }
            img {
              margin-right: 5px;
            }
          }
          .select-div {
            position: absolute;
            width: 100px;
            img {
              position: absolute;
              right: 37px;
              z-index: 10;
            }
            ul {
              position: absolute;
              top: 8px;
              width: 100px;
              /*height: 77px;*/
              height: 52px;
              li {
                height: 25px;
              }
            }
          }
        }
      }
      .topRow {
        margin: 50px 0 40px 0;
        img {
          float: left;
          margin-right: 20px;
        }
        .right {
          float: left;
          .right-title {
            font-weight: bold;
            margin: 5px 0 8px 0;
          }
          .remark {
            max-width: 210px;
            font-size: 12px;
          }
        }
      }
    }
  }
</style>
