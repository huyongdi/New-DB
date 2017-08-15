<template>
  <div class="gene-page">
    <div class="title">
      <span class="title-b">医学大数据库</span>
      <span class="title-s">< 基因</span>
    </div>
    <loading v-if="loading"></loading>
    <div class="title-below">
      <search-div></search-div>
      <button @click="twoPage">产生第二页数据</button>
    </div>

    <div id="allGene" class='similar-table'>
      <div class="row similar-tbody">
        <span class="col-md-1" v-for="data in allGeneData">
          <div title="查看信息" :class="{'special-bc':index%2!=0,'isLetter':/^[A-Z]+$/.test(list)}" class="similar-td" v-for="(list,index) in data" @click="toGeneD(list)">{{list}}</div>
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
        allGeneData: [],
        currentExtraCount: 0,
        currentExtraData: [], //当前页面额外的数据
        firstLetter: '', //预存首字母，会被不断替换
        respGeneData: [],

        current: 1,
        count: 1,
        list_gene: [],
        loading: ''
      }
    },
    mounted: function () {
      this.fillAllGene();
    },
    components: {
      'page': page,
    },
    methods: {
      fillGeneNameList: function () {
        const _vue = this;
        let newArr = [];

        $.each(_vue.respGeneData, function (i, data) {
          const currentFirstLetter = data.substring(0, 1);
          if (currentFirstLetter != _vue.firstLetter) {
            _vue.firstLetter = currentFirstLetter;
            newArr.push(currentFirstLetter);
            newArr.push(data);
            _vue.currentExtraCount += 1;
          } else {
            newArr.push(data)
          }
        });
        _vue.currentExtraData = [];
        $.each(newArr, function (key, value) {
          if (key >= newArr.length - _vue.currentExtraCount) {
            _vue.currentExtraData.push(value);
          }
        });
        newArr.length = newArr.length - _vue.currentExtraCount;
        _vue.allGeneData = _vue.outputs(newArr);
        console.log(_vue.currentExtraData);
      },
      fillAllGene: function () {
        const _vue = this;
        _vue.respGeneData = [];
        let i = 0;
        while (i < 240) {
          if (i < 65) {
            _vue.respGeneData.push('A' + i);
          } else if (i >= 65 && i < 164) {
            _vue.respGeneData.push('B' + i);
          } else {
            _vue.respGeneData.push('C' + i);
          }
          i++;
        }
        if (_vue.currentExtraData.length !== 0) {
          _vue.currentExtraData = _vue.currentExtraData.reverse();
          $.each(_vue.currentExtraData, function (key, value) {
            _vue.respGeneData.unshift(value);
          });
        }

        this.fillGeneNameList();
      },
      twoPage: function () {
        const _vue = this;
        _vue.respGeneData = [];
        let i = 240;
        while (i < 480) {
          if (i < 305) {
            _vue.respGeneData.push('C' + i);
          } else {
            _vue.respGeneData.push('D' + i);
          }
          i++;
        }

        if (_vue.currentExtraData.length !== 0) {
          _vue.currentExtraData = _vue.currentExtraData.reverse();
          $.each(_vue.currentExtraData, function (key, value) {
            _vue.respGeneData.unshift(value);
          });
        }
        this.fillGeneNameList();
      },
      allGeneGetCurrent: function (data) {
        this.allGenePage = data
      },
      outputs: function (allData) {
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
      },

      toGeneD:function (geneID) {
        this.$router.push({name:'geneD',query:{geneID:geneID}})
      },

    },
    filter:{
      isLetter:function (data) {
        return /^[A-Z]+$/.test(data)

      }
    }
  }
</script>

<style scoped lang="less">
  #app #allGene{

  }
</style>
