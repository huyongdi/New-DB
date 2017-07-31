<template>
  <div class="gene-page">
    <span class="page-title">基因</span>
    <loading v-if="loading"></loading>
    <div class="title-below">
      <search-div></search-div>
    </div>
    <!--<table class="my-table">-->
      <!--<thead>-->
      <!--<tr>-->
        <!--<th style="min-width: 60px">基因ID</th>-->
        <!--<th style="">基因名</th>-->
        <!--<th style="">别名</th>-->
        <!--<th style="">常用转录本</th>-->
        <!--<th style="min-width: 130px">mimNumber(基因)</th>-->
        <!--<th style="">Panel</th>-->
        <!--<th style="">疾病</th>-->
        <!--<th style="">5X平均覆盖度%</th>-->
      <!--</tr>-->
      <!--</thead>-->
      <!--<tbody>-->

      <!--</tbody>-->
    <!--</table>-->
    <!--<page :childCount="count" :childReset="0" @childCurrent="getCurrent"></page>-->

    <table class="my-table">
      <thead>
      <tr>
        <th colspan="8">1</th>
        <th colspan="4">2</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>1</td>
        <td>1</td>
        <td>1</td>
        <td>1</td>
        <td>1</td>
        <td>1</td>
        <td>1</td>
        <td>1</td>
        <td>1</td>
        <td>1</td>
        <td>1</td>
        <td>1</td>
      </tr>
      </tbody>
    </table>
    <page :childCount="allGeneCount" :childReset="allGeneReset" @childCurrent="allGeneGetCurrent"></page>
  </div>
</template>

<script>
  import page from './global/Page.vue'

  export default {
    data: function () {
      return {
        allGeneCount:1,
        allGeneReset:0,
        allGenePage:1,

        current: 1,
        count: 1,
        list_gene: [],
        loading: ''
      }
    },
    created: function () {
//      this.geneTable();
    },
    components: {
      'page': page,
    },
    methods: {
      allGeneGetCurrent:function (data) {
        this.allGenePage = data
      }
//      geneTable: function () {
//        let _vue = this;
//        this.loading = true;
//        this.list_gene = [];
//        let url = 'knowledge/gene/?page=' + this.current;
//        url = this.$route.query.query ? url + '&query=' + this.$route.query.query : url;
//        this.myAxios({
//          method: "get",
//          url: url,
//        }).then(function (resp) {
//          const results = resp.data.results;
//          _vue.count = resp.data.count;
//          $.each(results, function (i, value) {
//            value.synonymsStr = value.synonyms.join("|");
//            value.cov5 = [];
//            $.each(value.tags.cov5, function (k, data) {
//              value.cov5.push(k + ' : ' + data);
//            });
//          });
//          _vue.list_gene = results;
//          _vue.loading = false
//        }).catch(function (error) {
//          _vue.catchFun(error)
//        });
//      },
//      getCurrent: function () {
//      },
    }
  }
</script>

<style scoped lang="less">
  .gene-page {

  }
</style>
