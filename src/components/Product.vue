<template>
    <div id="product">
      <loading v-if="loading"></loading>
      <div class="title">
        <span class="title-b">医学大数据库</span>
        <span class="title-s">< 产品</span>
      </div>
      <div class="title-below">
        <div class="search-div">
          <input type="text" placeholder="搜索基因" class="search-input" @keyup.enter="search" v-model="inputV">
          <span class="my-btn">
          <img src="../../static/img/red-con.png" alt="" @click="search">
          </span>
        </div>
      </div>
      <table class="my-table bc-fff">
        <thead>
        <tr>
          <th>系统</th>
          <th>Panel</th>
          <th>疾病</th>
          <th>疾病亚型</th>
          <th>基因NCBI ID</th>
          <th>基因symbol</th>
          <th>遗传方式</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="list in lists">
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>{{list.geneId}}</td>
          <td>{{list.symbol}}</td>
          <td>-</td>
          <!--<a class="po" data-toggle="tooltip" data-placement="top" :data-original-title="list.name">{{list.ab}}</a>-->
        </tr>
        </tbody>
      </table>
    </div>
</template>

<script>
    export default {
      data:function () {
        return{
          lists:[],
          inputV:'',
          loading:''
        }
      },
      mounted:function () {
        const _vue = this;
        this.loading = true;
        this.myAxios({
          url:'product/panel/'+this.$route.query.sId+'/info/'
        }).then(function (resp) {
          _vue.lists = resp.data;
          _vue.loading = false;
        })
      },
      updated: function () {
        $('[data-toggle="tooltip"]').tooltip();
      },
      methods:{
        search:function () {
          const _vue = this;
          _vue.loading = true;
          this.myAxios({
//            url:'product/panel/?query='+$.trim(_vue.inputV)
            url:'http://118.26.69.171:8082/product/panel/?query=%E5%BF%83'
          }).then(function (resp) {
            _vue.lists = resp.data.results;
            _vue.loading = false;
          })
        }
      }
    }

</script>

<style scoped lang="less">
#product{
  table{

  }
}
</style>
