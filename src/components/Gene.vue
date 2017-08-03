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

    <div id="allGene" class='similar-table'>
      <div class="row similar-thead" v-html="geneTitle"></div>
      <div class="row similar-tbody">
        <span class="col-md-1" v-for="data in allGeneData">
          <div :class="{'special-bc':index%2!=0}" class="similar-td" v-for="(list,index) in data">{{list}}</div>
        </span>
      </div>

    </div>

    <page :childCount="allGeneCount" :childReset="allGeneReset" @childCurrent="allGeneGetCurrent"></page>
  </div>
</template>

<script>
  import page from './global/Page.vue'

  export default {
    data: function () {
      return {
        allGeneCount: 1,
        allGeneReset: 0,
        allGenePage: 1,
        allGeneData:[],
        geneTitle:'<span class="col-md-9 similar-th">A</span><span class="col-md-3 similar-th">B</span>',
//        geneTitle:'',
//        currentExtraData:[], //当前页面额外的数据

        current: 1,
        count: 1,
        list_gene: [],
        loading: ''
      }
    },
    mounted:function () {
      this.fillAllGene();
    },
    components: {
      'page': page,
    },
    methods: {
      fillAllGene: function () {
        const _vue = this;
//        _vue.currentExtraData=[];
        let arr = [];
        let i = 0;
        while (i < 240) {
          if (i < 65) {
            arr.push('A' + i);
          } else if(i>=65&&i<164) {
            arr.push('B' + i);
          }else{
            arr.push('C' + i);
          }
          i++;
        }
        _vue.allGeneData = _vue.outputs(arr);
//        let geneObj = {};
//        let firstLetter = '';
//        $.each(arr, function (i, data) {
//          const currentFirstLetter = data.substring(0, 1);
//          if (currentFirstLetter != firstLetter) {
//            firstLetter = currentFirstLetter;
//            geneObj[firstLetter] = [];
//            geneObj[firstLetter].push(data)
//          } else {
//            geneObj[firstLetter].push(data)
//          }
//        });

//        let objKeyArr = Object.keys(geneObj); //对象的key保存为数组
//        let objValueArr = Object.values(geneObj); //对象的value保存为数组
//        let currentExtraCount =0 ;//当前页面额外多出的数量

//        $.each(geneObj, function (key, value) {
//          if(objKeyArr.length>1){ //当前页有多个基因的时候才处理,单个基因直接显示就好
//            if(key == objKeyArr[objKeyArr.length-1]){
//              if(value.length >=currentExtraCount){ //如果最后一个基因的数量就可以满足去掉额外的
//
//
//                $.each(value,function (i,data) {
//                  if(i>=value.length-currentExtraCount){
//                    _vue.currentExtraData.push(data)
//                  }
//                });
//                value.length = value.length-currentExtraCount;
//
//
//              }else{
////                _vue.currentExtraData = value;
////                value.length = 0;
//              }
//            }else{
//              let remainder = value.length % 20;
//              currentExtraCount = 20-remainder;
//              let i = 0;
//              for (i;i < remainder; i++) {
//                value.push('')
//              }
//            }
//          }
//          const colCount =value.length / 20;
//          _vue.geneTitle+=`<span class="col-md-${colCount} similar-th">${key}</span>`;
//          $.merge(_vue.allGeneData,_vue.outputs(value))
//        });
      },
      allGeneGetCurrent: function (data) {
        this.allGenePage = data
      },
      outputs:function (allData) {
        /*将数组里面的值几个几个的输出*/
        if (!allData) {
          return
        }
        let arrCount = Math.ceil(allData.length / 20);
        let pushArr = [];
        while (arrCount) {
          pushArr.push([]);
          arrCount -= 1
        }
        $.each(allData, function (i, data) {
          i += 1;
          $.each(pushArr, function (k1, k2) {
            if (Math.ceil(i / 20) === k1 + 1) {
              k2.push(data)
            }
          })
        });
        $.each(pushArr, function (i, data) {
          if (data.length !== 20) {
            data.length = 20
          }
        });
        return pushArr;
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
    },
//    filter:{
//      outputs:function (allData) {
//        console.log(allData)
//        /*将数组里面的值20个20个的输出*/
//        if (!allData) {
//          return
//        }
//        let arrCount = Math.ceil(allData.length / 20);
//        let pushArr = [];
//        while (arrCount) {
//          pushArr.push([]);
//          arrCount -= 1
//        }
//        $.each(allData, function (i, data) {
//          i += 1;
//          $.each(pushArr, function (k1, k2) {
//            if (Math.ceil(i / 20) === k1 + 1) {
//              k2.push(data)
//            }
//          })
//        });
//        $.each(pushArr, function (i, data) {
//          if (data.length !== 20) {
//            data.length = 20
//          }
//        });
//        console.log(pushArr)
//        return pushArr;
//      }
//    }
  }
</script>

<style scoped lang="less">
  .gene-page {

  }
</style>
